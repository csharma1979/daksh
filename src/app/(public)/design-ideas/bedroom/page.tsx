"use client";

import Image from "next/image";
import { useState } from "react";
import TrustStats from "@/components/TrustStats";
import DesignHero from "@/components/DesignHero";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import FAQSection from "@/components/FAQSection";

const galleryItems = [
  {
    id: 1,
    category: "Luxury",
    title: "The Master Suite",
    image: "/design-ideas/bedroom/master.png",
    description: "Grand scale, velvet textures, and a private walk-in sanctuary."
  },
  {
    id: 2,
    category: "Zen",
    title: "Minimalist Retreat",
    image: "/design-ideas/bedroom/zen.png",
    description: "Low-profile wood, pure whites, and a focus on essential comfort."
  },
  {
    id: 3,
    category: "Industrial",
    title: "Urban Concrete Loft",
    image: "/design-ideas/bedroom/industrial.png",
    description: "Raw textures, metal accents, and a bold metropolitan feel."
  },
  {
    id: 4,
    category: "Boho",
    title: "Bohemian Sanctuary",
    image: "/design-ideas/bedroom/boho.png",
    description: "Natural rattan, layered textiles, and warm handcrafted spirit."
  },
  {
    id: 5,
    category: "Kids",
    title: "Adventure Haven",
    image: "/design-ideas/bedroom/kids.png",
    description: "Whimsical colors, smart play-areas, and imaginative dreamscapes."
  },
  {
    id: 6,
    category: "Classic",
    title: "Timeless Symmetery",
    image: "/design-ideas/bedroom/classic.png",
    description: "Soft greys, tufted luxury, and elegant crystal accents."
  }
];

const categories = ["All", "Luxury", "Zen", "Industrial", "Boho", "Kids", "Classic"];

export default function BedroomIdeas() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="design-ideas-page">
      <DesignHero
        title="Bedroom Interior <span class='text-orange'>Design Ideas</span>"
        subtitle="Discover our range of luxury bedroom designs in Bangalore, crafted for ultimate comfort from grand master suites to imaginative children's spaces."
        backgroundImage="/inspiration/master-bedroom.png"
        breadcrumbCategory="Bedroom"
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
