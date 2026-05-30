"use client";

import Image from "next/image";
import FullWidthCTA from "@/components/FullWidthCTA";
import FAQSection from "@/components/FAQSection";
import TrustStats from "@/components/TrustStats";
import { useEffect, useState } from "react";
import { getPageBySlug } from "@/lib/actions/pages";

const renovationFaqs = [
  {
    question: "How long does a full home renovation take?",
    answer: "A typical full home renovation takes between 45 to 60 days depending on the scope of work (civil, electrical, plumbing, and interiors)."
  },
  {
    question: "Do you handle civil and structural changes?",
    answer: "Yes, we have a dedicated team for civil works, including wall removals, flooring, tiling, and structural modifications."
  },
  {
    question: "Can I renovate only my kitchen or bathroom?",
    answer: "Absolutely! We undertake partial renovations for specific zones like kitchens, bathrooms, or living rooms with the same level of expertise."
  },
  {
    question: "Do you provide a warranty on renovation work?",
    answer: "Yes, we provide a comprehensive 10-year warranty on modular work and a 1-year service warranty on civil/electrical installations."
  }
];

export default function RenovationPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPageBySlug("renovation-remodeling");
      if (data) setPageData(data);
    }
    fetchData();
  }, []);

  const content = pageData?.content || {
    hero: {
      title: "Revitalize Your Home Space",
      subtitle: "Modernize your living space with expert structural changes and premium interior finishes.",
      image: "/renovation-hero.png" // User might need to upload this
    }
  };

  return (
    <main className="renovation-page">
      {/* Hero Section */}
      <section className="renovation-hero">
        <Image 
          src={content.hero.image || "/renovation_hero_banner.png"} 
          alt="Renovation and Remodeling" 
          fill 
          priority 
          style={{ objectFit: 'cover' }}
          className="hero-img"
        />
        <div className="container hero-content">
          <h1>{content.hero.title} <span className="text-orange">Expert Remodeling</span></h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="tel:+919876543210" className="btn-hero">📞 Call for Estimate</a>
            <a href="#renovation-form" className="btn-hero-primary">📅 Book Site Visit</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section container">
        <div className="section-header">
          <h2>Our <span className="text-orange">Renovation Services</span></h2>
          <p>Complete structural and aesthetic transformation for every corner of your home.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon">🏗️</div>
            <h3>Full Home Transformation</h3>
            <p>End-to-end remodeling including civil, electrical, and plumbing overhauls.</p>
          </div>
          <div className="service-card">
            <div className="icon">🍳</div>
            <h3>Kitchen Modernization</h3>
            <p>Upgrade to high-tech modular kitchens with premium fittings and optimized layouts.</p>
          </div>
          <div className="service-card">
            <div className="icon">🚿</div>
            <h3>Bathroom Refurbishment</h3>
            <p>Luxury bath fittings, modern tiling, and moisture-proof plumbing solutions.</p>
          </div>
          <div className="service-card">
            <div className="icon">🎨</div>
            <h3>Surface Makeovers</h3>
            <p>Premium wall finishes, false ceilings, and designer lighting installations.</p>
          </div>
        </div>
      </section>

      <TrustStats />

      <FullWidthCTA 
        title="Start Your Home Transformation" 
        subtitle="Professional Site Measurement | Structural Stability Check | **45-Day Delivery Guarantee**"
        image="/renovation_hero_banner.png"
        source="Renovation & Remodeling Page"
      />

      {/* FAQ Section */}
      <FAQSection 
        items={renovationFaqs} 
        title="Renovation FAQs" 
        subtitle="Common questions about our remodeling and structural services."
      />

      <style jsx>{`
        .renovation-page { width: 100%; }
        .renovation-hero {
          position: relative;
          padding: 120px 0;
          color: var(--brand-white);
          text-align: center;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .renovation-hero::after {
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

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-content h1 { font-size: 3rem; }
          .hero-ctas { justify-content: center; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
