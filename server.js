const express=require('express'),http=require('http'),{Server}=require('socket.io'),fs=require('fs'),crypto=require('crypto');
const app=express();const server=http.createServer(app);const io=new Server(server,{cors:{origin:"*"}});
const PORT=process.env.PORT||10000;
const GEN="BCFPJ3172G";
app.use(express.json());app.use(express.static('public'));
app.get('/api/vault/status',(q,r)=>r.json({
  genesis:GEN,
  ist:new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}),
  public_url:`https://${q.get('host')}`,
  tunnel:"RENDER_LIVE_24x7",
  hash:crypto.createHash('sha256').update(GEN+Date.now()).digest('hex').slice(0,12)
}));
let W={bal:1250.75,tx:[]};
app.post('/api/e_rupee/demo/chat',(q,r)=>{
  let m=(q.body.message||'').toLowerCase();
  let ist=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
  let ans=`Demo: type balance, send 10, history | ${ist}`;
  if(m.includes('balance')) ans=`e₹ DEMO Bal: ₹${W.bal.toFixed(2)} | ID e₹-DEMO-${GEN} | ${ist} [DEMO NOT REAL]`;
  if(m.includes('history')) ans=W.tx.length?`History: ${W.tx.map(t=>`₹${t.a}@${t.at}`).join(', ')}`:`No DEMO txns`;
  if(m.includes('send')){let a=parseFloat(m.replace(/[^0-9.]/g,''))||0;if(a>0&&a<=W.bal){W.bal-=a;W.tx.push({a,at:ist});ans=`Sent e₹ ${a} (DEMO) New ₹${W.bal.toFixed(2)} Txn DEMO${Date.now().toString().slice(-6)}`}else ans=`Low DEMO bal ₹${W.bal}`;}
  setTimeout(()=>r.json({reply:ans,delivered_at:ist,delivery_ms:650,disclaimer:"SIMULATION - NOT RBI - DEMO ONLY"}),400);
});
app.get('/health', (q,r)=>r.send('OK'));
io.on('connection',s=>s.emit('sync',{genesis:GEN}));
server.listen(PORT,()=>console.log('LIVE ON PORT '+PORT));
