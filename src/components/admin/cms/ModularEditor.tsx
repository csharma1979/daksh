"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, GripVertical, Save, Eye, Globe, Settings, Layout, CheckCircle } from "lucide-react";
import HeroBlock from "./blocks/HeroBlock";
import TextImageBlock from "./blocks/TextImageBlock";
import TestimonialsBlock from "./blocks/TestimonialsBlock";
import { updatePage } from "@/lib/actions/pages";

const blockComponents: { [key: string]: any } = {
  "hero": HeroBlock,
  "text-image": TextImageBlock,
  "testimonials": TestimonialsBlock
};

import "./ModularEditor.css";

const BLOCK_TYPES = [
  { type: "hero", label: "Hero Section", icon: Layout },
  { type: "text-image", label: "Text + Image", icon: Layout },
  { type: "gallery", label: "Gallery", icon: Layout },
  { type: "cta", label: "Call to Action", icon: Layout },
  { type: "testimonials", label: "Testimonials", icon: Layout },
];

const ModularEditor = ({ page }: { page: any }) => {
  const [blocks, setBlocks] = useState<any[]>(page.content?.blocks || []);
  const [seo, setSeo] = useState(page.seo || { title: "", description: "", ogImage: "" });
  const [slug, setSlug] = useState(page.slug || "");
  const [status, setStatus] = useState(page.status || "Draft");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (blocks.length > 0) handleSave(true);
    }, 10000); // Auto-save every 10 seconds if changed
    return () => clearTimeout(timer);
  }, [blocks, seo, status]);

  const handleSave = async (isAuto = false) => {
    if (!isAuto) setSaving(true);
    const result = await updatePage(page._id, {
      content: { ...page.content, blocks },
      seo,
      slug,
      status
    });
    if (result.success) {
      setLastSaved(new Date());
    }
    if (!isAuto) setSaving(false);
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockData = (id: string, data: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBlocks(items);
  };

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "hero":
        return <HeroBlock data={block.data} updateData={(d: any) => updateBlockData(block.id, d)} removeBlock={() => removeBlock(block.id)} />;
      case "text-image":
        return <TextImageBlock data={block.data} updateData={(d: any) => updateBlockData(block.id, d)} removeBlock={() => removeBlock(block.id)} />;
      case "testimonials":
        return <TestimonialsBlock data={block.data} updateData={(d: any) => updateBlockData(block.id, d)} removeBlock={() => removeBlock(block.id)} />;
      default:
        return <div className="unknown-block">Unknown Block Type: {block.type}</div>;
    }
  };

  return (
    <div className="modular-editor-container">
      <div className="editor-main">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="blocks-list">
                {blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        className="block-item-wrapper"
                      >
                        <div {...provided.dragHandleProps} className="drag-handle">
                          <GripVertical size={20} />
                        </div>
                        {renderBlock(block)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="add-block-zone">
          <h3>Add a new section</h3>
          <div className="block-type-grid">
            {BLOCK_TYPES.map(bt => (
              <button key={bt.type} onClick={() => addBlock(bt.type)} className="btn-add-block">
                <bt.icon size={20} />
                <span>{bt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-sidebar-right">
        <div className="sidebar-card status-card">
          <div className="sidebar-header-row">
            <h3>Publishing</h3>
            <div className={`status-badge ${status.toLowerCase()}`}>{status}</div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <button onClick={() => handleSave()} className="btn-save-full" disabled={saving}>
            <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
          </button>
          {lastSaved && (
            <div className="last-saved">
              <CheckCircle size={12} /> Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <a 
            href={`/${page.slug === 'home' ? '' : page.slug}`} 
            target="_blank" 
            className="btn-preview-full"
            style={{ textDecoration: 'none' }}
          >
            <Eye size={18} /> Live Preview
          </a>
        </div>

        <div className="sidebar-card seo-card">
          <div className="sidebar-header-row">
            <h3>SEO Settings</h3>
            <Globe size={18} />
          </div>
          <div className="form-group">
            <label>Meta Title</label>
            <input 
              type="text" 
              value={seo.title} 
              onChange={(e) => setSeo({ ...seo, title: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label>URL Slug</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Meta Description</label>
            <textarea 
              value={seo.description} 
              onChange={(e) => setSeo({ ...seo, description: e.target.value })} 
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>OG Image URL</label>
            <input 
              type="text" 
              value={seo.ogImage || ""} 
              placeholder="/images/social-cover.jpg"
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} 
            />
          </div>
          <div className="google-preview">
            <div className="gp-url">dakshinteriors.in › {slug}</div>
            <div className="gp-title">{seo.title || "Page Title"}</div>
            <div className="gp-desc">{seo.description || "Page description will appear here..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModularEditor;
