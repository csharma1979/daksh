"use client";

import Image from "next/image";
import ContactPageForm from "@/components/ContactPageForm";
import FAQSection from "@/components/FAQSection";
import TrustStats from "@/components/TrustStats";
import { useEffect, useState } from "react";
import { getPageBySlug } from "@/lib/actions/pages";

const civilFaqs = [
  {
    question: "What types of civil work do you undertake?",
    answer: "We handle a wide range of civil works including structural modifications, wall demolitions, flooring, tiling, waterproofing, and complete plumbing and electrical overhauls."
  },
  {
    question: "Are your civil projects supervised by qualified engineers?",
    answer: "Yes, every civil project at Daksh Interiors is overseen by qualified structural engineers and experienced site supervisors to ensure technical precision and safety."
  },
  {
    question: "Do you handle specialized waterproofing for old buildings?",
    answer: "Absolutely. We use advanced multi-layer waterproofing techniques and premium chemicals to resolve chronic leakage issues in both old and new structures."
  },
  {
    question: "What kind of flooring options do you provide?",
    answer: "We offer complete installation services for Italian marble, premium vitrified tiles, granite, wooden flooring, and specialized epoxy coatings for commercial spaces."
  }
];

export default function CivilProjectsPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPageBySlug("civil-projects");
      if (data) setPageData(data);
    }
    fetchData();
  }, []);

  const content = pageData?.content || {
    hero: {
      title: "Precision Engineering & Construction",
      subtitle: "Structural excellence and turnkey civil solutions for modern residential and commercial infrastructures.",
      image: "/civil_hero_banner.png"
    }
  };

  return (
    <main className="civil-page">
      {/* Hero Section */}
      <section className="civil-hero">
        <Image
          src={content.hero.image || "/civil_hero_banner.png"}
          alt="Civil Engineering and Projects"
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="hero-img"
        />
        <div className="container hero-content">
          <h1>
            Precision <br />
            Engineering & Construction <br />
            <span className="text-orange">Built to Last</span>
          </h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="tel:+919876543210" className="btn-hero">📞 Technical Consultation</a>
            <a href="#civil-form" className="btn-hero-primary">📅 Book Site Audit</a>
          </div>
        </div>
      </section>

      {/* Civil Services Grid */}
      <section id="services" className="services-section container">
        <div className="section-header">
          <h2>Precision <span className="text-orange">Civil Services</span></h2>
          <p>The foundation of every great interior is robust engineering and flawless execution.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon">🧱</div>
            <h3>Structural Modifications</h3>
            <p>Expert wall removals, beam reinforcement, and space restructuring with engineering precision.</p>
          </div>
          <div className="service-card">
            <div className="icon">📐</div>
            <h3>Flooring & Tiling</h3>
            <p>Impeccable installation of Italian marble, granite, and premium tiles with zero-level accuracy.</p>
          </div>
          <div className="service-card">
            <div className="icon">💧</div>
            <h3>Advanced Waterproofing</h3>
            <p>Scientific multi-layer solutions for roofs, basements, and bathrooms with long-term guarantees.</p>
          </div>
          <div className="service-card">
            <div className="icon">⚡</div>
            <h3>Plumbing & Electrical</h3>
            <p>High-end concealed wiring and plumbing systems designed for safety and longevity.</p>
          </div>
        </div>
      </section>

      {/* Split Form Section */}
      <section id="civil-form" className="form-section container">
        <div className="form-layout">
          <div className="form-text">
            <h2>Build Your <span className="text-orange">Foundation</span></h2>
            <p>Whether it's a new construction or a structural renovation, our civil experts deliver quality that stands the test of time.</p>
            <ul className="checklist">
              <li>✓ Structural Engineer Audit</li>
              <li>✓ High-Grade Construction Materials</li>
              <li>✓ 10-Year Leak-Proof Warranty</li>
              <li>✓ ISO-Certified Execution Processes</li>
            </ul>
          </div>
          <div className="form-component">
            <ContactPageForm source="/civil-projects" />
          </div>
        </div>
      </section>

      <TrustStats />

      <FAQSection
        items={civilFaqs}
        title="Civil Project FAQs"
        subtitle="Technical answers for your construction and structural requirements."
      />

      <style jsx>{`
        .civil-page { width: 100%; }
        .civil-hero {
          position: relative;
          padding: 120px 0;
          color: var(--brand-white);
          text-align: center;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .civil-hero::after {
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
