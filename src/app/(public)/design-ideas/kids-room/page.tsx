"use client";

import Image from "next/image";
import { useState } from "react";
import TrustStats from "@/components/TrustStats";
import DesignHero from "@/components/DesignHero";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import "./KidsRoom.css";

const galleryItems = [
  {
    id: 1,
    category: "Adventure",
    title: "Rocket Ship Space Cabin",
    image: "/design-ideas/kids-room/kids_adventure_room_1775013751006.png",
    description: "Bespoke rocket bunk beds with integrated slides and starry celestial ceilings."
  },
  {
    id: 2,
    category: "Shared",
    title: "Bespoke Bunk Retreat",
    image: "/design-ideas/kids-room/kids_shared_bunk_room_1775013801004.png",
    description: "Architectural built-in bunk beds with integrated storage stairs and cozy reading nooks."
  },
  {
    id: 3,
    category: "Creative",
    title: "The Artist's Sanctuary",
    image: "/design-ideas/kids-room/kids_creative_room_1775013776161.png",
    description: "Multi-functional space with chalkboard walls, grand activity tables, and modular art storage."
  },
  {
    id: 4,
    category: "Adventure",
    title: "Jungle Safari Treehouse",
    image: "/design-ideas/kids-room/kids_adventure_room_1775013751006.png",
    description: "Nature-inspired designs with organic wood textures and hidden play alcoves."
  },
  {
    id: 5,
    category: "Shared",
    title: "Twin Zen Sanctuary",
    image: "/design-ideas/kids-room/kids_shared_bunk_room_1775013801004.png",
    description: "Balanced symmetry in pastel tones, crafted for harmony and individual expression."
  },
  {
    id: 6,
    category: "Creative",
    title: "Future Architect's Studio",
    image: "/design-ideas/kids-room/kids_creative_room_1775013776161.png",
    description: "Precision-engineered desk systems and wall-mounted display grids for young creators."
  }
];

const categories = ["All", "Adventure", "Shared", "Creative"];

export default function KidsRoomIdeas() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="kids-room-page">
      <DesignHero
        title="Kids Room Interior <span class='text-orange'>Design Ideas</span>"
        subtitle="Transform your child's world with imaginative spaces that inspire growth, creativity, and boundless joy in Bangalore."
        backgroundImage="/design-ideas/kids-room/kids_adventure_room_1775013751006.png"
        breadcrumbCategory="Kids Room"
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
        heading="Ready to Build their <span class='text-orange'>Dream Room?</span>"
        subheading="Bring your child's imagination to life with our expert designers and high-quality, safe-for-kids materials."
      />

      <TrustStats />
    </main>
  );
}
