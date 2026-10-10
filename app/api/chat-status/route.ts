import {query,getConfig} from "../../../lib/store";

const digits=(v:any)=>String(v||"").replace(/\D/g,"");

export async function POST(req:Request){
  try{
    const {phone,lang}=await req.json() as any;
    const wanted=digits(phone);
    if(wanted.length<8)return Response.json({error:"Invalid phone number"},{status:400});
    const rows:any[]=await query("SELECT id,status,phone,created FROM request_records ORDER BY created DESC LIMIT 200");
    const record=rows.find(r=>digits(r.phone)===wanted);
    if(!record)return Response.json({found:false});
    const c=await getConfig();
    const index=Math.max(0,Math.min(c.stages.length-1,Number(record.status)||0));
    return Response.json({found:true,reference:record.id,status:index,stage:c.stages[index]?.[lang==="ar"?"ar":"en"]||"Under review"});
  }catch(e:any){return Response.json({error:e.message||"Status lookup unavailable"},{status:400});}
}
