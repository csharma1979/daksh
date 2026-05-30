"use client";

import { useState } from "react";
import { updateTestimonial } from "@/lib/actions/testimonials";
import { Loader2 } from "lucide-react";

export default function TestimonialStatusToggle({ id, isPublished }: { id: string, isPublished: boolean }) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(isPublished);

  const handleToggle = async () => {
    setLoading(true);
    const res = await updateTestimonial(id, { isPublished: !published });
    if (res.success) {
      setPublished(!published);
    } else {
      alert("Failed to update status");
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleToggle} 
      disabled={loading}
      className={`status-toggle-btn ${published ? 'published' : 'draft'}`}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : (published ? 'Published' : 'Hidden')}
      <style jsx>{`
        .status-toggle-btn {
          border: none;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-toggle-btn:hover:not(:disabled) { transform: scale(1.05); filter: brightness(1.1); }
        .status-toggle-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .published { background: #dcfce7; color: #15803d; }
        .draft { background: #f3f4f6; color: #6b7280; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
