import ClientForm from "@/components/admin/ClientForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "../clients.css";

export default function NewClientPage() {
  return (
    <div className="clients-page">
      <div className="clients-header">
        <div className="header-info">
          <Link href="/admin/clients" className="back-link">
            <ChevronLeft size={16} /> Back to Partners
          </Link>
          <h1>Add New Partner</h1>
          <p>Register a new brand or client to display on the website.</p>
        </div>
      </div>

      <ClientForm />
    </div>
  );
}
