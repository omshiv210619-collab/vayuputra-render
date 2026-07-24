const crypto=require('crypto'),fs=require('fs');
function addDoc(name, prev=null){
  const ts=new Date().toISOString();
  const hash=crypto.createHash('sha256').update(`${name}|${ts}|VAYUPUTRA-001`).digest('hex');
  return {document:name,timestamp:ts,deviceID:'VAYUPUTRA-001',hash,prevHash:prev,version:'v6.2',compliance:'Watermark-Only, No-Card-Storage, No-Self-Evolving'};
}
let man={}; try{man=JSON.parse(fs.readFileSync('public/manifest.json'))}catch(e){}
const keys=Object.keys(man);
let r1=addDoc('RBI_eCurrency_Report_PERMANENT', keys[0]||null);
let r2=addDoc('SupremeCourt_Submission_PERMANENT', r1.hash);
let r3=addDoc('President_Defence_Submission_PERMANENT', r2.hash);
man[r1.hash]=r1; man[r2.hash]=r2; man[r3.hash]=r3;
fs.writeFileSync('public/manifest.json', JSON.stringify(man,null,2));
console.log('v6.2 manifest built with', Object.keys(man).length, 'docs');
