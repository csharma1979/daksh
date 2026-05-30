"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/actions/enquiry";
import * as gtag from '@/lib/gtag';


const LeadForm = ({
  source = "Home Hero",
  ctaText = "Book Design Session"
}: {
  source?: string,
  ctaText?: string
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    propertyType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      location: formData.city,
      propertyType: formData.propertyType,
      source: source
    });

    if (res.success) {
      setSuccess(true);
      gtag.event('form_submit', {
        event_category: 'Lead',
        event_label: source,
      });
    } else {
      alert("Error: " + res.error);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="success-msg">
        <h3>🎉 Thank You!</h3>
        <p>Expert designers will contact you shortly.</p>
        <style jsx>{`
          .success-msg { text-align: center; padding: 20px; background: #dcfce7; border-radius: 12px; color: #15803d; }
          h3 { margin-bottom: 8px; }
        `}</style>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        required
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <select
        required
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      >
        <option value="" disabled>Select City</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi NCR">Delhi NCR</option>
        <option value="Pune">Pune</option>
      </select>
      <select
        required
        value={formData.propertyType}
        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
      >
        <option value="" disabled>Property Type</option>
        <option value="1BHK">1 BHK</option>
        <option value="2BHK">2 BHK</option>
        <option value="3BHK">3 BHK</option>
        <option value="4BHK+">4 BHK+</option>
        <option value="Villa">Villa</option>
      </select>
      <button type="submit" className="btn-consult-submit w-full" disabled={loading}>
        {loading ? "Processing..." : ctaText}
      </button>

      <style jsx>{`
        .lead-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        input, select {
          padding: var(--space-sm);
          border: 1px solid var(--brand-grey-light);
          border-radius: var(--border-radius);
          font-size: 1rem;
          outline: none;
          transition: var(--transition-smooth);
        }
        input:focus, select:focus {
          border-color: var(--brand-orange);
          box-shadow: 0 0 0 3px rgba(245, 130, 32, 0.1);
        }
        .btn-consult-submit {
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 18px;
          border-radius: var(--border-radius);
          font-weight: 800;
          font-size: 1.1rem;
          transition: var(--transition-smooth);
          box-shadow: 0 10px 20px rgba(245, 130, 32, 0.2);
        }
        .btn-consult-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(245, 130, 32, 0.4);
          background: #e67616;
        }
        .btn-consult-submit:active {
          transform: translateY(0);
        }
        .btn-consult-submit:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </form>
  );
};

export default LeadForm;
