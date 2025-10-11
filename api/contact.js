// ESM nodemailer endpoint
import nodemailer from 'nodemailer'
const S=v=> typeof v==='string'? v : (v==null? '' : String(v))
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).send('Method Not Allowed')
  try{
    const d=req.body||{}; const name=S(d.name), email=S(d.email), phone=S(d.phone), company=S(d.company), message=S(d.message)
    const {SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS,SMTP_TO,SMTP_FROM}=process.env
    if(!(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_TO && SMTP_FROM)) return res.status(500).json({ok:false,error:'Missing SMTP env vars'})
    const tx=nodemailer.createTransport({host:SMTP_HOST,port:Number(SMTP_PORT),secure:Number(SMTP_PORT)===465,auth:{user:SMTP_USER,pass:SMTP_PASS}})
    const html=`<h2>New Website Lead</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Company:</b> ${company}</p><p><b>Message:</b><br/>${S(message).replace(/\n/g,'<br/>')}</p>`
    await tx.sendMail({from:SMTP_FROM,to:SMTP_TO,subject:`Griffon Website Lead — ${name}`,html})
    return res.status(200).json({ok:true})
  }catch(e){console.error(e); return res.status(500).json({ok:false,error:'Internal Error'})}
}
