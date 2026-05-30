"use client";

import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import TrustStats from "@/components/TrustStats";
import FullWidthCTA from "@/components/FullWidthCTA";
import CustomerReviews from "@/components/CustomerReviews";
import { 
  CheckCircle, 
  MapPin, 
  PhoneCall, 
  Sparkles, 
  Clock, 
  ClipboardCheck,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function ConsultationPage() {
  const steps = [
    {
      icon: <PhoneCall size={32} />,
      title: "Schedule Call",
      desc: "Fill the form and our design consultant will call you to understand your needs."
    },
    {
      icon: <Sparkles size={32} />,
      title: "Design Session",
      desc: "Meet our experts for a personalized session and see 3D visualizations of your space."
    },
    {
      icon: <ClipboardCheck size={32} />,
      title: "Get Execution Plan",
      desc: "Receive a detailed quote and timeline for your end-to-end interior transformation."
    }
  ];

  const benefits = [
    { icon: <ShieldCheck />, title: "10 Year Warranty", desc: "Long-standing durability guaranteed." },
    { icon: <Clock />, title: "45-Day Delivery", desc: "Move into your dream home on time." },
    { icon: <Zap />, title: "No Hidden Costs", desc: "Transparent pricing from day one." }
  ];

  return (
    <div className="consultation-page">
      {/* Hero Section */}
      <section className="consult-hero">
        <Image 
          src="/hero-bg.jpg" 
          alt="Luxury Interior background" 
          fill 
          priority 
          style={{ objectFit: 'cover', opacity: 0.15 }}
          className="hero-bg-overlay"
        />
        <div className="container hero-grid" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-text">
            <span className="badge">Limited Slots Available</span>
            <h1>Book Your <span className="text-orange">Free Design Consultation</span></h1>
            <p className="hero-p">Experience the future of home interiors. Our experts help you visualize your dream space with personalized 3D designs and expert guidance.</p>
            
            <div className="features-list">
              <div className="feature-item">
                <CheckCircle className="text-orange" size={20} />
                <span>Expert 3D Design Preview</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="text-orange" size={20} />
                <span>Personalized Material Selection</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="text-orange" size={20} />
                <span>Detailed Execution Roadmap</span>
              </div>
            </div>
          </div>

          <div className="form-container" id="book-form">
            <div className="form-card">
              <h3>Start Your Journey</h3>
              <p>Fill in the details below to lock your free session.</p>
              <LeadForm source="Consultation Page" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>Your Journey to a <span className="text-orange">Exquisite Home</span></h2>
            <p>Our seamless 3-step process to transform your vision into reality.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <a href="#book-form" key={i} className="step-card">
                <div className="step-num">{i + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="step-cta">Get Started →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="benefits-section">
        <div className="container grid-2">
          <div className="benefits-image">
             <div className="image-wrapper">
                <Image 
                  src="/consultation-benefits.png" 
                  alt="Expert consultation session" 
                  width={600} 
                  height={500} 
                  style={{ objectFit: 'cover', borderRadius: '24px' }}
                />
             </div>
          </div>
          <div className="benefits-content">
            <h2 className="title-md">Why Consult with <span className="text-orange">Daksh Interiors?</span></h2>
            <div className="benefits-list">
              {benefits.map((b, i) => (
                <div key={i} className="benefit-item">
                  <div className="benefit-icon">{b.icon}</div>
                  <div className="benefit-text">
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStats />
      
      <FullWidthCTA 
        title="Ready for the Transformation?" 
        subtitle="Professional Site Measurement | **45-Day Delivery Guarantee** | 10-Year Warranty"
        image="/consultation-benefits.png"
        source="Consultation Page Bottom"
      />
      
      <div style={{ padding: '60px 0', background: 'var(--brand-white)' }}>
        <CustomerReviews />
      </div>

      <style jsx>{`
        .consultation-page {
          background: var(--brand-cream);
        }
        
        /* Hero */
        .consult-hero {
          background: var(--brand-blue);
          color: var(--brand-white);
          padding: 100px 0;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: var(--space-xl);
          align-items: center;
        }
        .badge {
          background: rgba(245, 130, 32, 0.2);
          color: var(--brand-orange);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 24px;
        }
        h1 {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .hero-p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .features-list {
          display: grid;
          gap: 16px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }
        
        .form-card {
          background: var(--brand-white);
          padding: 40px;
          border-radius: 24px;
          color: var(--brand-black);
          box-shadow: var(--shadow-lg);
          border-top: 5px solid var(--brand-orange);
        }
        .form-card h3 {
          font-size: 1.8rem;
          margin-bottom: 12px;
          color: var(--brand-blue);
        }
        .form-card p {
          color: #666;
          margin-bottom: 24px;
        }

        /* How it works */
        .how-it-works {
          padding: 100px 0;
          background: var(--brand-white);
        }
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 60px;
        }
        .section-header h2 { font-size: 3rem; margin-bottom: 16px; }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .step-card {
          background: var(--brand-cream);
          padding: 50px 30px;
          border-radius: 20px;
          text-align: center;
          position: relative;
          transition: var(--transition-smooth);
        }
        .step-card:hover { transform: translateY(-10px); }
        .step-num {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 4rem;
          font-weight: 900;
          opacity: 0.05;
          line-height: 1;
        }
        .step-icon {
          color: var(--brand-orange);
          margin-bottom: 24px;
        }
        .step-card h3 { margin-bottom: 16px; }
        
        /* Benefits */
        .benefits-section {
          padding: 100px 0;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .image-placeholder {
          background: var(--brand-blue);
          height: 500px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--brand-cream);
          opacity: 0.2;
        }
        .benefit-item {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          padding: 24px;
          background: var(--brand-white);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }
        .benefit-icon {
          color: var(--brand-orange);
          background: rgba(245, 130, 32, 0.1);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }
        .benefit-text h4 { margin-bottom: 4px; }

        @media (max-width: 1024px) {
          .hero-grid, .grid-2 { grid-template-columns: 1fr; text-align: center; }
          .form-container { display: flex; justify-content: center; }
          h1 { font-size: 3rem; }
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
