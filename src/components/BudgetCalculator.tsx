"use client";

import { useState, useEffect } from "react";

const BHK_PRICES: Record<string, number> = {
  "1BHK": 350000,
  "2BHK": 550000,
  "3BHK": 850000,
  "4BHK+": 1200000,
};

const QUALITY_MULTIPLIER: Record<string, number> = {
  "Essential": 1,
  "Premium": 1.4,
  "Luxury": 2.2,
};

const BudgetCalculator = () => {
  const [bhk, setBhk] = useState("2BHK");
  const [quality, setQuality] = useState("Premium");
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const base = BHK_PRICES[bhk] || 0;
    const multiplier = QUALITY_MULTIPLIER[quality] || 1;
    setEstimate(Math.round(base * multiplier));
  }, [bhk, quality]);

  return (
    <div className="calculator-card">
      <h3>Interior Cost Estimator</h3>
      <p>Get an instant estimate for your home</p>

      <div className="input-group">
        <label>Property Size</label>
        <div className="radio-group">
          {Object.keys(BHK_PRICES).map((type) => (
            <button
              key={type}
              className={bhk === type ? "active" : ""}
              onClick={() => setBhk(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label>Design Quality</label>
        <div className="radio-group">
          {Object.keys(QUALITY_MULTIPLIER).map((q) => (
            <button
              key={q}
              className={quality === q ? "active" : ""}
              onClick={() => setQuality(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="result-area">
        <span className="label">Estimated Investment</span>
        <h2 className="price">₹{estimate.toLocaleString()} - ₹{(estimate * 1.1).toLocaleString()}*</h2>
        <p className="disclaimer">*Excluding GST. Actual pricing depends on materials & scope.</p>
      </div>

      <button className="btn-primary w-full mt-md">Get Detailed Quote</button>

      <style jsx>{`
        .calculator-card {
          background: var(--brand-white);
          padding: var(--space-lg);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--brand-blue-transparent);
        }
        h3 { color: var(--brand-blue); margin-bottom: 5px; }
        p { color: var(--brand-grey); font-size: 0.9rem; margin-bottom: 20px; }
        .input-group { margin-bottom: 20px; }
        label { display: block; font-weight: 600; margin-bottom: 10px; font-size: 0.9rem; }
        .radio-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .radio-group button {
          flex: 1;
          min-width: 80px;
          padding: 8px;
          border: 1px solid var(--brand-grey-light);
          background: transparent;
          border-radius: 6px;
          font-size: 0.85rem;
          color: var(--brand-grey);
        }
        .radio-group button.active {
          background: var(--brand-blue);
          color: var(--brand-white);
          border-color: var(--brand-blue);
        }
        .result-area {
          background: var(--brand-cream);
          padding: var(--space-md);
          border-radius: 8px;
          text-align: center;
          margin-top: 10px;
        }
        .result-area .label { font-size: 0.8rem; color: var(--brand-blue); text-transform: uppercase; letter-spacing: 1px; }
        .price { color: var(--brand-blue); margin: 5px 0; }
        .disclaimer { font-size: 0.7rem; color: var(--brand-grey); margin-bottom: 0; }
        .w-full { width: 100%; }
        .mt-md { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default BudgetCalculator;
