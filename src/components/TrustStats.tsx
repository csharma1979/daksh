"use client";

const stats = [
  { label: "Flat 10-year warranty", value: "10yr", icon: "🛡️", detail: "Quality you can trust" },
  { label: "45-day move-in guarantee", value: "45d", icon: "📅", detail: "Fastest turnaround" },
  { label: "Quality Checks", value: "150+", icon: "✅", detail: "Rigorous standards" },
  { label: "Happy Homes", value: "10k+", icon: "🏠", detail: "Across major cities" },
];

const TrustStats = () => {
  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="section-title">Why choose <span className="text-orange">Daksh Interiors</span>?</h2>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <p className="stat-detail">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .trust-section {
          padding: var(--space-xl) 0;
          background: var(--brand-grey-dark);
          color: var(--brand-white);
        }
        .section-title {
          text-align: center;
          margin-bottom: var(--space-lg);
          font-size: 3rem;
          color: var(--brand-white);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
        }
        .stat-card {
          text-align: center;
          padding: var(--space-lg);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: var(--transition-smooth);
        }
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
          border-color: var(--brand-orange);
        }
        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }
        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          color: var(--brand-orange);
          margin-bottom: 8px;
          line-height: 1;
        }
        .stat-label {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--brand-white);
        }
        .stat-detail {
          font-size: 0.9rem;
          opacity: 0.6;
        }
        @media (max-width: 992px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 576px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default TrustStats;
