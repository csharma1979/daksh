"use client";

import { useState } from "react";
import Link from "next/link";
import { submitEnquiry } from "@/lib/actions/enquiry";
import * as gtag from '@/lib/gtag';

const ContactPageForm = ({ source = "/contact" }: { source?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    projectType: "Home Interiors",
    propertyType: "2BHK",
    budget: "5L - 10L",
    message: "",
    source: source
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      handleNext();
    } else {
      setLoading(true);
      const res = await submitEnquiry(formData);
      if (res.success) {
        setSubmitted(true);
        gtag.event('form_submit', {
          event_category: 'Contact',
          event_label: source,
        });
      } else {
        alert("Error: " + res.error);
      }
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="thank-you-card">
        <div className="success-icon">✅</div>
        <h3>Enquiry Received!</h3>
        <p>Our expert designers will contact you within 24 hours.</p>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h3>Start Your Project</h3>
        <p>Step {step} of {totalSteps}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <div className="input-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                required 
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step slide-in">
            <div className="input-group">
              <label>Location (City/Area) *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Whitefield, Bangalore"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Project Type</label>
              <select value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})}>
                <option>Home Interiors</option>
                <option>Office Interiors</option>
                <option>Renovation</option>
                <option>Turnkey Projects</option>
              </select>
            </div>
            <div className="input-group">
              <label>Property Type</label>
              <select value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})}>
                <option>1BHK</option>
                <option>2BHK</option>
                <option>3BHK / Villa</option>
                <option>Commercial Space</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step slide-in">
            <div className="input-group">
              <label>Budget Range</label>
              <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                <option>Under 5L</option>
                <option>5L - 10L</option>
                <option>10L - 20L</option>
                <option>20L+</option>
              </select>
            </div>
            <div className="input-group">
              <label>Message (Optional)</label>
              <textarea 
                placeholder="Tell us more about your requirements..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
          </div>
        )}

        <div className="form-actions">
          {step > 1 && <button type="button" className="btn-back" onClick={handleBack}>Back</button>}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Sending..." : (step === totalSteps ? "Get Free Quote →" : "Continue")}
          </button>
        </div>
      </form>

      <div className="form-trust-boosters">
        <div className="booster">⭐ 500+ Happy Clients</div>
        <div className="booster">⏱️ On-Time Delivery</div>
      </div>

      <style jsx>{`
        .contact-form-container {
          background: var(--brand-white);
          padding: 40px;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(0, 43, 91, 0.05);
        }
        .form-header {
          margin-bottom: 30px;
        }
        .form-header h3 { font-size: 1.8rem; margin-bottom: 5px; }
        .form-header p { font-size: 0.9rem; color: var(--brand-grey-dark); margin-bottom: 15px; }
        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(0, 43, 91, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--brand-orange);
          transition: width 0.4s ease;
        }
        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--brand-blue);
        }
        input, select, textarea {
          width: 100%;
          padding: 14px 18px;
          border: 1px solid rgba(0, 43, 91, 0.1);
          border-radius: 12px;
          font-size: 1rem;
          background: var(--brand-cream);
          transition: var(--transition-smooth);
        }
        input:focus, select:focus, textarea:focus {
          border-color: var(--brand-orange);
          outline: none;
          background: var(--brand-white);
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
        }
        textarea { height: 100px; resize: none; }
        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        .btn-submit {
          flex: 2;
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 16px;
          border-radius: 12px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .btn-back {
          flex: 1;
          background: transparent;
          color: var(--brand-blue);
          border: 1px solid rgba(0, 43, 91, 0.2);
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .form-trust-boosters {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 43, 91, 0.05);
        }
        .booster { font-size: 0.8rem; font-weight: 700; color: var(--brand-blue); opacity: 0.7; }
        .thank-you-card { text-align: center; padding: 40px 0; }
        .success-icon { font-size: 4rem; margin-bottom: 20px; }
        .thank-you-card h3 { font-size: 2rem; margin-bottom: 10px; }
        .thank-you-card p { margin-bottom: 30px; color: var(--brand-grey-dark); }
        .slide-in { animation: slideIn 0.4s ease forwards; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ContactPageForm;
