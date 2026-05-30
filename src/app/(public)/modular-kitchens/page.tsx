"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import FAQSection from "@/components/FAQSection";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import "./ModularKitchens.css";
import {
  Box,
  Layers,
  Sparkles
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    category: "Island",
    title: "Luxury Waterfall Island",
    image: "/design-ideas/modular-kitchen/island.png",
    description: "Grand marble surfaces, integrated seating, and high-end built-in appliances."
  },
  {
    id: 2,
    category: "L-Shape",
    title: "Efficient Modern L-Shape",
    image: "/design-ideas/modular-kitchen/lshape.png",
    description: "Sleek matte finishes, corner storage solutions, and seamless workflow."
  },
  {
    id: 3,
    category: "Open",
    title: "Seamless Open Kitchen",
    image: "/design-ideas/modular-kitchen/open.png",
    description: "Breakfast bar transition, warm ambient lighting, and social culinary design."
  },
  {
    id: 4,
    category: "U-Shape",
    title: "Chef's Paradise U-Shape",
    image: "/design-ideas/modular-kitchen/island.png",
    description: "Maximum counter space, ergonomic layout, and premium professional gear."
  },
  {
    id: 5,
    category: "Parallel",
    title: "Sleek Parallel Galley",
    image: "/design-ideas/modular-kitchen/lshape.png",
    description: "Ideal for compact spaces, dual-sided storage, and modern metallic accents."
  }
];

const categories = ["All", "Island", "L-Shape", "U-Shape", "Parallel", "Open"];

const kitchenFaqs = [
  {
    question: "How long does it take to install a modular kitchen?",
    answer: "Our standard turnaround time is 45 days from the design sign-off. This includes precision factory manufacturing and expert on-site installation."
  },
  {
    question: "What materials do you use for kitchen cabinets?",
    answer: "We use marine-grade BWP (Boiling Water Proof) plywood for our kitchens to ensure resistance against heat and moisture, which is essential for the Indian climate."
  },
  {
    question: "Is there a warranty on your modular kitchens?",
    answer: "Yes, all Daksh Interiors modular kitchens come with a 10-year comprehensive warranty on materials and specialized hardware."
  }
];

export default function ModularKitchensPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="kitchen-page">
      <HeroBanner 
        title="Modular Kitchen <span class='text-orange'>Designs</span>"
        subtitle="Experience culinary excellence with our precision-engineered modular kitchens. Combining ergonomic efficiency with high-end aesthetics in Bangalore."
        backgroundImage="/inspiration/modular-kitchen.png"
        breadcrumbCategory="Modular Kitchens"
      />

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="section-header">
          <h2>Design <span className="text-orange">Inspiration</span></h2>
          <p>Explore our most popular modular kitchen configurations and find your style.</p>
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

      {/* Materials & Quality */}
      <section className="quality-section">
        <div className="container grid-2">
          <div className="quality-text">
            <h2 className="title-md">Precision <span className="text-orange">Materials</span></h2>
            <p>We don't just build kitchens; we engineer culinary environments that withstand the test of time and style.</p>

            <div className="materials-list">
              <div className="material-item">
                <Layers className="text-orange" />
                <div>
                  <h4>BWP Marine Grade Plywood</h4>
                  <p>100% boiling-water-proof core for unmatched cabinet longevity.</p>
                </div>
              </div>
              <div className="material-item">
                <Box className="text-orange" />
                <div>
                  <h4>Hettich & Blum Hardware</h4>
                  <p>Silent-closing, soft-touch hinges and drawer systems for a seamless feel.</p>
                </div>
              </div>
              <div className="material-item">
                <Sparkles className="text-orange" />
                <div>
                  <h4>Anti-Scratch Acrylics</h4>
                  <p>High-gloss, mirror-finish surfaces that stay stunning for decades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quality-image">
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '32px', overflow: 'hidden' }}>
              <Image
                src="/inspiration/modular-kitchen.png"
                alt="Kitchen Detail"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <DesignSessionCTA 
        heading="Book a <span class='text-orange'>Kitchen Audit</span>"
        subheading="Get a 24-hour cost estimate and 3D layout for your modular kitchen."
      />
      <TrustStats />

      <FAQSection
        items={kitchenFaqs}
        title="Kitchen Design FAQs"
        subtitle="Common questions about our modular modular systems and processes."
      />
    </main>
  );
}
