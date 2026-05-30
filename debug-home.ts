import { getPageBySlug } from "./src/lib/actions/pages";
import dbConnect from "./src/lib/mongodb";

async function debugHome() {
  await dbConnect();
  const page = await getPageBySlug("home");
  console.log("HOME PAGE BLOCKS:", JSON.stringify(page?.content?.blocks, null, 2));
  process.exit(0);
}

debugHome();
