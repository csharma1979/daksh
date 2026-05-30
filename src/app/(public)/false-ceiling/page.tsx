"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import FAQSection from "@/components/FAQSection";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import {
  Droplets,
  Cloud,
  Box
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    category: "POP",
    title: "Layered Architectural POP",
    image: "/inspiration/false-ceiling.png",
    description: "Multi-layered Plaster of Paris design with deep recessed coves and elegant curves."
  },
  {
    id: 2,
    category: "Gypsum",
    title: "Minimalist Gypsum Board",
    image: "/inspiration/false-ceiling.png", 
    description: "Seamless, fire-resistant gypsum panels with integrated magnetic track lighting."
  },
  {
    id: 3,
    category: "Wooden",
    title: "Premium Teak Rafters",
    image: "/inspiration/false-ceiling.png", 
    description: "Custom wooden rafters combined with POP for a warm, luxury residential feel."
  },
  {
    id: 4,
    category: "Glass",
    title: "Backlit Stained Glass",
    image: "/inspiration/false-ceiling.png", 
    description: "Artistic glass inserts with uniform backlight distribution for a grand entryway."
  },
  {
    id: 5,
    category: "PVC",
    title: "Moisture-Proof PVC Panels",
    image: "/inspiration/false-ceiling.png", 
    description: "Modern, maintenance-free PVC ceilings ideal for balconies and humid areas."
  },
  {
    id: 6,
    category: "Minimalist",
    title: "Zero-Edge Shadow Gap",
    image: "/inspiration/false-ceiling.png", 
    description: "Architectural shadow gaps that create a 'floating ceiling' effect with hidden LEDs."
  }
];

const categories = ["All", "POP", "Gypsum", "Wooden", "Glass", "PVC", "Minimalist"];

const ceilingFaqs = [
  {
    question: "Which type of false ceiling is best for the living room?",
    answer: "For living rooms, we recommend a combination of POP and Wooden rafters for a premium look, or Gypsum for a sleek, modern minimalist aesthetic with peripheral cove lighting."
  },
  {
    question: "Do you integrate smart lighting controls?",
    answer: "Yes, we specialize in integrating smart LED drivers that allow you to control brightness, color temperature (CCT), and RGB scenes via mobile apps or voice assistants."
  },
  {
    question: "How long does it take to install a false ceiling?",
    answer: "A standard living room false ceiling typically takes 7-10 working days, including framing, wiring, boarding, and the final coat of premium paint."
  }
];

export default function FalseCeilingPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="ceiling-page">
      <HeroBanner 
        title="Modern False Ceiling <span class='text-orange'>Designs</span>"
        subtitle="Transform your space from the top down. Our bespoke false ceiling systems blend structural engineering with cinematic lighting in Bangalore."
        backgroundImage="/inspiration/false-ceiling.png"
        breadcrumbCategory="False Ceiling"
      />

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="section-header">
          <h2>Ceiling <span className="text-orange">Inspiration</span></h2>
          <p>Explore our range of specialized ceiling solutions, custom-engineered for every architectural requirement.</p>
        </div>

        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-card">
              <div className="card-image">
                <Image
                  src="/inspiration/false-ceiling.png"
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-tag">{item.category}</div>
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality-section">
        <div className="container grid-2">
          <div className="quality-text">
            <h2 className="title-md">Premium <span className="text-orange">Fabrication</span></h2>
            <p>We use only industry-leading materials and precision installation techniques to ensure your ceiling remains flawless for decades.</p>

            <div className="materials-list">
              <div className="material-item">
                <Droplets className="text-orange" />
                <div>
                  <h4>Moisture Resistant</h4>
                  <p>Specialized boards and primer systems that prevent sagging and mold in humid conditions.</p>
                </div>
              </div>
              <div className="material-item">
                <Cloud className="text-orange" />
                <div>
                  <h4>Acoustic Optimization</h4>
                  <p>Internal damping layers that reduce noise echoing and improve sound clarity in your home.</p>
                </div>
              </div>
              <div className="material-item">
                <Box className="text-orange" />
                <div>
                  <h4>Structural Integrity</h4>
                  <p>Heavy-duty galvanized steel framing for maximum load-bearing and alignment precision.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quality-image">
            <Image
              src="/inspiration/false-ceiling.png"
              alt="False Ceiling Detail"
              width={600}
              height={600}
              style={{ borderRadius: '32px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <DesignSessionCTA />
      <TrustStats />

      <FAQSection
        items={ceilingFaqs}
        title="False Ceiling FAQs"
        subtitle="Common questions about our architectural ceilings, lighting integration, and materials."
      />

      <style jsx>{`
        .ceiling-page { background: #fff; }
        
        /* Gallery */
        .gallery-section { padding: 100px 0; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header h2 { font-size: 3rem; margin-bottom: 12px; }
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }
        .filter-btn {
          padding: 10px 24px;
          border-radius: 50px;
          border: 1px solid #ddd;
          background: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .filter-btn.active {
          background: var(--brand-orange);
          color: white;
          border-color: var(--brand-orange);
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .gallery-card {
          border-radius: 24px;
          overflow: hidden;
          background: var(--brand-cream);
          transition: transform 0.3s;
        }
        .gallery-card:hover { transform: translateY(-10px); }
        .card-image { position: relative; height: 300px; }
        .card-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(0, 43, 91, 0.8);
          color: white;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .card-content { padding: 24px; }

        /* Quality Section */
        .quality-section { padding: 100px 0; background: var(--brand-cream); }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .materials-list { display: grid; gap: 30px; margin-top: 40px; }
        .material-item { display: flex; gap: 20px; }
        .material-item h4 { font-size: 1.25rem; margin-bottom: 4px; }
        .material-item p { opacity: 0.7; }

        @media (max-width: 1024px) {
          .hero-grid, .grid-2 { grid-template-columns: 1fr; text-align: center; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .key-features { justify-content: center; }
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
