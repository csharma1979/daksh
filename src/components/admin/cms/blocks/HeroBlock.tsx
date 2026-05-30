"use client";

import TipTapEditor from "../TipTapEditor";
import { Image as ImageIcon, Trash2 } from "lucide-react";

interface HeroBlockProps {
  data: any;
  updateData: (data: any) => void;
  removeBlock: () => void;
}
const HeroBlock = ({ data, updateData, removeBlock }: HeroBlockProps) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageSlug", "hero"); // We'll get this from context or props eventually

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    if (result.success) {
      updateData({ ...data, bgImage: result.url });
    }
  };

  return (
    <div className="block hero-block">
      <div className="block-header">
        <h4>Hero Section</h4>
        <button onClick={removeBlock} className="btn-remove"><Trash2 size={16} /></button>
      </div>
      <div className="block-fields">
        <div className="form-group">
          <label>Main Title</label>
          <input 
            type="text" 
            value={data.title || ""} 
            onChange={(e) => updateData({ ...data, title: e.target.value })} 
            placeholder="Empowering Independent Designers..."
          />
        </div>
        <div className="form-group">
          <label>Subtitle / Description</label>
          <TipTapEditor 
            content={data.subtitle || ""} 
            onChange={(content) => updateData({ ...data, subtitle: content })} 
          />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>CTA Button Text</label>
            <input 
              type="text" 
              value={data.ctaText || ""} 
              onChange={(e) => updateData({ ...data, ctaText: e.target.value })} 
              placeholder="Get Started"
            />
          </div>
          <div className="form-group">
            <label>CTA Button Link</label>
            <input 
              type="text" 
              value={data.ctaLink || ""} 
              onChange={(e) => updateData({ ...data, ctaLink: e.target.value })} 
              placeholder="/contact"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Background Image</label>
          <div className="image-uploader-placeholder" onClick={() => document.getElementById(`hero-upload-${data.id || 'default'}`)?.click()}>
            {data.bgImage ? (
              <img src={data.bgImage} alt="Hero Background" className="preview-img-hero" />
            ) : (
              <>
                <ImageIcon size={24} />
                <span>Click to upload background image</span>
              </>
            )}
            <input 
              id={`hero-upload-${data.id || 'default'}`}
              type="file" 
              className="hidden" 
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBlock;
