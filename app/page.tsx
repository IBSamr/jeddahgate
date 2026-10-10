import Site from "../components/site";
import {getConfig} from "../lib/store";
import {defaultConfig} from "../lib/config";

export const dynamic="force-dynamic";

export default async function Page(){
  const c=await getConfig().catch(()=>defaultConfig);
  return <Site initialConfig={c} lang="ar" page="home" legacyRoot/>;
}
