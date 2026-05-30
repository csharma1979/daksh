"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import FAQSection from "@/components/FAQSection";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import {
  ShieldCheck,
  Zap,
  Clock,
  Layout,
  Sparkles,
  Palette
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    category: "Sliding",
    title: "Sleek Sliding Wardrobe",
    image: "/design-ideas/wardrobe/sliding.png",
    description: "Space-saving sliding doors with premium matte finish and integrated lighting."
  },
  {
    id: 2,
    category: "Walk-in",
    title: "Luxury Walk-in Closet",
    image: "/design-ideas/wardrobe/sliding.png", 
    description: "Open-plan storage, dedicated shoe racks, and premium island dresser."
  },
  {
    id: 3,
    category: "Hinged",
    title: "Classic Hinged Mastery",
    image: "/design-ideas/wardrobe/sliding.png", 
    description: "Ergonomic handles, soft-close hinges, and timeless architectural moldings."
  },
  {
    id: 4,
    category: "Glass",
    title: "Elegant Glass Display",
    image: "/design-ideas/wardrobe/sliding.png", 
    description: "Tinted glass doors, internal leather lining, and sensor-based LED glow."
  },
  {
    id: 5,
    category: "L-Shape",
    title: "Corner Space Optimizer",
    image: "/design-ideas/wardrobe/sliding.png", 
    description: "Smart corner carousels, hidden safes, and maximum vertical utility."
  }
];

const categories = ["All", "Sliding", "Walk-in", "Hinged", "Glass", "L-Shape"];

const wardrobeFaqs = [
  {
    question: "Do you offer soft-close mechanisms for wardrobes?",
    answer: "Yes, all our wardrobes come standard with premium soft-close hinges and telescopic drawer channels from world-class brands like Hettich and Blum."
  },
  {
    question: "Can you customize the internal storage layout?",
    answer: "Absolutely. Every wardrobe is custom-engineered. You can choose the number of shelves, hanging rods, pull-out trays, and hidden safes based on your personal storage needs."
  },
  {
    question: "What finishes are available for wardrobe shutters?",
    answer: "We offer a wide range of premium finishes including Anti-Fingerprint Laminates, High-Gloss Acrylics, Tinted Glass, Lacquered Glass, and PU Paint."
  }
];

export default function WardrobesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="wardrobes-page">
      <HeroBanner 
        title="Bespoke Wardrobe <span class='text-orange'>Designs</span>"
        subtitle="Elevate your sanctuary with custom-engineered storage solutions. From sliding glass doors to luxury walk-in closets in Bangalore."
        backgroundImage="/inspiration/wardrobe.png"
        breadcrumbCategory="Wardrobes"
      />

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="section-header">
          <h2>Design <span className="text-orange">Inspiration</span></h2>
          <p>Explore our most popular wardrobe styles and find the perfect fit for your lifestyle.</p>
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
                  src={item.image}
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
            <h2 className="title-md">Premium <span className="text-orange">Craftsmanship</span></h2>
            <p>Every wardrobe at Daksh Interiors is a masterpiece of precision engineering and high-end materials.</p>

            <div className="materials-list">
              <div className="material-item">
                <Layout className="text-orange" />
                <div>
                  <h4>Modular Flexibility</h4>
                  <p>Interchangeable internal configurations that grow with your needs.</p>
                </div>
              </div>
              <div className="material-item">
                <Palette className="text-orange" />
                <div>
                  <h4>Premium Finishes</h4>
                  <p>Choose from luxury mirrors, PU paints, and anti-scratch acrylics.</p>
                </div>
              </div>
              <div className="material-item">
                <Sparkles className="text-orange" />
                <div>
                  <h4>Smart Lighting</h4>
                  <p>Integrated LED sensors that illuminate your collection perfectly.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quality-image">
            <Image
              src="/inspiration/wardrobe.png"
              alt="Wardrobe Detail"
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
        items={wardrobeFaqs}
        title="Wardrobe Design FAQs"
        subtitle="Common questions about our bespoke storage systems and finishes."
      />

      <style jsx>{`
        .wardrobes-page { background: #fff; }
        
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
