"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import FAQSection from "@/components/FAQSection";
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Smartphone,
  Palette
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    category: "Kitchen",
    title: "Quiet Luxury Matte Stone",
    image: "/design-ideas/trending-hero.png",
    description: "Seamless stone surfaces with integrated induction and hidden task lighting."
  },
  {
    id: 2,
    category: "Living",
    title: "Biophilic Curved Lounge",
    image: "/design-ideas/trending-hero.png", 
    description: "Architectural curves meeting vertical gardens and adaptive ambient lighting."
  },
  {
    id: 3,
    category: "Bedroom",
    title: "Minimalist Floating Sanctuary",
    image: "/design-ideas/trending-hero.png", 
    description: "Zero-clutter design with smart glass partitions and tactile natural fabrics."
  },
  {
    id: 4,
    category: "Ceiling",
    title: "Layered Light Architecture",
    image: "/design-ideas/trending-hero.png", 
    description: "Multi-dimensional false ceilings with magnetic track lighting and shadow gaps."
  },
  {
    id: 5,
    category: "Pooja",
    title: "Modern Spiritual Alcove",
    image: "/design-ideas/trending-hero.png", 
    description: "CNC laser-cut marble jaali with high-CRI spiritual aura lighting."
  },
  {
    id: 6,
    category: "Lighting",
    title: "Smart Circadian Systems",
    image: "/design-ideas/trending-hero.png", 
    description: "Human-centric lighting that adapts to natural daylight cycles automatically."
  }
];

const categories = ["All", "Kitchen", "Living", "Bedroom", "Ceiling", "Pooja", "Lighting"];

const trendFaqs = [
  {
    question: "What are the biggest interior design trends for 2026?",
    answer: "The focus is on 'Quiet Luxury'—using high-quality natural materials, curved architectural elements, biophilic (nature-integrated) designs, and invisible smart home technology."
  },
  {
    question: "How can I incorporate trending designs into a small apartment?",
    answer: "We recommend space-saving multi-functional furniture, mirrors to enhance light, and a 'monochrome' color palette that makes spaces feel larger and more cohesive."
  },
  {
    question: "Do you provide 3D visualizations of these trends for my home?",
    answer: "Yes, every Daksh Interiors consultation includes a high-fidelity 3D walkthrough using VR technology so you can experience the trends in your own space before implementation."
  }
];

export default function TrendingIdeas() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="design-ideas-page">
      <HeroBanner 
        title="2026 Trending <span class='text-orange'>Design Forecast</span>"
        subtitle="Discover the next wave of luxury living. A curated collection of influential design trends, custom-engineered for modern Indian homes in Bangalore."
        backgroundImage="/design-ideas/trending-hero.png"
        breadcrumbCategory="Trending 2026"
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
            <div key={item.id} className="gallery-card trend-card">
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
                <div className="trend-label">
                  <Sparkles size={14} className="text-orange" />
                  <span>Trending Now</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="/contact" className="learn-more">
                  Get This Look <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trend Insights */}
      <section className="trend-insights bg-cream">
        <div className="container py-20">
          <div className="grid-3">
            <div className="insight-card">
              <Leaf className="text-orange mb-4" size={32} />
              <h4>Sustainable Luxury</h4>
              <p>Incorporating recycled materials and biophilic elements without compromising on the premium aesthetic.</p>
            </div>
            <div className="insight-card">
              <Smartphone className="text-orange mb-4" size={32} />
              <h4>Invisible Tech</h4>
              <p>Hidden charging ports, voice-controlled lighting, and motorized storage that blend into the architecture.</p>
            </div>
            <div className="insight-card">
              <Palette className="text-orange mb-4" size={32} />
              <h4>Quiet Monochrome</h4>
              <p>Using variations of a single tone with diverse textures to create deep, sophisticated, and calming spaces.</p>
            </div>
          </div>
        </div>
      </section>

      <DesignSessionCTA 
        heading="Ready for a <span class='text-orange'>Design Update?</span>"
        subheading="Get a personalized 2026 trend audit for your home and see your space transformed in 3D."
      />
      <TrustStats />

      <FAQSection
        items={trendFaqs}
        title="Trend Inquiries"
        subtitle="Common questions about our 2026 design forecasts and implementation process."
      />

      <style jsx>{`
        .design-ideas-page { background: #fff; padding-bottom: 80px; }
        .text-orange { color: var(--brand-orange); }

        /* Filter */
        .filter-section { padding: 60px 0 40px; }
        .filter-bar { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .filter-btn {
          padding: 12px 28px;
          border-radius: 50px;
          border: 1px solid #eee;
          background: white;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--brand-blue);
        }
        .filter-btn:hover { border-color: var(--brand-orange); transform: translateY(-2px); }
        .filter-btn.active { background: var(--brand-orange); color: white; border-color: var(--brand-orange); box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3); }

        /* Gallery */
        .gallery-section { padding-bottom: 100px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .trend-card {
          background: white;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid #f0f0f0;
        }
        .trend-card:hover { transform: translateY(-15px); box-shadow: 0 30px 60px rgba(0,0,0,0.08); }
        .card-image { position: relative; height: 350px; }
        .category-tag {
          position: absolute; top: 20px; left: 20px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--brand-blue);
          padding: 6px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 800;
          backdrop-filter: blur(10px);
        }
        .card-content { padding: 32px; }
        .trend-label { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; opacity: 0.8; }
        .card-content h3 { font-size: 1.6rem; margin-bottom: 12px; color: var(--brand-blue); }
        .card-content p { font-size: 1rem; color: #666; line-height: 1.6; margin-bottom: 24px; }
        .learn-more { display: flex; align-items: center; gap: 8px; color: var(--brand-orange); font-weight: 800; text-decoration: none; transition: gap 0.3s; }
        .learn-more:hover { gap: 12px; }

        /* Insights */
        .bg-cream { background: var(--brand-cream); }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .insight-card { padding: 40px; background: white; border-radius: 24px; border: 1px solid #eee; }
        .insight-card h4 { font-size: 1.5rem; margin-bottom: 16px; color: var(--brand-blue); }
        .insight-card p { color: #666; line-height: 1.6; }

        @media (max-width: 1024px) {
          .gallery-grid, .grid-3 { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </main>
  );
}
