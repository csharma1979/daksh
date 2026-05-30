"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/lib/actions/applications";
import { Loader2 } from "lucide-react";

const statuses = ["Applied", "Shortlisted", "Rejected", "Hired"];

export default function ApplicationStatusSelect({ id, initialStatus }: { id: string, initialStatus: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLoading(true);
    const res = await updateApplicationStatus(id, newStatus);
    if (res.success) {
      setStatus(newStatus);
    }
    setLoading(false);
  };

  return (
    <div className="status-select-container">
      {loading && <Loader2 size={12} className="animate-spin absolute-center" />}
      <select 
        value={status} 
        onChange={handleChange} 
        disabled={loading}
        className={`status-select status-${status.toLowerCase()}`}
      >
        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <style jsx>{`
        .status-select-container { position: relative; display: inline-block; }
        .status-select {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid transparent;
          cursor: pointer;
          appearance: none;
          transition: all 0.2s;
        }
        .status-applied { background: #e0f2fe; color: #0369a1; }
        .status-shortlisted { background: #fef3c7; color: #d97706; }
        .status-rejected { background: #fee2e2; color: #dc2626; }
        .status-hired { background: #dcfce7; color: #15803d; }
        .absolute-center { position: absolute; left: 5px; top: 10px; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
