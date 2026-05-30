"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  breadcrumbCategory?: string;
}

const HeroBanner = ({
  title,
  subtitle,
  backgroundImage,
  ctaText = "Get Free Consultation",
  ctaLink = "/contact",
  breadcrumbCategory
}: HeroBannerProps) => {
  return (
    <section className="hero-banner">
      <Image
        src={backgroundImage}
        alt={title.replace(/<[^>]*>?/gm, '')}
        fill
        priority
        style={{ objectFit: 'cover', zIndex: 1 }}
        className="banner-bg-img"
      />
      <div className="container banner-content-layout">
        <div className="banner-text-centered">
          {/* Breadcrumb - Optional */}
          {breadcrumbCategory && (
            <nav className="banner-breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={14} />
              <Link href="/design-ideas">Design Ideas</Link>
              <ChevronRight size={14} />
              <span>{breadcrumbCategory}</span>
            </nav>
          )}

          <h1 className="banner-title" dangerouslySetInnerHTML={{ __html: title }} />
          
          <p className="banner-subtitle">
            {subtitle}
          </p>

          <div className="banner-cta-box">
             <Link href={ctaLink} className="banner-cta-btn">
                {ctaText}
             </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-banner {
          position: relative;
          padding: 160px 0 100px;
          color: white;
          min-height: 520px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #002B5B;
          border-radius: 0 0 60px 60px;
          text-align: center;
        }
        .hero-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(0, 43, 91, 0.65), rgba(0, 43, 91, 0.45));
          z-index: 2;
        }
        :global(.banner-bg-img) {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .banner-content-layout {
          position: relative;
          z-index: 10;
          width: 100%;
        }
        .banner-text-centered {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .banner-breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 30px;
          opacity: 0.8;
          color: white;
        }
        .banner-breadcrumb :global(a) { 
          color: white; 
          text-decoration: none; 
          transition: all 0.3s; 
          opacity: 0.8;
        }
        .banner-breadcrumb :global(a:hover) { 
          opacity: 1; 
          color: var(--brand-orange);
        }
        .banner-breadcrumb span { color: var(--brand-orange); }

        .banner-title {
          font-size: 5rem;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -2px;
          font-weight: 900;
          color: white;
          text-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .banner-title :global(span.text-orange) { 
          color: #F58220 !important; 
        }
        
        .banner-subtitle {
          font-size: 1.5rem;
          margin-bottom: 45px;
          opacity: 0.95;
          line-height: 1.5;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          font-weight: 500;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .banner-cta-btn {
          display: inline-block;
          background: #F58220;
          color: white;
          padding: 22px 60px;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1.25rem;
          text-decoration: none;
          box-shadow: 0 15px 40px rgba(245, 130, 32, 0.4), 0 0 0 0 rgba(245, 130, 32, 0.3);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          animation: pulse-cta 3.5s infinite;
          border: 2px solid #F58220;
          position: relative;
          overflow: hidden;
        }
        
        .banner-cta-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          animation: cta-shine 5s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
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

        .banner-cta-btn:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 60px rgba(245, 130, 32, 0.6);
          background: white;
          color: #F58220;
          border-color: white;
        }

        @media (max-width: 1100px) {
          .banner-title { font-size: 3.8rem; }
          .hero-banner { padding: 140px 0 80px; }
          .banner-subtitle { font-size: 1.3rem; }
        }
        @media (max-width: 640px) {
          .banner-title { font-size: 2.8rem; letter-spacing: -1px; }
          .banner-subtitle { font-size: 1.1rem; }
          .banner-breadcrumb { font-size: 0.75rem; margin-bottom: 20px; }
          .banner-cta-btn { padding: 15px 35px; font-size: 1rem; }
          .hero-banner { border-radius: 0 0 40px 40px; min-height: 480px; }
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
