"use client";

import { Trash2, MessageSquare } from "lucide-react";

interface TestimonialsBlockProps {
  data: any;
  updateData: (data: any) => void;
  removeBlock: () => void;
}

const TestimonialsBlock = ({ data, updateData, removeBlock }: TestimonialsBlockProps) => {
  return (
    <div className="block testimonials-block">
      <div className="block-header">
        <h4><MessageSquare size={16} /> Testimonials Section</h4>
        <button onClick={removeBlock} className="btn-remove"><Trash2 size={16} /></button>
      </div>
      <div className="block-fields">
        <div className="form-group">
          <label>Section Title</label>
          <input 
            type="text" 
            value={data.title || "What our customers say"} 
            onChange={(e) => updateData({ ...data, title: e.target.value })} 
            placeholder="What our customers say"
          />
        </div>
        <div className="form-group">
          <label>Section Subtitle</label>
          <input 
            type="text" 
            value={data.subtitle || "10,000+ happy homes and counting."} 
            onChange={(e) => updateData({ ...data, subtitle: e.target.value })} 
          />
        </div>
        <div className="info-box-blue">
          <p>This block will automatically display your 10 most recent published testimonials from the management section.</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsBlock;
