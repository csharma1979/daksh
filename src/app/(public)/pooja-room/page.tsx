"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import FAQSection from "@/components/FAQSection";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import {
  Sparkles,
  Lightbulb,
  Palette
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    category: "Traditional",
    title: "Classic Teakwood Temple",
    image: "/inspiration/pooja-room.png",
    description: "Intricately carved solid teakwood mandir with traditional gopuram and brass bells."
  },
  {
    id: 2,
    category: "Modern",
    title: "Minimalist Backlit Jaali",
    image: "/inspiration/pooja-room.png", 
    description: "Sleek whiteboard finish with a precision CNC jaali backlit by warm LEDs."
  },
  {
    id: 3,
    category: "Marble",
    title: "Makrana Marble Sanctum",
    image: "/inspiration/pooja-room.png", 
    description: "U-shaped marble altar with intricate inlay work and stone-carved pillars."
  },
  {
    id: 4,
    category: "Wood",
    title: "Rosewood Heritage Mandir",
    image: "/inspiration/pooja-room.png", 
    description: "Antique-finish rosewood unit with storage for devotional texts and lighting."
  },
  {
    id: 5,
    category: "Wall-mounted",
    title: "Space-Saving Floating Unit",
    image: "/inspiration/pooja-room.png", 
    description: "Compact wall-mounted design with pull-out drawer and glass shelving."
  }
];

const categories = ["All", "Traditional", "Modern", "Marble", "Wood", "Wall-mounted"];

const poojaFaqs = [
  {
    question: "Do you follow Vastu Shastra for Pooja room designs?",
    answer: "Absolutely. Every Pooja room we design adheres to strict Vastu principles, from placement (Ishanya/North-East) to the height of the idols and orientation of the lighting."
  },
  {
    question: "Can you create custom CNC jaali patterns?",
    answer: "Yes, we can fabricate any pattern, including sacred symbols (Om, Swastik, Lotus), using precision CNC laser cutting in wood, acrylic, or metal."
  },
  {
    question: "Do you handle the marble procurement and carving?",
    answer: "We source premium grade Makrana and Italian marble and employ master craftsmen for on-site or factory-based carving to ensure flawless finish and spiritual sanctity."
  }
];

export default function PoojaRoomPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="pooja-page">
      <HeroBanner 
        title="Sacred Pooja <span class='text-orange'>Room Designs</span>"
        subtitle="Experience tranquility at home. Our bespoke Pooja rooms blend ancient Vastu wisdom with modern architectural precision in Bangalore."
        backgroundImage="/inspiration/pooja-room.png"
        breadcrumbCategory="Pooja Room"
      />

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="section-header">
          <h2>Mandir <span className="text-orange">Inspiration</span></h2>
          <p>Explore our collection of specialized devotional spaces, custom-built for every architectural and spiritual requirement.</p>
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
                  src="/inspiration/pooja-room.png"
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
            <h2 className="title-md">Crafted with <span className="text-orange">Devotion</span></h2>
            <p>We combine master craftsmanship with high-end materials to ensure your Pooja room remains a timeless sacred space.</p>

            <div className="materials-list">
              <div className="material-item">
                <Sparkles className="text-orange" />
                <div>
                  <h4>Artisanal Stone Carving</h4>
                  <p>Hand-finished marble altars and pillars by master stone carvers.</p>
                </div>
              </div>
              <div className="material-item">
                <Lightbulb className="text-orange" />
                <div>
                  <h4>Atmospheric Lighting</h4>
                  <p>Warm, spiritual glow achieved through hidden cove lights and backlit jaali work.</p>
                </div>
              </div>
              <div className="material-item">
                <Palette className="text-orange" />
                <div>
                  <h4>Bespoke Wood Finishes</h4>
                  <p>Gold leafing and premium wood polishes that grow richer with age.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quality-image">
            <Image
              src="/inspiration/pooja-room.png"
              alt="Pooja Room Detail"
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
        items={poojaFaqs}
        title="Pooja Room FAQs"
        subtitle="Common questions about our mandir designs, Vastu compliance, and material options."
      />

      <style jsx>{`
        .pooja-page { background: #fff; }
        
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
