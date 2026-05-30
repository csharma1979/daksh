"use client";

import Image from "next/image";
import FullWidthCTA from "@/components/FullWidthCTA";
import FAQSection from "@/components/FAQSection";
import TrustStats from "@/components/TrustStats";
import { useEffect, useState } from "react";
import { getPageBySlug } from "@/lib/actions/pages";

const residentialFaqs = [
  {
    question: "Do you offer interiors for both apartments and villas?",
    answer: "Yes, we specialize in end-to-end interior solutions for various residential formats including 1/2/3/4 BHK apartments, independent villas, and luxury penthouses."
  },
  {
    question: "What is your 45-day delivery guarantee?",
    answer: "We guarantee that all modular work (kitchens, wardrobes, TV units) will be delivered and installed within 45 days from the date of final design sign-off."
  },
  {
    question: "Do you provide custom furniture solutions?",
    answer: "Absolutely. Apart from our modular systems, we offer custom-made sofas, dining tables, and bespoke wooden furniture tailored to your design theme."
  },
  {
    question: "How do you ensure quality control?",
    answer: "We use ISO-certified manufacturing processes, German-engineered hardware, and a rigorous 144-point quality check before handover."
  }
];

export default function ResidencesPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPageBySlug("residences");
      if (data) setPageData(data);
    }
    fetchData();
  }, []);

  const content = pageData?.content || {
    hero: {
      title: "Luxury Living, Tailored for You",
      subtitle: "Personalized home interior solutions that combine aesthetic beauty with functional excellence.",
      image: "/residences_hero_banner.png"
    }
  };

  return (
    <main className="residences-page">
      {/* Hero Section */}
      <section className="residences-hero">
        <Image 
          src={content.hero.image || "/residences_hero_banner.png"} 
          alt="Residential Interior Design" 
          fill 
          priority 
          style={{ objectFit: 'cover' }}
          className="hero-img"
        />
        <div className="container hero-content">
          <h1>{content.hero.title} <span className="text-orange">Exquisite Homes</span></h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="tel:+919876543210" className="btn-hero">📞 Call Designer</a>
            <a href="#residences-form" className="btn-hero-primary">📅 Get Free Quote</a>
          </div>
        </div>
      </section>

      {/* Residential Services Grid */}
      <section id="services" className="services-section container">
        <div className="section-header">
          <h2>Luxury <span className="text-orange">Residential Services</span></h2>
          <p>We craft homes that tell your story through expert design and precision execution.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon">🏡</div>
            <h3>Full Home Interiors</h3>
            <p>Comprehensive design and execution for your entire living space, from flooring to lighting.</p>
          </div>
          <div className="service-card">
            <div className="icon">🍳</div>
            <h3>Modular Kitchens</h3>
            <p>Ergonomic, high-tech kitchens with premium finishes and smart storage solutions.</p>
          </div>
          <div className="service-card">
            <div className="icon">👕</div>
            <h3>Smart Wardrobes</h3>
            <p>Custom-built storage solutions that maximize space while adding elegance to your bedrooms.</p>
          </div>
          <div className="service-card">
            <div className="icon">🛋️</div>
            <h3>Luxury Living Rooms</h3>
            <p>Bespoke furniture and designer wall treatments to make your living area truly stand out.</p>
          </div>
        </div>
      </section>

      <TrustStats />

      <FullWidthCTA 
        title="Start Your Home Journey" 
        subtitle="Personalized Design Workshop | 3D Virtual Walkthroughs | **10-Year Material Warranty**"
        image="/residences_hero_banner.png"
        source="Residences Page"
      />

      <FAQSection 
        items={residentialFaqs} 
        title="Residential FAQs" 
        subtitle="Addressing common questions for homeowners and villa residents."
      />

      <style jsx>{`
        .residences-page { width: 100%; }
        .residences-hero {
          position: relative;
          padding: 120px 0;
          color: var(--brand-white);
          text-align: center;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .residences-hero::after {
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
