import "./clients.css";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getClients } from "@/lib/actions/clients";
import ClientList from "@/components/admin/ClientList";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="clients-page">
      <div className="clients-header">
        <div className="header-info">
          <h1>Our Partners</h1>
          <p>Manage the brands and clients showcased on your website.</p>
        </div>
        <Link href="/admin/clients/new" className="btn-add-client">
          <Plus size={20} />
          <span>Add Client</span>
        </Link>
      </div>

      <ClientList initialClients={clients} />
    </div>
  );
}
