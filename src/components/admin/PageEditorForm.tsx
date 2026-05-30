"use client";

import { useState } from "react";
import { updatePage } from "@/app/admin/pages/actions";
import { Save, Eye, Settings, Globe, Layout, ChevronDown, ChevronRight } from "lucide-react";

import "./PageEditorForm.css";

const PageEditorForm = ({ page }: { page: any }) => {
  const [formData, setFormData] = useState(page);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // content, seo, settings
  const [expandedSection, setExpandedSection] = useState<string | null>("hero");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const result = await updatePage(page._id, formData);
    if (result.success) {
      alert("Page updated successfully!");
    } else {
      alert("Error updating page: " + result.error);
    }
    setSaving(false);
  };

  const updateContent = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        [section]: {
          ...formData.content[section],
          [field]: value
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="editor-form">
      <div className="editor-toolbar">
        <div className="tabs">
          <button 
            type="button" 
            className={`tab ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <Layout size={18} /> <span>Page Content</span>
          </button>
          <button 
            type="button" 
            className={`tab ${activeTab === "seo" ? "active" : ""}`}
            onClick={() => setActiveTab("seo")}
          >
            <Globe size={18} /> <span>SEO Settings</span>
          </button>
          <button 
            type="button" 
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} /> <span>Settings</span>
          </button>
        </div>
        
        <div className="toolbar-actions">
          <button type="submit" className="btn-save" disabled={saving}>
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <a href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" className="btn-preview">
            <Eye size={18} />
            Preview
          </a>
        </div>
      </div>

      <div className="editor-body">
        {activeTab === "content" && (
          <div className="content-sections">
            {Object.keys(formData.content).map((sectionKey) => (
              <div key={sectionKey} className={`section-accordion ${expandedSection === sectionKey ? 'open' : ''}`}>
                <div 
                  className="section-header" 
                  onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)}
                >
                  <div className="header-title">
                    {expandedSection === sectionKey ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <h3>{sectionKey.toUpperCase()} SECTION</h3>
                  </div>
                </div>
                
                {expandedSection === sectionKey && (
                  <div className="section-content">
                    {Object.keys(formData.content[sectionKey]).map((fieldKey) => {
                      const value = formData.content[sectionKey][fieldKey];
                      if (Array.isArray(value)) return null; // Handle arrays separately if needed
                      
                      return (
                        <div key={fieldKey} className="form-group">
                          <label>{fieldKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                          {typeof value === 'string' && value.length > 50 ? (
                            <textarea 
                              value={value}
                              onChange={(e) => updateContent(sectionKey, fieldKey, e.target.value)}
                              rows={3}
                            />
                          ) : (
                            <input 
                              type="text" 
                              value={value}
                              onChange={(e) => updateContent(sectionKey, fieldKey, e.target.value)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "seo" && (
          <div className="seo-settings card">
            <h2>SEO Metadata</h2>
            <div className="form-group">
              <label>Meta Title</label>
              <input 
                type="text" 
                value={formData.seo.title}
                onChange={(e) => setFormData({...formData, seo: {...formData.seo, title: e.target.value}})}
              />
            </div>
            <div className="form-group">
              <label>Meta Description</label>
              <textarea 
                value={formData.seo.description}
                onChange={(e) => setFormData({...formData, seo: {...formData.seo, description: e.target.value}})}
                rows={4}
              />
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="general-settings card">
            <h2>General Settings</h2>
            <div className="form-group">
              <label>Page Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Slug (URL)</label>
              <input 
                type="text" 
                value={formData.slug}
                disabled={formData.slug === 'home'}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default PageEditorForm;
