"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BudgetCalculator = () => {
  const [bhk, setBhk] = useState("2");
  const [quality, setQuality] = useState("premium");
  const [services, setServices] = useState({
    kitchen: true,
    living: true,
    masterBedroom: true,
    kidsBedroom: false,
    guestBedroom: false,
    falseCeiling: true,
    painting: true,
  });

  const [total, setTotal] = useState(0);

  const basePrices = {
    "1": 350000,
    "2": 550000,
    "3": 750000,
    "4": 950000,
  };

  const qualityMultipliers = {
    standard: 0.8,
    premium: 1.0,
    luxury: 1.5,
  };

  const serviceWeights = {
    kitchen: 0.35,
    living: 0.2,
    masterBedroom: 0.2,
    kidsBedroom: 0.15,
    guestBedroom: 0.15,
    falseCeiling: 0.1,
    painting: 0.05,
  };

  useEffect(() => {
    // @ts-ignore
    let base = basePrices[bhk] || 500000;
    // @ts-ignore
    let multiplier = qualityMultipliers[quality] || 1;
    
    let serviceFactor = 0;
    Object.entries(services).forEach(([key, value]) => {
      if (value) {
        // @ts-ignore
        serviceFactor += serviceWeights[key] || 0;
      }
    });

    // Normalize service factor (if all selected, it should be 1.2 for complexity)
    const calculatedTotal = base * multiplier * (0.5 + serviceFactor);
    setTotal(Math.round(calculatedTotal / 5000) * 5000); // Round to nearest 5k
  }, [bhk, quality, services]);

  const toggleService = (service: string) => {
    // @ts-ignore
    setServices(prev => ({ ...prev, [service]: !prev[service] }));
  };

  return (
    <div className="calculator-page">
      <section className="calc-hero">
        <div className="container">
          <h1>Budget <span className="text-orange">Calculator</span></h1>
          <p>Get an instant, data-driven estimate for your dream home interior project in Bangalore.</p>
        </div>
      </section>

      <section className="calc-main container">
        <div className="calc-grid">
          <div className="calc-inputs">
            {/* BHK Selection */}
            <div className="input-group">
              <label>Select Home Size</label>
              <div className="radio-grid">
                {["1", "2", "3", "4"].map((type) => (
                  <button 
                    key={type}
                    className={`radio-btn ${bhk === type ? 'active' : ''}`}
                    onClick={() => setBhk(type)}
                  >
                    {type} BHK
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Selection */}
            <div className="input-group">
              <label>Select Finish Quality</label>
              <div className="quality-grid">
                {[
                  { id: 'standard', name: 'Standard', desc: 'Functional & Durable' },
                  { id: 'premium', name: 'Premium', desc: 'Elite Materials & Finish' },
                  { id: 'luxury', name: 'Luxury', desc: 'Ultra-High End Custom' }
                ].map((q) => (
                  <button 
                    key={q.id}
                    className={`quality-btn ${quality === q.id ? 'active' : ''}`}
                    onClick={() => setQuality(q.id)}
                  >
                    <strong>{q.name}</strong>
                    <span>{q.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Checklist */}
            <div className="input-group">
              <label>What's included?</label>
              <div className="services-grid">
                {Object.entries(services).map(([key, value]) => (
                  <div key={key} className={`service-item ${value ? 'active' : ''}`} onClick={() => toggleService(key)}>
                    <span className="check">{value ? '✓' : ''}</span>
                    <span className="label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="calc-results">
            <div className="result-card">
              <span className="result-label">Estimated Budget Range</span>
              <div className="price-display">
                <span className="currency">₹</span>
                <span className="amount">{(total/100000).toFixed(1)}L - {((total * 1.15)/100000).toFixed(1)}L</span>
              </div>
              <p className="disclaimer">*Inclusive of GST, design, and execution. Final quote depends on site visit.</p>
              
              <div className="result-benefit">
                <div className="benefit">🛡️ 10 Year Warranty</div>
                <div className="benefit">📅 45-Day Delivery</div>
                <div className="benefit">✅ 150+ Quality Checks</div>
              </div>

              <Link href="/contact" className="btn-book">Get Detailed Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .calculator-page { background: #fcfcfc; min-height: 100vh; padding-bottom: 100px; }
        .calc-hero { 
          background: var(--brand-blue); 
          color: white; 
          padding: 80px 0; 
          text-align: center; 
          margin-bottom: 60px;
        }
        .calc-hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .calc-hero p { font-size: 1.2rem; opacity: 0.8; max-width: 600px; margin: 0 auto; }
        .text-orange { color: var(--brand-orange); }

        .calc-grid { 
          display: grid; 
          grid-template-columns: 1.5fr 1fr; 
          gap: 60px; 
          align-items: start; 
        }

        .input-group { margin-bottom: 40px; }
        .input-group label { 
          display: block; 
          font-size: 1.2rem; 
          font-weight: 800; 
          color: var(--brand-blue); 
          margin-bottom: 20px; 
        }

        .radio-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .radio-btn { 
          padding: 15px; 
          border: 2px solid #eee; 
          background: white; 
          border-radius: 12px; 
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .radio-btn.active { 
          border-color: var(--brand-orange); 
          background: rgba(245, 130, 32, 0.05); 
          color: var(--brand-orange); 
        }

        .quality-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .quality-btn {
          padding: 20px;
          border: 2px solid #eee;
          background: white;
          border-radius: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .quality-btn.active {
          border-color: var(--brand-orange);
          background: rgba(245, 130, 32, 0.05);
        }
        .quality-btn strong { display: block; font-size: 1.1rem; color: var(--brand-blue); margin-bottom: 5px; }
        .quality-btn span { font-size: 0.85rem; color: #666; }

        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .service-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: white;
          border-radius: 12px;
          border: 1px solid #eee;
          cursor: pointer;
          transition: 0.3s;
        }
        .service-item.active { border-color: var(--brand-orange); background: rgba(245, 130, 32, 0.02); }
        .check { 
          width: 24px; 
          height: 24px; 
          border: 2px solid #ddd; 
          border-radius: 6px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-weight: 900;
          color: var(--brand-orange);
        }
        .active .check { border-color: var(--brand-orange); background: var(--brand-orange); color: white; }

        .result-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          text-align: center;
          position: sticky;
          top: 120px;
        }
        .result-label { font-weight: 700; color: #666; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; }
        .price-display { margin: 20px 0; color: var(--brand-blue); }
        .currency { font-size: 2rem; font-weight: 500; vertical-align: top; margin-top: 10px; display: inline-block; }
        .amount { font-size: 4rem; font-weight: 900; letter-spacing: -2px; }
        .disclaimer { font-size: 0.85rem; color: #999; margin-bottom: 30px; }
        .result-benefit { margin-bottom: 30px; display: flex; flex-direction: column; gap: 10px; }
        .benefit { font-size: 0.95rem; font-weight: 700; color: #444; background: #f8f9fa; padding: 10px; border-radius: 10px; }
        .btn-book {
          display: block;
          background: var(--brand-orange);
          color: white;
          padding: 20px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 10px 20px rgba(245, 130, 32, 0.2);
          transition: 0.3s;
        }
        .btn-book:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(245, 130, 32, 0.3); }

        @media (max-width: 992px) {
          .calc-grid { grid-template-columns: 1fr; }
          .result-card { position: relative; top: 0; }
        }
      `}</style>
    </div>
  );
};

export default BudgetCalculator;
