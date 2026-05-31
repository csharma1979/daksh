"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-links">
          <h4>By Room</h4>
          <ul>
            <li><Link href="/design-ideas/living-room">Living Room</Link></li>
            <li><Link href="/design-ideas/bedroom">Bedroom</Link></li>
            <li><Link href="/design-ideas/modular-kitchen">Modular Kitchen</Link></li>
            <li><Link href="/design-ideas/wardrobe">Wardrobe</Link></li>
            <li><Link href="/design-ideas/bathroom">Bathroom</Link></li>
            <li><Link href="/design-ideas/kids-room">Kids Room</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Modular</h4>
          <ul>
            <li><Link href="/modular-kitchens">Kitchen Designs</Link></li>
            <li><Link href="/wardrobes">Wardrobe Designs</Link></li>
            <li><Link href="/storage-units">TV Units</Link></li>
            <li><Link href="/false-ceiling">False Ceiling</Link></li>
            <li><Link href="/pooja-room">Pooja Room</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Expertise</h4>
          <ul>
            <li><Link href="/civil-projects">Civil Projects</Link></li>
            <li><Link href="/residences">Residences</Link></li>
            <li><Link href="/commercial">Commercial</Link></li>
            <li><Link href="/renovation-remodeling">Renovation</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Inspiration</h4>
          <ul>
            <li><Link href="/design-ideas/trending-designs">Trending</Link></li>
            <li><Link href="/vastu-tips">Vastu Tips</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/process">Process</Link></li>
            <li><Link href="/team">Team</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>


      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; {new Date().getFullYear()} Daksh Interiors. All rights reserved.</p>
          
          <div className="social-icons">
            <Link href="https://facebook.com" target="_blank" className="social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </Link>
            <Link href="https://instagram.com" target="_blank" className="social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="social-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.729V1.729C24 .774 23.205 0 22.225 0z"/></svg>
            </Link>
            <Link href="https://youtube.com" target="_blank" className="social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </Link>
          </div>

          <p className="tech-partner">
            Technology Partner: <Link href="https://tattvalogic.com" target="_blank">TattvaLogic</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--brand-blue);
          color: var(--brand-white);
          padding: var(--space-xl) 0 var(--space-md);
          margin-top: var(--space-xl);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-md);
        }
        .footer-logo {
          object-fit: contain;
          margin-bottom: var(--space-sm);
        }
        .footer-brand p {
          color: var(--brand-grey-light);
          max-width: 300px;
        }
        h4 {
          color: var(--brand-gold);
          margin-bottom: var(--space-md);
          font-size: 1.1rem;
        }
        ul {
          list-style: none;
        }
        li {
          margin-bottom: var(--space-xs);
        }
        li a {
          color: var(--brand-grey-light);
          font-size: 0.9rem;
        }
        li a:hover {
          color: var(--brand-gold);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--space-md);
          margin-top: var(--space-lg);
        }
        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--brand-grey-light);
        }
        .social-icons {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .social-btn {
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-white);
          transition: var(--transition-smooth);
        }
        .social-btn:hover {
          background: var(--brand-gold);
          color: var(--brand-blue);
          transform: translateY(-2px);
        }
        .footer-contact-bar {
          display: flex;
          justify-content: space-between;
          padding: var(--space-lg) 0;
          margin-top: var(--space-xl);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .contact-item .icon {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .contact-text strong {
          display: block;
          color: var(--brand-gold);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .contact-text p {
          color: var(--brand-grey-light);
          font-size: 0.95rem;
        }
        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tech-partner a {
          color: var(--brand-gold);
          font-weight: 700;
          text-decoration: none;
          transition: border-bottom 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .tech-partner a:hover {
          border-bottom: 1px solid var(--brand-gold);
        }
        @media (max-width: 1100px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
          }
          .footer-contact-bar {
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
          }
        }
        @media (max-width: 768px) {
          .footer-bottom-flex {
            flex-direction: column;
            gap: 10px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-brand p {
            margin: 0 auto;
          }
          .footer-contact-bar {
            flex-direction: column;
            gap: 20px;
            align-items: center;
            text-align: center;
          }
          .contact-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
