import { getClients } from "./src/lib/actions/clients";
import dbConnect from "./src/lib/mongodb";

async function debugClients() {
  await dbConnect();
  const clients = await getClients();
  console.log("CLIENTS:", JSON.stringify(clients, null, 2));
  process.exit(0);
}

debugClients();
