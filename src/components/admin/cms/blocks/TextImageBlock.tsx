"use client";

import TipTapEditor from "../TipTapEditor";
import { Image as ImageIcon, Trash2, Layout } from "lucide-react";

const TextImageBlock = ({ data, updateData, removeBlock }: any) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageSlug", "sections");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    if (result.success) {
      updateData({ ...data, image: result.url });
    }
  };

  return (
    <div className="block text-image-block">
      <div className="block-header">
        <h4>Text + Image Block</h4>
        <button onClick={removeBlock} className="btn-remove"><Trash2 size={16} /></button>
      </div>
      <div className="block-fields">
        <div className="form-grid">
          <div className="form-group">
            <label>Layout Position</label>
            <select 
              value={data.layout || "image-left"} 
              onChange={(e) => updateData({ ...data, layout: e.target.value })}
            >
              <option value="image-left">Image Left, Text Right</option>
              <option value="image-right">Text Left, Image Right</option>
            </select>
          </div>
          <div className="form-group">
            <label>Block Title</label>
            <input 
              type="text" 
              value={data.title || ""} 
              onChange={(e) => updateData({ ...data, title: e.target.value })} 
            />
          </div>
        </div>
        <div className="form-grid-2-1">
          <div className="form-group">
            <label>Content Text</label>
            <TipTapEditor 
              content={data.content || ""} 
              onChange={(content) => updateData({ ...data, content })} 
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <div className="image-uploader-square" onClick={() => document.getElementById(`upload-${data.id || 'default'}`)?.click()}>
              {data.image ? (
                <img src={data.image} alt="Selected" className="preview-img-block" />
              ) : (
                <>
                  <ImageIcon size={32} />
                  <span>Add Image</span>
                </>
              )}
              <input 
                id={`upload-${data.id || 'default'}`}
                type="file" 
                className="hidden" 
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImageBlock;
