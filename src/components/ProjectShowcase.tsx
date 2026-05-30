"use client";

import Image from "next/image";

const projects = [
  {
    title: "Modern Minimalist Villa",
    location: "DLF Phase 5, Gurugram",
    image: "/projects/villa.png",
    tags: ["Luxury", "Full Home"]
  },
  {
    title: "Scandinavian Penthouse",
    location: "Indiranagar, Bangalore",
    image: "/projects/penthouse.png",
    tags: ["Modular", "Modern"]
  },
  {
    title: "Urban Chic Apartment",
    location: "Whitefield, Bangalore",
    image: "/projects/apartment.png",
    tags: ["Compact", "Functional"]
  }
];

const ProjectShowcase = () => {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">Real Homes by <span className="text-orange">Daksh Interiors</span></h2>
          <p>Explore our recently completed projects that redefine urban living.</p>
        </div>
        
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-image">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority={i === 0}
                />
                <div className="project-overlay">
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="project-info">
                    <h3>{p.title}</h3>
                    <p>{p.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          padding: var(--space-xl) 0;
          background: var(--brand-white);
        }
        .section-header-centered {
          text-align: center;
          margin-bottom: var(--space-lg);
        }
        .section-title {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }
        .project-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: var(--transition-smooth);
          aspect-ratio: 3 / 4;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }
        .project-image {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .project-card:hover img {
          transform: scale(1.05);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--space-md);
          color: var(--brand-white);
        }
        .project-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .tag {
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .project-info h3 {
          color: var(--brand-white);
          font-size: 1.5rem;
          margin-bottom: 4px;
        }
        .project-info p {
          opacity: 0.8;
          font-size: 0.9rem;
        }
        @media (max-width: 992px) {
          .projects-grid { grid-template-columns: 1fr; }
          .project-card { aspect-ratio: 16 / 9; }
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
