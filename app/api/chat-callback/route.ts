import {getConfig} from "../../../lib/store";
import {providerEnv} from "../../../lib/providers";
export async function POST(req:Request){
  try{
    const {phone,lang,messages}=await req.json() as any;
    const normalized=String(phone||"").replace(/\D/g,"");
    if(normalized.length<8) throw new Error("Invalid phone number");
    const c=await getConfig();
    const e=await providerEnv();
    const to=String(c.contact.email||"").trim();
    if(!to||!e.RESEND_API_KEY||!e.EMAIL_FROM) return Response.json({ok:false,error:"Email notifications are not configured"},{status:503});
    const transcript=Array.isArray(messages)?messages.map((m:any)=>`${m.role==="user"?"Visitor":"Shahd"}: ${String(m.text||"")}`).join("\n"):"";
    const subject=lang==="ar"?"طلب اتصال من محادثة شهد":"Callback request from Shahd chatbot";
    const body=(lang==="ar"?"طلب عميل للتواصل من خلال شهد\n":"A visitor requested a callback through Shahd.\n")+`\nMobile: ${phone}\nLanguage: ${lang==="ar"?"Arabic":"English"}\n\nChat details:\n${transcript}`;
    const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${e.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:e.EMAIL_FROM,to:[to],subject,text:body})});
    if(!r.ok) return Response.json({ok:false,error:"Email provider rejected the message"},{status:502});
    return Response.json({ok:true});
  }catch(e:any){return Response.json({ok:false,error:e.message||"Callback unavailable"},{status:400});}
}
