"use client";

import Image from "next/image";
import Link from "next/link";

const offerings = [
  {
    title: "Full Home Interiors",
    desc: "End-to-end luxury transformations for apartments, villas, and penthouses.",
    image: "/full-home.png",
    link: "/design-ideas"
  },
  {
    title: "Commercial Interiors",
    desc: "Optimized architectural designs for corporate offices, retail stores, and hospitality hubs.",
    image: "/commercial_hero_banner.png",
    link: "/commercial"
  },
  {
    title: "Civil Projects",
    desc: "End-to-end structural construction and foundational expertise for modern buildings.",
    image: "/civil_hero_banner.png",
    link: "/civil-projects"
  },
  {
    title: "Renovations",
    desc: "Transforming old spaces into modern masterpieces with expert remodeling.",
    image: "/renovations.png",
    link: "/renovation-remodeling"
  }
];

const ServiceOfferings = () => {
  return (
    <section className="offerings-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Our Expertise</div>
          <h2>One-stop shop for <span className="text-orange-grad">all things interiors</span></h2>
          <p>Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office.</p>
        </div>
        <div className="offerings-grid">
          {offerings.map((item, i) => (
            <Link href={item.link} key={i} className="offering-card">
              <div className="offering-image">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  priority={i < 4}
                  sizes="(max-width: 1440px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="offering-img-element"
                />
                <div className="card-overlay-grad" />
              </div>
              <div className="offering-content">
                <div className="card-meta">Premium Quality</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="offering-footer">
                  <span className="learn-more">Get Started</span>
                  <div className="arrow-circle">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .offerings-section {
          padding: 120px 0;
          background: #fff;
        }
        .section-header {
          text-align: center;
          margin-bottom: 80px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .section-badge {
          display: inline-block;
          background: rgba(245, 130, 32, 0.1);
          color: var(--brand-orange);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .section-header h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: 20px;
          color: var(--brand-blue);
          font-weight: 900;
          line-height: 1.1;
        }
        .text-orange-grad {
          background: linear-gradient(90deg, var(--brand-orange), #FFB16C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-header p {
          color: #666;
          font-size: 1.2rem;
          line-height: 1.6;
        }
        .offerings-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .offering-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid #f0f0f0;
          height: 100%;
          position: relative;
        }
        .offering-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
          border-color: var(--brand-orange);
        }
        .offering-image {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }
        .offering-card:hover :global(.offering-img-element) {
          transform: scale(1.1);
        }
        .card-overlay-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.2));
        }
        .offering-content {
          padding: 30px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .card-meta {
          font-size: 0.75rem;
          color: #9CA3AF;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .offering-content h3 {
          margin-bottom: 12px;
          font-size: 1.6rem;
          color: var(--brand-blue);
          font-weight: 800;
        }
        .offering-content p {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }
        .offering-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid #f5f5f5;
        }
        .learn-more {
          color: var(--brand-orange);
          font-weight: 800;
          font-size: 0.95rem;
        }
        .arrow-circle {
          width: 32px;
          height: 32px;
          background: var(--brand-blue-transparent);
          color: var(--brand-blue);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: var(--transition-smooth);
        }
        .offering-card:hover .arrow-circle {
          background: var(--brand-orange);
          color: #fff;
          transform: rotate(-45deg);
        }
        @media (max-width: 1200px) {
          .offerings-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .offerings-grid { grid-template-columns: 1fr; }
          .offering-image { height: 200px; }
        }
      `}</style>
    </section>
  );
};

export default ServiceOfferings;
