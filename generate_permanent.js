const PDFKit=require('pdfkit'),QR=require('qrcode'),fs=require('fs');
const RENDER_URL="https://vayuputra-render.onrender.com"; // <-- EDIT THIS to your real Render URL
const ERUPEE=RENDER_URL+"/e_rupee.html";
const GEN="BCFPJ3172G";
const IST=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});

async function make(name,title,lines,qrUrl){
 const doc=new PDFKit({margin:40}); doc.pipe(fs.createWriteStream(name));
 doc.fontSize(16).text(title,{align:'center'}); doc.moveDown();
 doc.fontSize(9).text(`IST: ${IST} | Genesis: ${GEN} | Permanent: ${qrUrl}`,{width:515}); doc.moveDown();
 doc.fontSize(11);
 lines.forEach(l=>{ doc.text(l,{width:515}); doc.moveDown(0.3); });
 const qr=await QR.toDataURL(qrUrl);
 doc.image(Buffer.from(qr.split(',')[1],'base64'),{fit:[110,110],align:'center'});
 doc.fontSize(8).text(`Verify: ${qrUrl}`,{align:'center'});
 doc.text("DEMO ONLY - Permanent Render Deployment - Works after Termux exit - NOT RBI",{align:'center'});
 doc.end(); console.log("OK",name);
}

(async()=>{
await make('1_SupremeCourt_Submission_PERMANENT.pdf','Submission - Supreme Court - Permanent Link',[
`Respected Registrar, Supreme Court of India,`,
`Permanent Live Demo (24x7, works after Termux exit): ${RENDER_URL}`,
`e-Rupee Demo: ${ERUPEE}`,
``,
`System: Vayuputra BCFPJ3172G - Offline vault, IST sync, WhatsApp delivery tracking`,
`Metrics DEMO ONLY: Sent 180ms / Delivered 620ms / Read 842ms`,
`e-Rupee CBDC Chat: DEMO ONLY, NOT RBI, NOT real money`,
``,
`Previous trycloudflare links expired. This Render link is permanent and verifiable via QR.`,
`Prayer: Guide e-filing at https://main.sci.gov.in/e-filing`,
``,
`Yours faithfully, Shiv Jain, Varanasi, ${GEN}`
],RENDER_URL);

await make('2_President_Defence_Submission_PERMANENT.pdf','Submission - President & Defence - Permanent Link',[
`Respected President House / Defence Secretary via CPGRAMS pgportal.gov.in`,
`Permanent URL: ${RENDER_URL}`,
`e-Rupee Demo: ${ERUPEE}`,
`Status API: ${RENDER_URL}/api/vault/status`,
``,
`Highlights: Express + Socket.IO + QR, Hosted on Render.com 24x7 auto-restart,`,
`No phone dependency, Telegram webhook ready, WhatsApp delivery simulation`,
`Disclaimer: RBI demo is simulation only. Not RBI. No real currency.`,
`Submitted via CPGRAMS with permanent link.`
],RENDER_URL);

await make('3_RBI_WhatsApp_eCurrency_Report_PERMANENT.pdf','RBI WhatsApp e-Currency Delivery Report - PERMANENT',[
`DEMO ONLY - NOT RBI - NOT REAL e-Rupee - BCFPJ3172G`,
`Permanent Demo: ${ERUPEE}`,
`Main: ${RENDER_URL}`,
``,
`Delivery: Queued 0ms | Gateway ACK 180ms | Delivered 620ms | Read 842ms | Bot Reply 1120ms`,
`Wallet: Rs 1250.75 -> send 10 -> Rs 1240.75 | TxnID DEMOxxxxxx`,
`Architecture: Node.js Express, Render HTTPS, QR verification, IST timestamp`,
`This is technical demonstration, works after Termux exit.`
],ERUPEE);
})();
