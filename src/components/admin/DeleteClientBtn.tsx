"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteClient } from "@/lib/actions/clients";
import { useRouter } from "next/navigation";

export default function DeleteClientBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Remove this client from the website?")) return;
    
    setLoading(true);
    const res = await deleteClient(id);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to remove client");
    }
    setLoading(false);
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="btn-icon delete" title="Delete">
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      <style jsx>{`
        .delete:hover { color: #dc2626 !important; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
