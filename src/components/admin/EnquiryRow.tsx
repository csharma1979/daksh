"use client";

import { useState } from "react";
import { updateEnquiryStatus } from "@/lib/actions/enquiry";
import { Mail, Phone, MapPin, Home, CheckCircle, Trash2 } from "lucide-react";

import "./EnquiryRow.css";

export default function EnquiryRow({ enquiry }: { enquiry: any }) {
  const [status, setStatus] = useState(enquiry.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    const res = await updateEnquiryStatus(enquiry._id, newStatus);
    if (res.success) {
      setStatus(newStatus);
    }
    setLoading(false);
  };

  const formattedDate = new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <tr className={`enquiry-row ${status === 'Unread' ? 'unread' : 'read'}`}>
      <td className="date-cell">
        <div className="date-text">{formattedDate}</div>
        <div className="time-text">{new Date(enquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </td>
      <td className="customer-cell">
        <div className="customer-name">{enquiry.name}</div>
        <div className="contact-links">
          <a href={`tel:${enquiry.phone}`} title="Call"><Phone size={14} /> {enquiry.phone}</a>
          {enquiry.email && (
            <a href={`mailto:${enquiry.email}`} title="Email"><Mail size={14} /> {enquiry.email}</a>
          )}
        </div>
      </td>
      <td className="req-cell">
        <div className="req-item"><MapPin size={14} /> {enquiry.location}</div>
        <div className="req-item"><Home size={14} /> {enquiry.propertyType}</div>
        {enquiry.projectType && <div className="badge-outline">{enquiry.projectType}</div>}
      </td>
      <td className="source-cell">
        <div className="source-badge">{enquiry.source || "Website"}</div>
      </td>
      <td className="status-cell">
        <select 
          value={status} 
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          className={`status-select ${status.toLowerCase()}`}
        >
          <option value="Unread">Unread</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </td>
      <td className="actions-cell">
        <div className="action-btns">
          <button className="btn-icon-admin delete" title="Delete"><Trash2 size={16} /></button>
        </div>
      </td>
    </tr>
  );
}
