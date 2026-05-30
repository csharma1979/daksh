"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Edit, Star, Search, Filter, MessageSquareDashed } from "lucide-react";
import DeleteTestimonial from "./DeleteTestimonial";
import TestimonialStatusToggle from "./TestimonialStatusToggle";

export default function TestimonialList({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return initialTestimonials.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                           t.text.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || 
                           (filter === "published" && t.isPublished) || 
                           (filter === "hidden" && !t.isPublished);
      return matchesSearch && matchesFilter;
    });
  }, [initialTestimonials, search, filter]);

  return (
    <div className="testimonial-list-container">
      <div className="list-controls-premium">
        <div className="search-box-premium">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by customer name or testimonial text..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group-premium">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
            onClick={() => setFilter('published')}
          >
            Published
          </button>
          <button 
            className={`filter-btn ${filter === 'hidden' ? 'active' : ''}`}
            onClick={() => setFilter('hidden')}
          >
            Hidden
          </button>
        </div>
      </div>

      <div className="admin-card-premium table-card">
        <div className="table-responsive">
          <table className="admin-table-premium">
            <thead>
              <tr>
                <th>Customer</th>
                <th>City</th>
                <th>Rating</th>
                <th>Content Preview</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id} className="table-row-hover">
                  <td>
                    <div className="customer-info-premium">
                      <div className="avatar-wrapper-mini">
                        <img src={t.avatar} alt={t.name} />
                      </div>
                      <div className="name-group">
                        <strong className="customer-name">{t.name}</strong>
                        <span className="customer-date">{new Date(t.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="city-tag">{t.city || 'N/A'}</span></td>
                  <td>
                    <div className="rating-pill">
                      <Star size={14} fill="var(--brand-orange)" color="var(--brand-orange)" />
                      <span>{t.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="content-preview-premium" title={t.text}>
                      {t.text}
                    </div>
                  </td>
                  <td>
                    <TestimonialStatusToggle id={t._id} isPublished={t.isPublished} />
                  </td>
                  <td>
                    <div className="action-btns-premium">
                      <Link href={`/admin/testimonials/${t._id}`} className="btn-icon-premium" title="Edit Full Record">
                        <Edit size={18} />
                      </Link>
                      <DeleteTestimonial id={t._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="empty-state-premium">
              <div className="empty-icon-circle">
                <MessageSquareDashed size={40} />
              </div>
              <h3>No reviews found</h3>
              <p>Try adjusting your search filters or add a new testimonial.</p>
              <Link href="/admin/testimonials/new" className="btn-primary-mini">
                Add Testimonial
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .list-controls-premium {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          gap: 20px;
        }
        .search-box-premium {
          flex: 1;
          position: relative;
          max-width: 500px;
        }
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        .search-box-premium input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: white;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .search-box-premium input:focus {
          outline: none;
          border-color: var(--brand-orange);
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.05);
        }
        
        .filter-group-premium {
          display: flex;
          background: white;
          padding: 4px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
        .filter-btn {
          padding: 8px 20px;
          border-radius: 8px;
          border: none;
          background: none;
          font-weight: 700;
          font-size: 0.85rem;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn.active {
          background: var(--brand-blue);
          color: white;
          box-shadow: 0 4px 10px rgba(0, 43, 91, 0.2);
        }

        .admin-card-premium {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          border: 1px solid #f3f4f6;
          overflow: hidden;
        }
        
        .admin-table-premium {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table-premium th {
          padding: 18px 24px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #9ca3af;
          letter-spacing: 1px;
          border-bottom: 1px solid #f9fafb;
        }
        .admin-table-premium td {
          padding: 20px 24px;
          border-bottom: 1px solid #f9fafb;
          vertical-align: middle;
        }
        .table-row-hover:hover { background: #fcfcfc; }

        .customer-info-premium { display: flex; align-items: center; gap: 15px; }
        .avatar-wrapper-mini {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          background: #f3f4f6;
          border: 2px solid #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .avatar-wrapper-mini img { width: 100%; height: 100%; object-fit: cover; }
        .name-group { display: flex; flex-direction: column; }
        .customer-name { color: var(--brand-blue); font-weight: 800; font-size: 0.95rem; }
        .customer-date { font-size: 0.75rem; color: #9ca3af; }

        .city-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: #4b5563;
          background: #f3f4f6;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .rating-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff8f1;
          color: var(--brand-orange);
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 800;
          border: 1px solid #ffedd5;
          width: fit-content;
        }

        .content-preview-premium {
          max-width: 320px;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #6b7280;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .action-btns-premium { display: flex; gap: 12px; }
        .btn-icon-premium { color: #9ca3af; transition: color 0.2s; }
        .btn-icon-premium:hover { color: var(--brand-blue); }

        .empty-state-premium {
          padding: 80px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .empty-icon-circle {
          width: 80px;
          height: 80px;
          background: #f3f4f6;
          color: #9ca3af;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .empty-state-premium h3 { font-size: 1.5rem; color: var(--brand-blue); margin-bottom: 10px; }
        .empty-state-premium p { color: #9ca3af; margin-bottom: 25px; }
        
        .btn-primary-mini {
          background: var(--brand-orange);
          color: white;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.2s;
        }

        @media (max-width: 1024px) { 
          .list-controls-premium { flex-direction: column; align-items: flex-start; }
          .search-box-premium { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
