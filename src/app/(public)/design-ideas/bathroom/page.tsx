"use client";

import Image from "next/image";
import { useState } from "react";
import TrustStats from "@/components/TrustStats";
import DesignHero from "@/components/DesignHero";
import DesignSessionCTA from "@/components/DesignSessionCTA";

const galleryItems = [
  {
    id: 1,
    category: "Master Spa",
    title: "The Royal Spa Suite",
    image: "/design-ideas/bathroom/featured.png",
    description: "Freestanding soaking tub, marble waterfall shower, and dual vanity luxury."
  },
  {
    id: 2,
    category: "Minimalist",
    title: "Pure Zen Haven",
    image: "/design-ideas/bathroom/featured.png",
    description: "Clean white lines, floating wooden vanities, and clutter-free tranquility."
  },
  {
    id: 3,
    category: "Modern 2.0",
    title: "Metropolitan Edge",
    image: "/design-ideas/bathroom/featured.png",
    description: "Backlit mirrors, black matte fixtures, and smart integrated technology."
  },
  {
    id: 4,
    category: "Guest Suite",
    title: "Elegant Ensuite",
    image: "/design-ideas/bathroom/featured.png",
    description: "Space-efficient layouts with premium finishes for your most honored guests."
  },
  {
    id: 5,
    category: "Industrial",
    title: "Urban Exposed Loft",
    image: "/design-ideas/bathroom/featured.png",
    description: "Exposed brick accents, concrete finishes, and architecturally inspired design."
  },
  {
    id: 6,
    category: "Tropical",
    title: "Nature-Infused Bath",
    image: "/design-ideas/bathroom/featured.png",
    description: "Pebble stone flooring, bamboo accents, and an open-air inspired atmosphere."
  }
];

const categories = ["All", "Master", "Guest", "Compact", "Minimalist", "Modern"];

export default function BathroomIdeas() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="design-ideas-page">
      <DesignHero
        title="Bathroom Interior <span class='text-orange'>Design Ideas</span>"
        subtitle="Transform your daily routine into a spa-like experience with our bespoke bathroom designs and premium fixtures for Bangalore homes."
        backgroundImage="/inspiration/bathroom.png"
        breadcrumbCategory="Bathroom"
      />

      {/* Filter Bar */}
      <section className="filter-section container">
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
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section container">
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-card">
              <div className="card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="img-transition"
                />
                <div className="category-tag">{item.category}</div>
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



      <DesignSessionCTA />
      <TrustStats />

      <style jsx>{`
        .design-ideas-page { background: #fff; padding-bottom: 80px; }
        .text-orange { color: var(--brand-orange); }

        .filter-section { padding: 50px 0 30px; }
        .filter-bar { 
          display: flex; 
          gap: 12px; 
          justify-content: center; 
          flex-wrap: wrap; 
        }
        .filter-btn {
          padding: 10px 24px;
          border-radius: 50px;
          border: 1px solid #eee;
          background: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--brand-blue);
        }
        .filter-btn:hover { border-color: var(--brand-orange); }
        .filter-btn.active { background: var(--brand-orange); color: white; border-color: var(--brand-orange); }

        .gallery-section { padding-bottom: 80px; }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .gallery-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          border: 1px solid #f5f5f5;
        }
        .gallery-card:hover { transform: translateY(-10px); }
        .card-image { position: relative; height: 300px; overflow: hidden; }
        .category-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(0, 43, 91, 0.8);
          color: white;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          backdrop-filter: blur(5px);
        }
        .card-content { padding: 24px; }
        .card-content h3 { font-size: 1.4rem; margin-bottom: 10px; color: var(--brand-blue); }
        .card-content p { font-size: 0.95rem; color: #666; line-height: 1.6; }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-hero h1 { font-size: 2.5rem; }
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
