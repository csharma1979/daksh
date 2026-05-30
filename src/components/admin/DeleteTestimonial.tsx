"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import { useRouter } from "next/navigation";

export default function DeleteTestimonial({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    setLoading(true);
    const res = await deleteTestimonial(id);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to delete testimonial");
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="btn-icon delete" 
      title="Delete"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      <style jsx>{`
        .delete:hover { color: #dc2626 !important; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
