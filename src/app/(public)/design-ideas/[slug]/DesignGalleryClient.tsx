"use client";

import Image from "next/image";
import { useState } from "react";

export default function DesignGalleryClient({ subcategories, galleries }: { subcategories: any[], galleries: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleries
    : galleries.filter(item => item.subcategoryId?.name === activeCategory);

  return (
    <>
      {/* Filter Bar */}
      <section className="filter-section container">
        <div className="filter-bar">
          <button
            className={`filter-btn ${activeCategory === "All" ? 'active' : ''}`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          {subcategories.map(sub => (
            <button
              key={sub._id}
              className={`filter-btn ${activeCategory === sub.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(sub.name)}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section container">
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item._id} className="gallery-card">
              <div className="card-image">
                <Image
                  src={item.featuredImage || item.images[0] || '/placeholder.png'}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="img-transition"
                />
                <div className="category-tag">{item.subcategoryId?.name || 'Uncategorized'}</div>
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>
              No designs found for this category.
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
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
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
