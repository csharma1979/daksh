import ClientForm from "@/components/admin/ClientForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "../clients.css";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { notFound } from "next/navigation";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const client = await Client.findById(id);

  if (!client) {
    notFound();
  }

  const clientData = JSON.parse(JSON.stringify(client));

  return (
    <div className="clients-page">
      <div className="clients-header">
        <div className="header-info">
          <Link href="/admin/clients" className="back-link">
            <ChevronLeft size={16} /> Back to Partners
          </Link>
          <h1>Edit Partner</h1>
          <p>Update information for <strong>{clientData.name}</strong>.</p>
        </div>
      </div>

      <ClientForm initialData={clientData} />
    </div>
  );
}
