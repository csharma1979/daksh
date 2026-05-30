"use client";

import { ImageIcon, Upload, Trash2, Search, Filter } from "lucide-react";

import "./media.css";

export default function MediaPage() {
  const mediaItems = [
    { id: 1, name: "hero-bg.jpg", size: "1.2 MB", type: "Image", url: "/hero-bg.jpg" },
    { id: 2, name: "partner-hero.png", size: "800 KB", type: "Image", url: "/partner-hero.png" },
    { id: 3, name: "contact-hero.png", size: "950 KB", type: "Image", url: "/contact-hero.png" },
    { id: 4, name: "logo.jpg", size: "150 KB", type: "Image", url: "/Daksh-logo.jpg" },
  ];

  return (
    <div className="media-wrapper">
      <div className="page-header">
        <div>
          <h1>Media Library</h1>
          <p>Upload and manage images for your website pages.</p>
        </div>
        <button className="btn-upload">
          <Upload size={20} />
          <span>Upload New</span>
        </button>
      </div>

      <div className="media-controls card">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search files..." />
        </div>
        <div className="filter-btns">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Images</button>
          <button className="filter-btn">Documents</button>
        </div>
      </div>

      <div className="media-grid">
        {mediaItems.map((item) => (
          <div key={item.id} className="media-card">
            <div className="media-preview">
              <img src={item.url} alt={item.name} />
              <div className="media-overlay">
                <button className="btn-delete"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="media-info">
              <div className="media-name" title={item.name}>{item.name}</div>
              <div className="media-meta">{item.size} • {item.type}</div>
            </div>
          </div>
        ))}
        {/* Empty Placeholder slots */}
        {[1,2,3,4].map(i => (
           <div key={`empty-${i}`} className="media-card empty">
             <div className="empty-slot">
               <ImageIcon size={32} />
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}
