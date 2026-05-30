"use client";

import Image from "next/image";
import Link from "next/link";
import ContactPageForm from "@/components/ContactPageForm";
import FAQSection from "@/components/FAQSection";
import CustomerReviews from "@/components/CustomerReviews";

import { useEffect, useState } from "react";
import { getPageBySlug } from "@/lib/actions/pages";
import * as gtag from '@/lib/gtag';

const ContactPage = () => {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPageBySlug("contact");
      if (data) setPageData(data);
    }
    fetchData();
  }, []);

  const content = pageData?.content || {
    hero: {
      title: "Let’s Design Your Dream Space",
      subtitle: "Have a project in mind? Whether it's home interiors, office design, or turnkey execution — we’re here to bring your vision to life.",
      image: "/contact-hero.png"
    }
  };

  return (
    <div className="contact-page">
      {/* 1. Hero Section */}
      <section className="contact-hero">
        <Image 
          src={content.hero.image} 
          alt="Contact Daksh Interiors" 
          fill 
          priority 
          style={{ objectFit: 'cover' }}
          className="contact-hero-bg"
        />
        <div className="container contact-hero-content">
          <h1>{content.hero.title.replace("Dream Space", "").trim()} <span className="text-orange">Dream Space</span></h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-ctas">
            <Link href="tel:+919741156389" className="btn-hero" onClick={() => gtag.event('phone_click', { event_category: 'Contact', event_label: 'Hero' })}>📞 Call Now</Link>
            <Link href="#form" className="btn-hero-primary">📅 Book Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* 2. Smart Contact Layout (Split) */}
      <section id="form" className="contact-split-section container">
        <div className="split-grid">
          {/* LEFT: Enquiry Form */}
          <div className="form-column">
            <ContactPageForm source="/contact" />
          </div>

          {/* RIGHT: Contact Details */}
          <div className="details-column">
            <div className="studio-card">
              <h3>📍 Visit Our Studio</h3>
              <div className="address-block">
                <strong>Daksh Interiors</strong>
                <p>No. XX, 2nd Floor, Main Road, Whitefield, Bangalore – 560066</p>
              </div>
              <div className="map-placeholder">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.33418296366!2d77.64157582570086!3d12.923122114777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1108a8d0a245%3A0x6393020057406ce2!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1711650000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="250" 
                  style={{ border: 0, borderRadius: '16px' }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="info-cards-grid">
              <div className="info-card">
                <span className="icon">📱</span>
                <div className="info-text">
                  <strong>Phone</strong>
                  <p>+91 97411 56389<br/>+91 90048 33909</p>
                </div>
              </div>
              <div className="info-card">
                <span className="icon">📧</span>
                <div className="info-text">
                  <strong>Email</strong>
                  <p>support@dakshinteriors.in</p>
                </div>
              </div>
              <div className="info-card">
                <span className="icon">🕒</span>
                <div className="info-text">
                  <strong>Working Hours</strong>
                  <p>Mon – Sat: 10 AM – 7 PM</p>
                  <p className="subtext">Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Section */}
      <section className="interactive-connect container">
        <div className="section-header">
          <h2>Choose How You Want to <span className="text-orange">Connect</span></h2>
        </div>
        <div className="connect-grid">
          <div className="connect-card">
            <span className="icon">📞</span>
            <h4>Instant Call</h4>
            <p>Speak to an expert now</p>
            <Link href="tel:+919741156389" className="card-link" onClick={() => gtag.event('phone_click', { event_category: 'Contact', event_label: 'Grid' })}>Call Now →</Link>
          </div>
          <div className="connect-card">
            <span className="icon">📅</span>
            <h4>Schedule a Visit</h4>
            <p>Book a studio walkthrough</p>
            <Link href="#form" className="card-link">Book slot →</Link>
          </div>
          <div className="connect-card">
            <span className="icon">🏠</span>
            <h4>Request Site Visit</h4>
            <p>Measurement & discussion</p>
            <Link href="#form" className="card-link">Request →</Link>
          </div>
          <div className="connect-card">
            <span className="icon">💻</span>
            <h4>Virtual Consultation</h4>
            <p>Design from your comfort</p>
            <Link href="#form" className="card-link">Start Zoom →</Link>
          </div>
        </div>
      </section>

      {/* 4. Location + Service Coverage */}
      <section className="coverage-section">
        <div className="container">
          <div className="coverage-flex">
            <div className="coverage-text">
              <h2>We Serve Across <span className="text-orange">Bangalore & Beyond</span></h2>
              <div className="area-tags">
                {["Whitefield", "Sarjapur", "Electronic City", "HSR Layout", "Marathahalli", "Indiranagar", "Koramangala"].map(area => (
                  <span key={area} className="area-tag">{area}</span>
                ))}
              </div>
            </div>
            <div className="coverage-cta">
              <p>Don't see your area? We take up major projects across South India.</p>
              <Link href="#form" className="btn-secondary">Check Availability</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Social Proof Section */}
      <CustomerReviews />

      {/* 6. FAQ Section */}
      <FAQSection />

      {/* 7. Final CTA Banner */}
      <section className="final-banner">
        <div className="container banner-content">
          <h2>Still Thinking? Let’s Talk!</h2>
          <p>Book your FREE consultation today and get expert guidance on your dream project.</p>
          <Link href="#form" className="btn-white">Get Started Now</Link>
        </div>
      </section>


      
      <div className="mobile-call-cta">
        <Link href="tel:+919741156389" onClick={() => gtag.event('phone_click', { event_category: 'Contact', event_label: 'Mobile Sticky' })}>📞 Call Now for Free Consultation</Link>
      </div>

      <div className="ai-chatbot-bubble">
        <div className="chatbot-text">AI Designer <span>Online</span></div>
        <div className="bubble-icon">🤖</div>
      </div>

      <style jsx>{`
        .contact-page {
          background: var(--brand-white);
        }
        .text-orange { color: var(--brand-orange); }
        
        /* Hero Section */
        .contact-hero {
          position: relative;
          padding: 120px 0;
          color: var(--brand-white);
          text-align: center;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .contact-hero-bg {
          z-index: 1;
        }
        .contact-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          z-index: 2;
        }
        .contact-hero-content {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .contact-hero h1 { 
          font-size: 4rem; 
          line-height: 1.1; 
          margin-bottom: 24px; 
          color: var(--brand-white) !important;
          text-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }
        .contact-hero p { 
          font-size: 1.4rem; 
          margin-bottom: 40px; 
          opacity: 1; 
          color: var(--brand-white) !important;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          font-weight: 500;
        }
        .hero-ctas {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-hero {
          background: rgba(255, 255, 255, 0.1);
          color: var(--brand-white);
          padding: 15px 30px;
          border-radius: 40px;
          font-weight: 700;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: var(--transition-smooth);
        }
        .btn-hero:hover { background: var(--brand-white); color: var(--brand-blue); }
        .btn-hero-primary {
          background: var(--brand-orange);
          color: var(--brand-white);
          padding: 15px 35px;
          border-radius: 40px;
          font-weight: 800;
          transition: var(--transition-smooth);
        }
        .btn-hero-primary:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3); }

        /* Split Layout */
        .contact-split-section {
          padding: 80px 0;
          margin-top: -60px;
          position: relative;
          z-index: 10;
        }
        .split-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
        }
        .studio-card {
          background: var(--brand-blue);
          color: var(--brand-white);
          padding: 40px;
          border-radius: 24px;
          margin-bottom: 30px;
          text-align: left;
        }
        .studio-card h3 { font-size: 1.8rem; margin-bottom: 20px; }
        .address-block { margin-bottom: 25px; opacity: 0.9; line-height: 1.6; }
        .info-cards-grid {
          display: grid;
          gap: 20px;
        }
        .info-card {
          background: var(--brand-cream);
          padding: 24px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
        }
        .info-card .icon { font-size: 2rem; }
        .info-text strong { display: block; color: var(--brand-blue); margin-bottom: 4px; }
        .info-text p { color: var(--brand-grey-dark); font-size: 1.1rem; }
        .info-text .subtext { font-size: 0.85rem; opacity: 0.6; }

        /* Interactive Section */
        .interactive-connect { padding: 80px 0; text-align: center; }
        .section-header h2 { font-size: 3rem; margin-bottom: 50px; }
        .connect-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .connect-card {
          background: var(--brand-white);
          padding: 40px 24px;
          border-radius: 24px;
          border: 1px solid rgba(0, 43, 91, 0.05);
          transition: var(--transition-smooth);
        }
        .connect-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: var(--brand-orange); }
        .connect-card .icon { font-size: 3rem; margin-bottom: 20px; display: block; }
        .connect-card h4 { font-size: 1.4rem; margin-bottom: 10px; color: var(--brand-blue); }
        .connect-card p { opacity: 0.7; margin-bottom: 20px; font-size: 0.9rem; }
        .card-link { color: var(--brand-orange); font-weight: 800; text-decoration: none; }

        /* Coverage Section */
        .coverage-section { background: var(--brand-blue); color: var(--brand-white); padding: 80px 0; }
        .coverage-flex { display: flex; justify-content: space-between; align-items: center; }
        .area-tags { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
        .area-tag { background: rgba(255, 255, 255, 0.1); padding: 8px 20px; border-radius: 40px; font-size: 0.95rem; }
        .coverage-cta { max-width: 400px; text-align: right; }
        .coverage-cta p { margin-bottom: 20px; opacity: 0.8; }
        .btn-secondary { background: var(--brand-orange); color: var(--brand-white); padding: 12px 30px; border-radius: 30px; font-weight: 700; }

        /* Final Banner */
        .final-banner { background: var(--brand-orange); padding: 100px 0; text-align: center; color: var(--brand-white); }
        .final-banner h2 { font-size: 3.5rem; margin-bottom: 20px; }
        .final-banner p { font-size: 1.25rem; margin-bottom: 40px; opacity: 0.9; }
        .btn-white { background: var(--brand-white); color: var(--brand-orange); padding: 18px 45px; border-radius: 50px; font-weight: 800; font-size: 1.2rem; }



        .mobile-call-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--brand-blue);
          color: var(--brand-white);
          padding: 18px;
          text-align: center;
          font-weight: 800;
          z-index: 1000;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.2);
        }

        /* AI Chatbot Bubble */
        .ai-chatbot-bubble {
          position: fixed;
          bottom: 40px;
          left: 40px;
          background: var(--brand-white);
          padding: 10px 20px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(0, 43, 91, 0.1);
          z-index: 1000;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .ai-chatbot-bubble:hover { transform: scale(1.05); }
        .bubble-icon { font-size: 1.5rem; }
        .chatbot-text { font-size: 0.85rem; font-weight: 700; color: var(--brand-blue); line-height: 1.2; }
        .chatbot-text span { display: block; color: #25D366; font-size: 0.7rem; text-transform: uppercase; }

        @media (max-width: 1024px) {
          .ai-chatbot-bubble { bottom: 85px; left: 20px; padding: 8px 15px; }
        }
        @media (max-width: 1024px) {
          .split-grid, .connect-grid, .coverage-flex { grid-template-columns: 1fr; display: flex; flex-direction: column; }
          .contact-hero h1 { font-size: 2.8rem; }
          .btn-white, .btn-hero-primary { width: 100%; text-align: center; }
          .coverage-cta { text-align: left; margin-top: 40px; max-width: 100%; }
          .mobile-call-cta { display: block; }

        }
      `}</style>
    </div>
  );
};

export default ContactPage;
