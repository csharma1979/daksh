"use client";

import { useState } from "react";
import { submitPartnerRequest } from "@/lib/actions/enquiry";

const PartnerForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      city: formData.get("city"),
      profession: formData.get("profession"),
      experience: formData.get("experience"),
      portfolio: formData.get("portfolio"),
    };

    const res = await submitPartnerRequest(data);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Error submitting application. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="success-icon">✨</div>
        <h3>Application Received!</h3>
        <p>Our partnership team will review your profile and reach out within 48 hours to discuss the next steps.</p>
        <button onClick={() => setSubmitted(false)} className="btn-secondary">Back to Form</button>
        <style jsx>{`
          .form-success {
            text-align: center;
            padding: var(--space-xl);
            background: var(--brand-white);
            border-radius: 24px;
            box-shadow: var(--shadow-lg);
          }
          .success-icon { font-size: 4rem; margin-bottom: 20px; }
          .form-success h3 { font-size: 1.8rem; color: var(--brand-blue); margin-bottom: 12px; }
          .form-success p { color: var(--brand-grey-dark); margin-bottom: 30px; opacity: 0.8; line-height: 1.6; }
          .btn-secondary {
            background: var(--brand-blue);
            color: var(--brand-white);
            padding: 12px 30px;
            border: none;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  return (
    <form className="partner-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input type="text" name="name" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label>Mobile Number *</label>
          <input type="tel" name="phone" placeholder="+91 98765 43210" required />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" name="email" placeholder="john@example.com" required />
        </div>
        <div className="form-group">
          <label>City *</label>
          <input type="text" name="city" placeholder="e.g. Gurugram" required />
        </div>
        <div className="form-group full-width">
          <label>Profession *</label>
          <select name="profession" required>
            <option value="">Select Profession</option>
            <option value="architect">Architect</option>
            <option value="interior-designer">Interior Designer</option>
            <option value="contractor">Contractor / Civil Expert</option>
            <option value="dealer">Material Dealer / Vendor</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label>Experience (Years)</label>
          <input type="number" name="experience" placeholder="5" />
        </div>
        <div className="form-group full-width">
          <label>Current Portfolio Link (Optional)</label>
          <input type="url" name="portfolio" placeholder="https://behance.net/yourprofile" />
        </div>
      </div>
      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Sending Application..." : "Register as Partner"}
      </button>

      <style jsx>{`
        .partner-form {
          background: var(--brand-white);
          padding: var(--space-xl);
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--brand-grey-light);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .full-width { grid-column: span 2; }
        label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--brand-blue);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        input, select {
          padding: 14px 18px;
          border-radius: 12px;
          border: 2px solid #E5E7EB;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input:focus, select:focus {
          outline: none;
          border-color: var(--brand-orange);
        }
        .btn-submit {
          width: 100%;
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 18px;
          border: none;
          border-radius: 14px;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .btn-submit:hover {
          background: var(--brand-blue);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 43, 91, 0.2);
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: auto; }
        }
      `}</style>
    </form>
  );
};

export default PartnerForm;
