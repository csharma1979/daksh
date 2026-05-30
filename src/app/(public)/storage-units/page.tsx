"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import FAQSection from "@/components/FAQSection";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import {
  Tv,
  Coffee,
  Palette
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    category: "TV Units",
    title: "Cinematic Floating Console",
    image: "/inspiration/storage-units.png",
    description: "Sleek wall-mounted design with hidden cable management and ambient LED backlighting."
  },
  {
    id: 2,
    category: "Shoe Racks",
    title: "Organized Entryway Bench",
    image: "/inspiration/storage-units.png", 
    description: "Multi-tier ventilated storage with integrated seating and premium wood finish."
  },
  {
    id: 3,
    category: "Crockery Units",
    title: "Luxury Dining Console",
    image: "/inspiration/storage-units.png", 
    description: "Tinted glass displays, internal mirrored backing, and soft-touch drawers."
  },
  {
    id: 4,
    category: "Bookshelves",
    title: "Modern Library Wall",
    image: "/inspiration/storage-units.png", 
    description: "Asymmetric shelving with integrated workspace and premium matte laminate."
  },
  {
    id: 5,
    category: "Vanity",
    title: "Boutique Dressing Unit",
    image: "/inspiration/storage-units.png", 
    description: "Hollywood-lit mirror, velvet-lined jewelry drawers, and sleek marble top."
  }
];

const categories = ["All", "TV Units", "Shoe Racks", "Crockery Units", "Bookshelves", "Vanity"];

const storageFaqs = [
  {
    question: "Do you offer hidden cable management in TV units?",
    answer: "Yes, all our TV units are engineered with internal conduit systems to ensure all wires and cables remain completely invisible for a clean, cinematic look."
  },
  {
    question: "Can you build units that match my existing furniture?",
    answer: "Absolutely. We offer a vast library of over 500+ finishes and laminates to ensure your new storage units blend seamlessly with your current interior palette."
  },
  {
    question: "What is the weight capacity of your wall-mounted units?",
    answer: "Our wall-mounted consoles use heavy-duty galvanized steel brackets and anchor bolts, tested to support over 50kg, suitable for the largest home entertainment systems."
  }
];

export default function StorageUnitsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="storage-page">
      <HeroBanner 
        title="Custom Storage <span class='text-orange'>Solutions</span>"
        subtitle="Eliminate clutter without sacrificing style. Our bespoke systems are engineered for maximum utility and premium aesthetics in Bangalore."
        backgroundImage="/inspiration/storage-units.png"
        breadcrumbCategory="Storage Units"
      />

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="section-header">
          <h2>Design <span className="text-orange">Inspiration</span></h2>
          <p>Explore our range of specialized storage solutions, custom-built for every room in your home.</p>
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
                  src="/inspiration/storage-units.png"
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
            <h2 className="title-md">Precision <span className="text-orange">Engineering</span></h2>
            <p>We don't just build furniture; we create high-performance storage solutions that elevate your daily living.</p>

            <div className="materials-list">
              <div className="material-item">
                <Tv className="text-orange" />
                <div>
                  <h4>Advanced TV Consoles</h4>
                  <p>Integrated ventilation and zero-wire visibility for a cinematic experience.</p>
                </div>
              </div>
              <div className="material-item">
                <Coffee className="text-orange" />
                <div>
                  <h4>Bespoke Crockery Units</h4>
                  <p>Moisture-resistant interiors and LED-lit glass displays for your fine dining collection.</p>
                </div>
              </div>
              <div className="material-item">
                <Palette className="text-orange" />
                <div>
                  <h4>Luxury Finishes</h4>
                  <p>Mirror-finish acrylics and PU paints that provide a premium, lasting glow.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quality-image">
            <Image
              src="/inspiration/storage-units.png"
              alt="Storage Detail"
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
        items={storageFaqs}
        title="Storage Unit FAQs"
        subtitle="Common questions about our custom TV units, consoles, and organization systems."
      />

      <style jsx>{`
        .storage-page { background: #fff; }
        
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
