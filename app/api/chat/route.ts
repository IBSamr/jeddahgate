import {query,getConfig,rateLimit} from "../../../lib/store";
export async function POST(req:Request){
 try{
  const {id,message,lang}=await req.json() as any;
  if(typeof id!=="string"||!/^[a-f0-9-]{36}$/.test(id))throw new Error("Invalid conversation");
  const l=lang==="ar"?"ar":"en";
  const c=await getConfig();
  if(!c.bot.enabled)throw new Error("Chat is unavailable");
  let messages:any[]=[];
  try{await rateLimit("chat:"+(req.headers.get("cf-connecting-ip")||"unknown"),100)}catch{}
  try{const existing=await query("SELECT messages FROM conversations WHERE id=?",[id],"first");if(existing)messages=JSON.parse(existing.messages)}catch{}
  if(message){
   if(typeof message!=="string"||message.length>1000)throw new Error("Message too long");
   const normalize=(s:any)=>String(s||"").toLowerCase().normalize("NFKC").replace(/[؟?.,!،؛:]/g,"").replace(/\s+/g," ").trim();
   const m=normalize(message);
   const answers=[...(c.bot.faqs||[]),...(c.faq||[])];
   const matched=answers.find((f:any)=>{const q=normalize(f.question?.[l]||f.question);const keys=String(f.keywords||"").split(",").map(normalize).filter(Boolean);return (q&& (q===m||q.includes(m)||m.includes(q)))||keys.some((k:string)=>m.includes(k))});
   const answer=String(matched?.answer?.[l]||matched?.answer||c.bot.fallback?.[l]||"I will ask one of our live agents to answer you shortly.");
   messages.push({role:"user",text:message},{role:"assistant",text:answer});messages=messages.slice(-100);
   try{await query("INSERT INTO conversations(id,messages,updated) VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET messages=excluded.messages,updated=excluded.updated",[id,JSON.stringify(messages),new Date().toISOString()],"run")}catch{}
  }
  return Response.json({messages});
 }catch(e:any){return Response.json({error:e.message||"Chat unavailable"},{status:400});}
}
