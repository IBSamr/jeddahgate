import {getChatGPTUser} from "../app/chatgpt-auth";
import {runtime,hash} from "./store";
export async function isAdmin(req?:Request){const e=await runtime();const u=await getChatGPTUser();if(u&&e.PRIVATE_OWNER_ADMIN==="true")return true;
 if(!req||!e.ADMIN_SESSION_SECRET)return false;const cookie=req.headers.get("cookie")?.split(";").find(s=>s.trim().startsWith("jg_admin="))?.trim().slice(9);if(!cookie)return false;const [expires,signature]=cookie.split(".");return Number(expires)>Date.now()&&signature===await hash(e.ADMIN_SESSION_SECRET+expires);}
export async function requireAdmin(req:Request){if(!["GET","HEAD"].includes(req.method)){const origin=req.headers.get("origin");if(origin&&origin!==new URL(req.url).origin)throw new Error("Unauthorized");}if(!await isAdmin(req))throw new Error("Unauthorized");}
