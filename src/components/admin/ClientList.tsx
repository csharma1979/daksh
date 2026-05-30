"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, Edit, Filter } from "lucide-react";
import DeleteClientBtn from "./DeleteClientBtn";
import ClientStatusToggle from "./ClientStatusToggle";

export default function ClientList({ initialClients }: { initialClients: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredClients = initialClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "active" ? client.isActive : !client.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="client-list-container">
      <div className="search-filters">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search partners by brand name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-tab ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Client Name</th>
                <th>Display Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id}>
                  <td className="client-logo-cell">
                    <img src={client.logo} alt={client.name} className="client-logo-preview" />
                  </td>
                  <td>
                    <div className="client-name-group">
                      <strong>{client.name}</strong>
                      {client.website && (
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="client-url">
                          {client.website} <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="order-badge">{client.order}</span>
                  </td>
                  <td>
                    <ClientStatusToggle id={client._id} isActive={client.isActive} />
                  </td>
                  <td>
                    <div className="action-btns">
                      <Link href={`/admin/clients/${client._id}`} className="btn-icon" title="Edit Client">
                        <Edit size={16} />
                      </Link>
                      <DeleteClientBtn id={client._id} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="empty-state">
                      <h3>No matches found</h3>
                      <p>Try adjusting your search or filters to find what you're looking for.</p>
                      {searchTerm && (
                        <button className="btn-secondary" style={{ marginTop: '15px' }} onClick={() => setSearchTerm("")}>
                          Clear Search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
