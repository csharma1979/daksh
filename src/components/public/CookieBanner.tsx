"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./CookieBanner.css";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = async (status: "Accepted" | "Rejected") => {
    setIsSubmitting(true);
    try {
      // Async API call to save consent
      fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || undefined,
          consent: status,
        }),
      });

      localStorage.setItem("cookie-consent", status);
      setShowBanner(false);
    } catch (error) {
      console.error("Failed to save consent:", error);
      // Still hide banner to not annoy user
      localStorage.setItem("cookie-consent", status);
      setShowBanner(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-wrapper">
      <div className="container cookie-banner-container">
        <div className="cookie-content">
          <div className="cookie-text">
            <p>
              We use cookies to enhance your experience. By continuing, you agree to our 
              use of cookies. <Link href="/privacy" className="privacy-link">Learn More</Link>
            </p>
          </div>
          
          <div className="cookie-actions">
            <div className="email-capture">
              <input 
                type="email" 
                placeholder="Enter email (optional)" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cookie-email-input"
              />
            </div>
            <div className="button-group">
              <button 
                onClick={() => handleConsent("Rejected")} 
                className="btn-cookie-secondary"
                disabled={isSubmitting}
              >
                Reject
              </button>
              <button 
                onClick={() => handleConsent("Accepted")} 
                className="btn-cookie-primary"
                disabled={isSubmitting}
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
