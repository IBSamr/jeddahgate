import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

const legacyPages=new Set(["about","services","request","offers","articles","contact","track","chat"]);

export function middleware(req:NextRequest){
  const pathname=req.nextUrl.pathname.replace(/\/+$/,"/");
  const page=pathname.replace(/^\//,"").replace(/\/$/,"");
  if(legacyPages.has(page)){
    const url=req.nextUrl.clone();
    url.pathname=`/ar/${page}`;
    return NextResponse.rewrite(url);
  }
  if(page.startsWith("articles/")){
    const url=req.nextUrl.clone();
    url.pathname=`/ar/${page}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config={matcher:["/about","/services","/request","/offers","/articles","/articles/:path*","/contact","/track","/chat"]};
