import Link from "next/link";
import "./SEOIntro.css";

export default function SEOIntro() {
  return (
    <section className="seo-intro-section">
      <div className="container">
        <div className="seo-content-card">
          <div className="premium-badge">Expert Choice 2026</div>
          <h2 className="seo-main-title">
            Top <span className="text-orange-gradient">Interior Designers in Bangalore</span>
          </h2>
          <div className="divider-glow"></div>
          <p className="seo-description">
            Welcome to <strong>Daksh Interiors</strong>, where elite craftsmanship meets visionary design. 
            As the premier <strong>interior designers in Bangalore</strong>, we don't just build homes; 
            we engineer lifestyles. From ultra-modern <strong>modular kitchens</strong> to bespoke 
            <strong>flat interiors</strong>, our Bangalore studio delivers turnkey solutions that redefine luxury.
          </p>
          <div className="seo-links-grid">
            <Link href="/services" className="seo-link-item">
              <span className="icon">🏆</span>
              <div className="link-text">
                <strong>Home Interior Services</strong>
                <span>Consult with Bangalore's best</span>
              </div>
            </Link>
            <Link href="/projects" className="seo-link-item">
              <span className="icon">📸</span>
              <div className="link-text">
                <strong>Luxury Portfolios</strong>
                <span>View our latest Bangalore projects</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
