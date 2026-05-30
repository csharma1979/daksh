"use client";

import { useState } from "react";
import { updateClient } from "@/lib/actions/clients";
import { Loader2 } from "lucide-react";

export default function ClientStatusToggle({ id, isActive, iconOnly = false }: { id: string, isActive: boolean, iconOnly?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(isActive);

  const handleToggle = async () => {
    setLoading(true);
    const res = await updateClient(id, { isActive: !active });
    if (res.success) {
      setActive(!active);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleToggle} 
      disabled={loading}
      className={`status-btn ${active ? 'active' : 'inactive'}`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : (active ? 'Active' : 'Inactive')}
      <style jsx>{`
        .status-btn {
          border: none;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        .status-btn:hover:not(:disabled) { transform: scale(1.05); filter: brightness(1.1); }
        .active { background: #dcfce7; color: #15803d; }
        .inactive { background: #f3f4f6; color: #6b7280; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
