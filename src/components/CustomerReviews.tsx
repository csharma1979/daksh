"use client";

const staticReviews = [
  // ... (keeping existing reviews as fallback)
  {
    name: "Rohit Paul & Shveta",
    city: "Gurugram",
    text: "Hats off to the entire team at Daksh Interiors. They finished the project ahead of time and the quality is outstanding.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Swati & Gaurav",
    city: "Bangalore",
    text: "Our experience with Daksh Interiors was nice thanks to the project managers. Everything was handled professionally.",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
];

interface CustomerReviewsProps {
  data?: {
    title?: string;
    subtitle?: string;
  };
  externalTestimonials?: any[];
}

import { getTestimonials } from "@/lib/actions/testimonials";
import { useEffect, useState } from "react";
import "./CustomerReviews.css";

const CustomerReviews = ({ data, externalTestimonials }: CustomerReviewsProps) => {
  const [liveTestimonials, setLiveTestimonials] = useState<any[]>([]);

  useEffect(() => {
    if (!externalTestimonials) {
      getTestimonials().then(res => {
        const published = res.filter((t: any) => t.isPublished).slice(0, 10);
        setLiveTestimonials(published);
      });
    }
  }, [externalTestimonials]);

  const reviewsToDisplay = externalTestimonials 
    ? (externalTestimonials.length > 0 ? externalTestimonials : staticReviews)
    : (liveTestimonials.length > 0 ? liveTestimonials : staticReviews);

  // Duplicate reviews to create seamless loop
  const displayReviews = [...reviewsToDisplay, ...reviewsToDisplay];

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2 dangerouslySetInnerHTML={{ __html: data?.title || "What our <span class='text-orange'>customers say</span>" }} />
          <p>{data?.subtitle || "10,000+ happy homes and counting. Here are some of their stories."}</p>
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          {displayReviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-top">
                <div className="avatar">
                  <img src={r.avatar} alt={r.name} />
                </div>
                <div className="stars">{"★".repeat(Math.floor(r.rating))}</div>
              </div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">
                <strong>{r.name}</strong>
                <span>{r.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
