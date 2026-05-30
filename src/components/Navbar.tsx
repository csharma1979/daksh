"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const pathname = usePathname();

  const handleDropdownClick = () => {
    setIsDropdownClosing(true);
  };

  useEffect(() => {
    setIsDropdownClosing(true);
  }, [pathname]);

  const handleMouseLeave = () => {
    setIsDropdownClosing(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo-container">
          <img 
            src="/Daksh-logo.jpg" 
            alt="Daksh Interiors Logo" 
            style={{ height: '85px', width: 'auto' }}
            className="logo-img"
          />
        </Link>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          <li 
            className={`has-megamenu ${isActive('/design-ideas') ? 'active' : ''}`}
            onMouseEnter={() => setIsDropdownClosing(false)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/design-ideas">Design Ideas <span className="arrow">▼</span></Link>
            <div 
              className="megamenu" 
              style={isDropdownClosing ? { opacity: 0, visibility: 'hidden', pointerEvents: 'none' } : {}} 
              onClick={handleDropdownClick}
            >
              <div className="megamenu-column">
                <h4>By Room</h4>
                <Link href="/design-ideas/living-room">Living Room</Link>
                <Link href="/design-ideas/bedroom">Bedroom</Link>
                <Link href="/design-ideas/modular-kitchen">Modular Kitchen</Link>
                <Link href="/design-ideas/wardrobe">Wardrobe</Link>
                <Link href="/design-ideas/bathroom">Bathroom</Link>
                <Link href="/design-ideas/kids-room">Kids Room</Link>
              </div>
              <div className="megamenu-column">
                <h4>Modular Solutions</h4>
                <Link href="/modular-kitchens">Full Kitchen Designs</Link>
                <Link href="/wardrobes">Wardrobe Designs</Link>
                <Link href="/storage-units">TV Units & Storage</Link>
                <Link href="/false-ceiling">False Ceiling</Link>
                <Link href="/pooja-room">Pooja Room</Link>
              </div>
              <div className="megamenu-column">
                <h4>Inspiration</h4>
                <Link href="/design-ideas/trending">Trending Designs</Link>
                <Link href="/vastu-tips">Vastu Tips</Link>
              </div>
              <div className="megamenu-promo">
                <div className="promo-img-container" style={{ position: 'relative' }}>
                  <Image src="/promo-discount.png" alt="Promo" fill style={{ objectFit: 'cover' }} />
                </div>
                <p>Get up to 20% off on Full Home Interiors</p>
                <Link href="/contact" className="promo-link">Book Now</Link>
              </div>
            </div>
          </li>
          <li className={isActive('/civil-projects') ? 'active' : ''}><Link href="/civil-projects">Civil Projects</Link></li>
          <li className={isActive('/residences') ? 'active' : ''}><Link href="/residences">Residences</Link></li>
          <li className={isActive('/commercial') ? 'active' : ''}><Link href="/commercial">Commercial</Link></li>
          <li className={isActive('/renovation-remodeling') ? 'active' : ''}><Link href="/renovation-remodeling">Renovation & Remodeling</Link></li>
          <li 
            className="has-megamenu"
            onMouseEnter={() => setIsDropdownClosing(false)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="#">More <span className="arrow">▼</span></Link>
            <div 
              className="megamenu" 
              style={isDropdownClosing ? { opacity: 0, visibility: 'hidden', pointerEvents: 'none' } : {}} 
              onClick={handleDropdownClick}
            >
              <div className="megamenu-column">
                <h4>About Daksh</h4>
                <Link href="/about">About Us</Link>
                <Link href="/process">Our Process</Link>
                <Link href="/team">Meet The Team</Link>
                <Link href="/careers">Careers</Link>
              </div>
              <div className="megamenu-column">
                <h4>Resources</h4>
                <Link href="/blog">Blog & Trends</Link>
                <Link href="/budget-calculator">Cost Calculator</Link>
                <Link href="/faq">FAQs</Link>
              </div>
              <div className="megamenu-column">
                <h4>Connect</h4>
                <Link href="/contact">Contact Us</Link>
                <Link href="/partner-with-us">Partner With Us</Link>
              </div>
              <div className="megamenu-promo">
                <div className="promo-img-container" style={{ position: 'relative' }}>
                  <Image src="/promo-experience.png" alt="Experience" fill style={{ objectFit: 'cover' }} />
                </div>
                <p>Join our exclusive Design Partner Network</p>
                <Link href="/partner-with-us" className="promo-link">Apply Now</Link>
              </div>
            </div>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="nav-actions">
          <Link href="/consultation" className="btn-primary">
            Book Free Consultation
          </Link>
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <img src="/Daksh-logo.jpg" alt="Logo" style={{ height: '50px' }} />
            <button className="close-menu" onClick={() => setIsMobileMenuOpen(false)}>&times;</button>
          </div>
          <div className="mobile-links">
            <Link href="/design-ideas" className={isActive('/design-ideas') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Design Ideas</Link>
            <Link href="/civil-projects" className={isActive('/civil-projects') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Civil Projects</Link>
            <Link href="/residences" className={isActive('/residences') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Residences</Link>
            <Link href="/commercial" className={isActive('/commercial') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Commercial</Link>
            <Link href="/renovation-remodeling" className={isActive('/renovation-remodeling') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Renovations</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Link href="/consultation" className="btn-mobile-consult" onClick={() => setIsMobileMenuOpen(false)}>
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: var(--brand-white);
          height: 100px;
          box-shadow: var(--shadow-sm);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 2000;
          display: flex;
          align-items: center;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          height: 100%;
        }
        .logo-img {
          object-fit: contain;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 24px;
          margin: 0;
          padding: 0;
          height: 100px;
        }
        .nav-links li {
          position: relative;
          display: flex;
          align-items: center;
          height: 100px;
        }
        .nav-links a {
          font-weight: 700;
          color: var(--brand-blue);
          font-size: 0.9rem;
          white-space: nowrap;
          transition: var(--transition-smooth);
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 5px;
        }
        .nav-links li.active a,
        .nav-links a:hover {
          color: var(--brand-orange);
        }
        .nav-links li::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: var(--brand-orange);
          transition: width 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          border-radius: 4px;
        }
        .nav-links li.active::after,
        .nav-links li:hover::after {
          width: 100%;
        }
        .nav-links li.has-megamenu {
          position: static;
        }
        .btn-primary {
          background: var(--brand-orange) !important;
          color: var(--brand-white) !important;
          padding: 12px 24px !important;
          border-radius: 50px !important;
          font-weight: 800 !important;
          transition: var(--transition-smooth);
          box-shadow: 0 4px 15px rgba(245, 130, 32, 0.2);
          display: inline-block !important;
        }
        .btn-primary:hover {
          background: var(--brand-blue) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 43, 91, 0.3);
        }
        .dots {
          font-weight: 900;
          margin-left: 2px;
          font-size: 1.1rem;
        }
        .arrow {
          font-size: 0.6rem;
          margin-left: 4px;
          vertical-align: middle;
          transition: transform 0.3s ease;
        }
        .has-megamenu:hover .arrow {
          transform: rotate(180deg);
        }
        
        /* Hamburger Menu Icon */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 3000;
        }
        .hamburger span {
          display: block;
          width: 25px;
          height: 3px;
          background: var(--brand-blue);
          border-radius: 3px;
          transition: 0.3s;
        }
        .hamburger.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* Mobile Menu Drawer */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 2500;
          visibility: hidden;
          transition: 0.4s;
        }
        .mobile-menu.open {
          right: 0;
          visibility: visible;
        }
        .mobile-menu-content {
          width: 80%;
          height: 100%;
          background: var(--brand-white);
          float: right;
          padding: 30px;
          display: flex;
          flex-direction: column;
        }
        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .close-menu {
          font-size: 2.5rem;
          background: none;
          border: none;
          color: var(--brand-blue);
        }
        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .mobile-links a {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--brand-blue);
          padding: 8px 15px;
          border-left: 4px solid transparent;
          transition: var(--transition-smooth);
        }
        .mobile-links a.active {
          color: var(--brand-orange);
          background: rgba(245, 130, 32, 0.05);
          border-left-color: var(--brand-orange);
        }
        .btn-mobile-consult {
          background: var(--brand-orange);
          color: var(--brand-white) !important;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          margin-top: 20px;
        }
        .megamenu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--brand-white);
          box-shadow: var(--shadow-lg);
          padding: 40px var(--space-xl);
          display: grid;
          grid-template-columns: repeat(3, 1fr) 1.5fr;
          gap: var(--space-xl);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: var(--transition-smooth);
          z-index: 1000;
          border-top: 1px solid var(--brand-grey-light);
        }
        .has-megamenu:hover .megamenu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .megamenu-column h4 {
          font-size: 1.1rem;
          color: var(--brand-grey-dark);
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .megamenu-column :global(a) {
          display: block;
          padding: 8px 0;
          font-size: 0.95rem;
          color: var(--brand-grey-dark) !important;
          opacity: 0.7;
          font-weight: 500;
        }
        .megamenu-column :global(a:hover) {
          opacity: 1;
          color: var(--brand-orange) !important;
          padding-left: 5px;
        }
        .megamenu-promo {
          background: var(--brand-cream);
          padding: 24px;
          border-radius: 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .promo-img-container {
          position: relative;
          width: 100%;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 15px;
          box-shadow: var(--shadow-sm);
        }
        .megamenu-promo p {
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--brand-grey-dark);
        }
        .promo-link {
          color: var(--brand-orange);
          font-weight: 800;
          text-decoration: underline;
        }
        @media (max-width: 1024px) {
          .nav-links, .nav-actions .btn-primary {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .logo-img {
            height: 60px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
