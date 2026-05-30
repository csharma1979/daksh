"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";

interface DesignHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  breadcrumbCategory?: string;
}

const DesignHero = ({
  title,
  subtitle,
  backgroundImage,
  ctaText = "Get Free Consultation",
  ctaLink = "/contact",
  breadcrumbCategory
}: DesignHeroProps) => {
  return (
    <section className="directory-hero">
      <Image
        src={backgroundImage}
        alt={title.replace(/<[^>]*>?/gm, '')}
        fill
        priority
        style={{ objectFit: 'cover', zIndex: 1 }}
        className="hero-bg-img"
      />
      <div className="container hero-content-layout">
        <div className="hero-text-centered">
          {/* Breadcrumb */}
          <nav className="hero-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/design-ideas">Design Ideas</Link>
            {breadcrumbCategory && (
              <>
                <ChevronRight size={14} />
                <span>{breadcrumbCategory}</span>
              </>
            )}
          </nav>

          <div className="hero-badge-brand">
            <Sparkles size={16} className="inline mr-2" />
            Galleries of Excellence
          </div>
          
          <h1 className="hero-title-brand" dangerouslySetInnerHTML={{ __html: title }} />
          
          <p className="hero-subtitle-brand">
            {subtitle}
          </p>

          <div className="hero-cta-box">
             <Link href={ctaLink} className="hero-cta-btn">
                {ctaText}
             </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .directory-hero {
          position: relative;
          padding: 160px 0 100px;
          color: white;
          min-height: 500px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #002B5B;
          border-radius: 0 0 60px 60px;
          text-align: center;
        }
        .directory-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(0, 43, 91, 0.65), rgba(0, 43, 91, 0.45));
          z-index: 2;
        }
        :global(.hero-bg-img) {
          position: absolute;
          inset: 0;
          z-index: 1;
          object-fit: cover;
        }
        .hero-content-layout {
          position: relative;
          z-index: 10;
          width: 100%;
        }
        .hero-text-centered {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .hero-breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 25px;
          opacity: 0.8;
          color: white;
        }
        .hero-breadcrumb :global(a) { 
          color: white; 
          text-decoration: none; 
          transition: all 0.3s; 
          opacity: 0.8;
        }
        .hero-breadcrumb :global(a:hover) { 
          opacity: 1; 
          color: #F58220;
        }
        .hero-breadcrumb span { color: #F58220; }

        .hero-badge-brand {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .hero-title-brand {
          font-size: 5rem;
          line-height: 1;
          margin-bottom: 24px;
          letter-spacing: -2px;
          font-weight: 900;
          color: white;
          text-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .hero-title-brand :global(span.text-orange) { 
          color: #F58220 !important; 
        }
        
        .hero-subtitle-brand {
          font-size: 1.5rem;
          margin-bottom: 40px;
          opacity: 0.95;
          line-height: 1.5;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          font-weight: 500;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-cta-btn {
          display: inline-block;
          background: #F58220;
          color: white;
          padding: 22px 60px;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1.2rem;
          text-decoration: none;
          box-shadow: 0 15px 40px rgba(245, 130, 32, 0.4), 0 0 0 0 rgba(245, 130, 32, 0.3);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          animation: pulse-cta 3s infinite;
          border: 2px solid #F58220;
          position: relative;
          overflow: hidden;
        }
        
        .hero-cta-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          animation: cta-shine 4s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        @keyframes cta-shine {
          0% { left: -100%; }
          15% { left: 150%; }
          100% { left: 150%; }
        }
        
        @keyframes pulse-cta {
          0% { box-shadow: 0 15px 40px rgba(245, 130, 32, 0.4), 0 0 0 0 rgba(245, 130, 32, 0.5); }
          70% { box-shadow: 0 15px 40px rgba(245, 130, 32, 0.4), 0 0 0 15px rgba(245, 130, 32, 0); }
          100% { box-shadow: 0 15px 40px rgba(245, 130, 32, 0.4), 0 0 0 0 rgba(245, 130, 32, 0); }
        }

        .hero-cta-btn:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 60px rgba(245, 130, 32, 0.6);
          background: white;
          color: #F58220;
          border-color: white;
        }

        @media (max-width: 1100px) {
          .hero-title-brand { font-size: 3.8rem; }
          .directory-hero { padding: 140px 0 80px; }
          .hero-subtitle-brand { font-size: 1.3rem; }
        }
        @media (max-width: 640px) {
          .hero-title-brand { font-size: 2.8rem; letter-spacing: -1px; }
          .hero-subtitle-brand { font-size: 1.1rem; }
          .hero-breadcrumb { font-size: 0.75rem; margin-bottom: 20px; }
          .hero-cta-btn { padding: 15px 35px; font-size: 1rem; }
          .directory-hero { border-radius: 0 0 40px 40px; min-height: 450px; }
        }
      `}</style>
    </section>
  );
};

export default DesignHero;
