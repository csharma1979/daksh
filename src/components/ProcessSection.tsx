"use client";

const processes = [
  { step: "01", icon: "🤝", title: "Consultation", desc: "Share your vision with our expert design partners in our experience centers." },
  { step: "02", title: "Design", icon: "📐", desc: "Get detailed 2D/3D renders and choose premium materials from our catalog." },
  { step: "03", title: "Production", icon: "🏭", desc: "Precision factory-made modular components with German technology." },
  { step: "04", title: "Installation", icon: "🛠️", desc: "Expert on-site assembly and white-glove setup by our trained professionals." },
  { step: "05", title: "Handover", icon: "🔑", desc: "Final quality check and handover of your dream home in just 45 days." },
];

const ProcessSection = () => {
  return (
    <section className="process-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The <span className="text-orange">Daksh Process</span></h2>
          <p className="section-subtitle">A seamless journey from your vision to a beautiful reality.</p>
        </div>
        
        <div className="process-timeline">
          <div className="timeline-line"></div>
          <div className="process-grid">
            {processes.map((p, i) => (
              <div key={i} className="process-card">
                <div className="process-icon-wrapper">
                  <div className="process-step-num">{p.step}</div>
                  <span className="process-icon">{p.icon}</span>
                </div>
                <div className="process-info">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .process-section {
          padding: var(--space-xxl) 0;
          background: var(--brand-cream);
          overflow: hidden;
        }
        .section-header {
          text-align: center;
          margin-bottom: var(--space-xxl);
        }
        .section-title {
          font-size: 3.5rem;
          margin-bottom: 12px;
          line-height: 1;
        }
        .section-subtitle {
          font-size: 1.25rem;
          color: var(--brand-grey-dark);
          opacity: 0.7;
        }
        .process-timeline {
          position: relative;
          padding: 40px 0;
        }
        .timeline-line {
          position: absolute;
          top: 90px;
          left: 5%;
          right: 5%;
          height: 2px;
          background: rgba(0, 43, 91, 0.1);
          z-index: 1;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-lg);
          position: relative;
          z-index: 2;
        }
        .process-card {
          text-align: center;
          transition: var(--transition-smooth);
        }
        .process-icon-wrapper {
          width: 100px;
          height: 100px;
          background: var(--brand-white);
          border-radius: 50%;
          margin: 0 auto 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: var(--shadow-sm);
          border: 2px solid transparent;
          transition: var(--transition-smooth);
        }
        .process-card:hover .process-icon-wrapper {
          transform: scale(1.1);
          border-color: var(--brand-orange);
          box-shadow: var(--shadow-lg);
        }
        .process-step-num {
          position: absolute;
          top: -10px;
          right: -10px;
          background: var(--brand-orange);
          color: var(--brand-white);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 0.85rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid var(--brand-white);
        }
        .process-icon {
          font-size: 2.5rem;
        }
        .process-info h4 {
          color: var(--brand-blue);
          margin-bottom: 12px;
          font-size: 1.4rem;
          font-weight: 700;
        }
        .process-info p {
          color: var(--brand-grey-dark);
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.8;
        }
        @media (max-width: 1024px) {
          .process-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .timeline-line {
            display: none;
          }
          .section-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
