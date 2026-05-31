"use client";

import { useState, useMemo } from "react";
import { Clock, Mail, Globe, Monitor, Search, Filter, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

export default function ConsentsClient({ initialConsents }: { initialConsents: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and Search logic
  const filteredConsents = useMemo(() => {
    let filtered = initialConsents;

    if (statusFilter !== "All") {
      filtered = filtered.filter(c => c.consent === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        (c.email && c.email.toLowerCase().includes(term)) ||
        (c.ipAddress && c.ipAddress.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [initialConsents, searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredConsents.length / itemsPerPage));
  const paginatedConsents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredConsents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredConsents, currentPage]);

  // Handle page change ensuring it stays in bounds
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <>
      <div className="consents-controls">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by Email or IP..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="enquiries-table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Status</th>
              <th>User Details</th>
              <th>Device / Agent</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {paginatedConsents.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">
                    <Inbox size={48} className="empty-icon" />
                    <h3>No Consents Found</h3>
                    <p>
                      {initialConsents.length === 0 
                        ? "There are currently no cookie consent records in the database." 
                        : "No records match your search or filter criteria."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedConsents.map((consent: any) => (
                <tr key={consent._id}>
                  <td>
                    <div className="cell-with-icon">
                      <Clock size={16} className="text-grey" />
                      <span>{new Date(consent.createdAt).toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${consent.consent.toLowerCase()}`}>
                      {consent.consent}
                    </span>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="cell-with-icon">
                        <Mail size={16} />
                        <strong>{consent.email || "Anonymous"}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-with-icon" title={consent.userAgent}>
                      <Monitor size={16} />
                      <span className="truncate-text">{consent.userAgent.split(')')[0] + ')'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-with-icon">
                      <Globe size={16} />
                      <code>{consent.ipAddress}</code>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredConsents.length)}</strong> of <strong>{filteredConsents.length}</strong> entries
          </div>
          <div className="pagination-controls">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="page-btn"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
