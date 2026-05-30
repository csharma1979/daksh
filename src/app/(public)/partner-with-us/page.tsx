"use client";

import Image from "next/image";
import PartnerForm from "@/components/PartnerForm";
import FAQSection from "@/components/FAQSection";
import TrustStats from "@/components/TrustStats";

const partnerFaqs = [
  {
    question: "How does the referral commission work?",
    answer: "We offer a competitive 10-15% commission on the total project value for every client you refer who signs up for a full home interior package."
  },
  {
    question: "Will I still lead the design process?",
    answer: "Yes, you can choose to be the lead designer while we handle the manufacturing and execution, or you can leverage our design team as an extension of your own."
  },
  {
    question: "What support does Daksh provide to partners?",
    answer: "Partners get access to our 3D design software, premium material libraries, and a dedicated project manager for seamless execution."
  },
  {
    question: "Is there a registration fee to join?",
    answer: "No, joining the Daksh Design Partner Network is completely free. We select partners based on their portfolio and professional track record."
  },
  {
    question: "Do you provide marketing support?",
    answer: "Yes, we co-market our star partners on our social media handles and provide branded collateral for your clients."
  }
];

import { useEffect, useState } from "react";
import { getPageBySlug } from "@/lib/actions/pages";

export default function PartnerPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPageBySlug("partner-with-us");
      if (data) setPageData(data);
    }
    fetchData();
  }, []);

  const content = pageData?.content || {
    hero: {
      title: "Empowering Independent Designers",
      subtitle: "Scale your business with India's most advanced manufacturing backend and turnkey execution support.",
      image: "/partner-hero.png"
    }
  };

  return (
    <main className="partner-page">
      {/* Hero Section */}
      <section className="partner-hero">
        <Image 
          src={content.hero.image} 
          alt="Partner with Daksh Interiors" 
          fill 
          priority 
          style={{ objectFit: 'cover' }}
          className="hero-img"
        />
        <div className="container hero-content">
          <h1>{content.hero.title.replace("Designers", "").trim()} <span className="text-orange">Independent Designers</span></h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="tel:+919876543210" className="btn-hero">📞 Call Now</a>
            <a href="#partner-form" className="btn-hero-primary">📅 Become a Partner</a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section container">
        <div className="section-header">
          <h2>Why Partner with <span className="text-orange">Daksh?</span></h2>
          <p>We provide the tools and execution power so you can focus on what you do best: Designing.</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="icon">🚀</div>
            <h3>Fastest Execution</h3>
            <p>Industry-leading 45-day delivery guarantee from factory to finish.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">💰</div>
            <h3>Lucrative Earnings</h3>
            <p>Earn high referral commissions or enjoy bulk pricing for your projects.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">💎</div>
            <h3>Premium Quality</h3>
            <p>Access to German-engineered hardware and ISO-certified manufacturing.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">🛠️</div>
            <h3>Turnkey Support</h3>
            <p>We handle civil, electrical, plumbing, and site management for you.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="partner-form" className="form-section container">
        <div className="form-layout">
          <div className="form-text">
            <h2>Start Your <span className="text-orange">Partnership Journey</span></h2>
            <p>Join 200+ architects and designers who trust Daksh for their project execution. Fill out the form and our team will be in touch.</p>
            <ul className="checklist">
              <li>✓ Dedicated Account Manager</li>
              <li>✓ Exclusive Material Library</li>
              <li>✓ Payment Protection & Timely Payouts</li>
            </ul>
          </div>
          <div className="form-component">
            <PartnerForm />
          </div>
        </div>
      </section>

      <TrustStats />

      {/* FAQ Section */}
      <FAQSection 
        items={partnerFaqs} 
        title="Partner FAQs" 
        subtitle="Common questions from our designer and architect network."
      />

      <style jsx>{`
        .partner-page { width: 100%; }
        .partner-hero {
          position: relative;
          padding: 120px 0;
          color: var(--brand-white);
          text-align: center;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .partner-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          z-index: 2;
        }
        .hero-img {
          z-index: 1;
        }
        .hero-content { 
          position: relative; 
          z-index: 10; 
          max-width: 1080px;
          margin: 0 auto;
        }
        .hero-content h1 { 
          font-size: 4rem; 
          line-height: 1.1; 
          margin-bottom: 24px; 
          color: var(--brand-white) !important;
          text-shadow: 0 4px 15px rgba(0,0,0,0.4); 
        }
        .text-orange { color: var(--brand-orange); }
        .hero-content p { 
          font-size: 1.4rem; 
          color: var(--brand-white) !important;
          margin-bottom: 40px; 
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          font-weight: 500;
        }
        .hero-ctas { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        .btn-hero { 
          background: rgba(255, 255, 255, 0.1); 
          color: var(--brand-white); 
          padding: 15px 30px; 
          border-radius: 40px; 
          font-weight: 700; 
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: var(--transition-smooth);
        }
        .btn-hero:hover { background: var(--brand-white); color: var(--brand-blue); }
        .btn-hero-primary {
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 15px 35px;
          border-radius: 40px;
          font-weight: 800;
          transition: var(--transition-smooth);
        }
        .btn-hero-primary:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3); }

        .benefits-section { padding: var(--space-xxl) 0; }
        .section-header { text-align: center; margin-bottom: var(--space-xl); }
        .section-header h2 { font-size: 3rem; margin-bottom: 12px; }
        .benefits-grid { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: var(--space-lg); 
        }
        .benefit-card {
          background: var(--brand-cream);
          padding: var(--space-lg);
          border-radius: 24px;
          text-align: center;
          transition: var(--transition-smooth);
          border: 1px solid var(--brand-grey-light);
        }
        .benefit-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-md); border-color: var(--brand-orange); }
        .benefit-card .icon { font-size: 3rem; margin-bottom: 20px; }
        .benefit-card h3 { margin-bottom: 12px; color: var(--brand-blue); }
        .benefit-card p { opacity: 0.7; font-size: 0.95rem; line-height: 1.6; }

        .form-section { padding: var(--space-xxl) 0; background: #f9fafb; border-radius: 40px; margin-bottom: var(--space-xxl); }
        .form-layout { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: start; }
        .form-text h2 { font-size: 3.5rem; margin-bottom: 24px; line-height: 1.1; }
        .form-text p { font-size: 1.2rem; opacity: 0.8; margin-bottom: 40px; line-height: 1.6; }
        .checklist { list-style: none; }
        .checklist li { margin-bottom: 20px; font-size: 1.2rem; font-weight: 600; color: var(--brand-blue); }

        @media (max-width: 1024px) {
          .benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .form-layout { grid-template-columns: 1fr; text-align: center; }
          .hero-text h1 { font-size: 3rem; }
          .form-text h2 { font-size: 2.5rem; }
          .hero-cta { justify-content: center; }
          .checklist { display: inline-block; text-align: left; }
        }
        @media (max-width: 640px) {
          .benefits-grid { grid-template-columns: 1fr; }
          .partner-hero { min-height: 70vh; }
        }
      `}</style>
    </main>
  );
}
