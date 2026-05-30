"use client";

import Image from "next/image";
import { useState } from "react";
import TrustStats from "@/components/TrustStats";
import DesignHero from "@/components/DesignHero";
import DesignSessionCTA from "@/components/DesignSessionCTA";

const galleryItems = [
  {
    id: 1,
    category: "Modern",
    title: "Urban Luxury Loft",
    image: "/design-ideas/living-room/modern.png",
    description: "Sleek lines, marble finishes, and floor-to-ceiling city views."
  },
  {
    id: 2,
    category: "Minimalist",
    title: "Scandinavian Calm",
    image: "/design-ideas/living-room/scandinavian.png",
    description: "Natural wood, neutral palette, and pure functional design."
  },
  {
    id: 3,
    category: "Industrial",
    title: "Brooklyn Brick Manor",
    image: "/design-ideas/living-room/industrial.png",
    description: "Exposed textures, leather accents, and grand volume."
  },
  {
    id: 4,
    category: "Boho",
    title: "Artisanal Chic",
    image: "/design-ideas/living-room/boho.png",
    description: "Vibrant colors, hand-woven textures, and indoor greenery."
  },
  {
    id: 5,
    category: "Classic",
    title: "Victorian Elegance",
    image: "/design-ideas/living-room/classic.png",
    description: "Timeless moldings, velvet luxury, and gold-hued sophistication."
  },
  {
    id: 6,
    category: "Zen",
    title: "Oriental Harmony",
    image: "/design-ideas/living-room/zen.png",
    description: "Quiet minimalism, bamboo accents, and tranquil symmetry."
  }
];

const categories = ["All", "Modern", "Minimalist", "Industrial", "Boho", "Classic", "Zen"];

export default function LivingRoomIdeas() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="design-ideas-page">
      <DesignHero
        title="Living Room Interior <span class='text-orange'>Design Ideas</span>"
        subtitle="Explore our curated gallery of award-winning living room designs in Bangalore, from ultra-modern lofts to cozy family spaces."
        backgroundImage="/inspiration/living-room.png"
        breadcrumbCategory="Living Room"
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

      <DesignSessionCTA 
        heading="Love one of these <span class='text-orange'>Designs?</span>"
        subheading="Our experts can customize any of these ideas to fit your floor plan and budget perfectly."
      />

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

        .design-cta { padding: 40px 0 80px; }
        .cta-box {
          background: var(--brand-cream);
          padding: 60px;
          border-radius: 40px;
          text-align: center;
          border: 1px solid var(--brand-orange);
        }
        .cta-box h2 { font-size: 2.5rem; margin-bottom: 16px; }
        .cta-box p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.8; }
        .btn-primary {
          display: inline-block;
          background: var(--brand-orange);
          color: white;
          padding: 16px 40px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 1.1rem;
          text-decoration: none;
          transition: transform 0.3s ease;
        }
        .btn-primary:hover { transform: scale(1.05); }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-hero h1 { font-size: 2.5rem; }
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .cta-box { padding: 40px 20px; }
        }
      `}</style>
    </main>
  );
}
