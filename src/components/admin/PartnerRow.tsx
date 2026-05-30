"use client";

import { useState } from "react";
import { updatePartnerStatus } from "@/lib/actions/enquiry";
import { Briefcase, MapPin, ExternalLink, Mail, Phone, Trash2 } from "lucide-react";

import "./PartnerRow.css";

export default function PartnerRow({ partner }: { partner: any }) {
  const [status, setStatus] = useState(partner.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    const res = await updatePartnerStatus(partner._id, newStatus);
    if (res.success) {
      setStatus(newStatus);
    }
    setLoading(false);
  };

  return (
    <tr className={`partner-row ${status === 'Pending' ? 'pending' : ''}`}>
      <td>
        <div className="date-text">{new Date(partner.createdAt).toLocaleDateString('en-IN')}</div>
      </td>
      <td className="partner-info">
        <div className="name">{partner.name}</div>
        <div className="contact">
          <a href={`tel:${partner.phone}`}><Phone size={12} /> {partner.phone}</a>
          <a href={`mailto:${partner.email}`}><Mail size={12} /> {partner.email}</a>
        </div>
      </td>
      <td className="prof-details">
        <div className="detail"><Briefcase size={14} /> {partner.profession} ({partner.experience} yrs)</div>
        <div className="detail"><MapPin size={14} /> {partner.city}</div>
        {partner.portfolio && (
          <a href={partner.portfolio} target="_blank" className="portfolio-link">
            Portfolio <ExternalLink size={12} />
          </a>
        )}
      </td>
      <td>
        <select 
          value={status} 
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          className={`status-select-admin ${status.toLowerCase()}`}
        >
          <option value="Pending">Pending</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Active">Active</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td>
        <button className="btn-icon-partner delete"><Trash2 size={16} /></button>
      </td>
    </tr>
  );
}
