import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import type {NextConfig} from "next";import path from "node:path";
const config:NextConfig={output:"standalone",...(process.env.HOSTINGER_BUILD==="true"?{webpack(config:any){config.plugins.push(new (require("webpack").NormalModuleReplacementPlugin)(/^cloudflare:workers$/,path.resolve("./lib/node-env.ts")));return config;}}:{})};export default config;
