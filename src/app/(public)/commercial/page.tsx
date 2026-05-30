"use client";

import Image from "next/image";
import ContactPageForm from "@/components/ContactPageForm";
import FAQSection from "@/components/FAQSection";
import TrustStats from "@/components/TrustStats";
import { useEffect, useState } from "react";
import { getPageBySlug } from "@/lib/actions/pages";

const commercialFaqs = [
  {
    question: "Do you handle industrial and warehouse interiors?",
    answer: "Yes, we specialize in large-format commercial spaces, including warehouses, industrial offices, and specialized manufacturing plants."
  },
  {
    question: "What is your timeline for office renovations?",
    answer: "We offer accelerated timelines for business spaces to minimize downtime. Small offices can be completed in 30 days, while larger corporate hubs typically take 60-90 days."
  },
  {
    question: "Do you provide turnkey electrical and networking solutions?",
    answer: "Absolutely. Our commercial services include HVAC, data networking, fire safety compliance, and comprehensive electrical infrastructure."
  },
  {
    question: "Can you work around our existing business hours?",
    answer: "For minor renovations, we offer night-shift and weekend-shift execution to ensure your business operations remain uninterrupted."
  }
];

export default function CommercialPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPageBySlug("commercial");
      if (data) setPageData(data);
    }
    fetchData();
  }, []);

  const content = pageData?.content || {
    hero: {
      title: "Elevate Your Business Space",
      subtitle: "Strategic design and turnkey execution for high-performance offices and retail environments.",
      image: "/commercial_hero_banner.png"
    }
  };

  return (
    <main className="commercial-page">
      {/* Hero Section */}
      <section className="commercial-hero">
        <Image
          src={content.hero.image || "/commercial_hero_banner.png"}
          alt="Commercial Interior Design"
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="hero-img"
        />
        <div className="container hero-content">
          <h1>{content.hero.title} <span className="text-orange">Corporate Excellence</span></h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="tel:+919876543210" className="btn-hero">📞 Instant Callback</a>
            <a href="#commercial-form" className="btn-hero-primary">📅 Book Consultation</a>
          </div>
        </div>
      </section>

      {/* Commercial Services Grid */}
      <section id="services" className="services-section container">
        <div className="section-header">
          <h2>Commercial <span className="text-orange">Excellence</span></h2>
          <p>We transform empty spaces into high-performance assets for your business.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon">🏢</div>
            <h3>Corporate Offices</h3>
            <p>Smart workspaces designed for productivity, collaboration, and employee well-being.</p>
          </div>
          <div className="service-card">
            <div className="icon">🛍️</div>
            <h3>Retail & Showrooms</h3>
            <p>High-conversion retail environments that reflect your brand identity and attract customers.</p>
          </div>
          <div className="service-card">
            <div className="icon">☕</div>
            <h3>Hospitality & F&B</h3>
            <p>Captivating cafes, restaurants, and lounges that offer unique guest experiences.</p>
          </div>
          <div className="service-card">
            <div className="icon">🏭</div>
            <h3>Industrial Spaces</h3>
            <p>Efficient warehousing and industrial office solutions with robust execution.</p>
          </div>
        </div>
      </section>

      {/* Split Form Section */}
      <section id="commercial-form" className="form-section container">
        <div className="form-layout">
          <div className="form-text">
            <h2>Scale Your <span className="text-orange">Project With Us</span></h2>
            <p>From initial space planning to final handover, our dedicated project managers ensure every commercial project is delivered on time and within budget.</p>
            <ul className="checklist">
              <li>✓ 3D Virtual Walkthroughs</li>
              <li>✓ Project Lifecycle Management</li>
              <li>✓ Pan-India Execution Support</li>
              <li>✓ GST-Compliant Billing</li>
            </ul>
          </div>
          <div className="form-component">
            <ContactPageForm source="/commercial" />
          </div>
        </div>
      </section>

      <TrustStats />

      <FAQSection
        items={commercialFaqs}
        title="Commercial FAQs"
        subtitle="Addressing common project requirements for our corporate and business clients."
      />

      <style jsx>{`
        .commercial-page { width: 100%; }
        .commercial-hero {
          position: relative;
          padding: 120px 0;
          color: var(--brand-white);
          text-align: center;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .commercial-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          z-index: 2;
        }
        .hero-img { z-index: 1; }
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
          text-decoration: none;
        }
        .btn-hero:hover { background: var(--brand-white); color: var(--brand-blue); }
        .btn-hero-primary {
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 15px 35px;
          border-radius: 40px;
          font-weight: 800;
          transition: var(--transition-smooth);
          text-decoration: none;
        }
        .btn-hero-primary:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3); }

        .services-section { padding: var(--space-xxl) 0; }
        .section-header { text-align: center; margin-bottom: var(--space-xl); }
        .section-header h2 { font-size: 3rem; margin-bottom: 12px; }
        .services-grid { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: var(--space-lg); 
        }
        .service-card {
          background: var(--brand-cream);
          padding: var(--space-lg);
          border-radius: 24px;
          text-align: center;
          transition: var(--transition-smooth);
          border: 1px solid var(--brand-grey-light);
        }
        .service-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-md); border-color: var(--brand-orange); }
        .service-card .icon { font-size: 3rem; margin-bottom: 20px; }
        .service-card h3 { margin-bottom: 12px; color: var(--brand-blue); }
        .service-card p { opacity: 0.7; font-size: 0.95rem; line-height: 1.6; }

        .form-section { padding: var(--space-xxl) 0; background: #f9fafb; border-radius: 40px; margin-bottom: var(--space-xxl); }
        .form-layout { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: start; }
        .form-text h2 { font-size: 3.5rem; margin-bottom: 24px; line-height: 1.1; }
        .form-text p { font-size: 1.2rem; opacity: 0.8; margin-bottom: 40px; line-height: 1.6; }
        .checklist { list-style: none; }
        .checklist li { margin-bottom: 20px; font-size: 1.2rem; font-weight: 600; color: var(--brand-blue); }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .form-layout { grid-template-columns: 1fr; text-align: center; }
          .hero-content h1 { font-size: 3rem; }
          .form-text h2 { font-size: 2.5rem; }
          .hero-ctas { justify-content: center; }
          .checklist { display: inline-block; text-align: left; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
