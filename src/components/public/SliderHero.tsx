"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import "./SliderHero.css";

const slides = [
  {
    id: "civil",
    title: "Transforming Infrastructure with <br/><span class='text-orange'>Expert Civil Engineering</span>",
    subtitle: "End-to-end civil solutions for large-scale projects, from foundation to finish.",
    image: "/civil_hero_banner.png",
    link: "/civil-projects"
  },
  {
    id: "residences",
    title: "Luxury Living <br/><span class='text-orange'>Starts Here</span>",
    subtitle: "Personalized home interiors that reflect your unique style and status.",
    image: "/residences_hero_banner.png",
    link: "/residences"
  },
  {
    id: "commercial",
    title: "Innovative Workspace <br/><span class='text-orange'>Solutions</span>",
    subtitle: "Design-led commercial interiors built for productivity and brand identity.",
    image: "/commercial_hero_banner.png",
    link: "/commercial"
  },
  {
    id: "renovation",
    title: "Give Your Home a <br/><span class='text-orange'>Modern Makeover</span>",
    subtitle: "Breathe new life into your existing spaces with expert renovation & remodeling.",
    image: "/renovation_hero_banner.png",
    link: "/renovation-remodeling"
  },
  {
    id: "kitchen",
    title: "Engineered for <br/><span class='text-orange'>Culinary Excellence</span>",
    subtitle: "Premium modular kitchens designed for ergonomics, style, and lifelong durability.",
    image: "/inspiration/modular-kitchen.png",
    link: "/modular-kitchens"
  },
  {
    id: "wardrobes",
    title: "Bespoke Storage <br/><span class='text-orange'>for Modern Living</span>",
    subtitle: "Custom-crafted wardrobes and closet systems designed to maximize every square inch of your home.",
    image: "/inspiration/wardrobe.png",
    link: "/wardrobes"
  },
  {
    id: "storage",
    title: "Functional Storage <br/><span class='text-orange'>Designed for Life</span>",
    subtitle: "Premium TV units, crockery consoles, and shoe racks that blend seamless utility with cinematic design.",
    image: "/inspiration/storage-units.png",
    link: "/storage-units"
  },
  {
    id: "ceiling",
    title: "Architectural Ceilings <br/><span class='text-orange'>Designed for Life</span>",
    subtitle: "Premium POP, gypsum, and wooden ceilings with integrated ambient lighting for a cinematic home experience.",
    image: "/inspiration/false-ceiling.png",
    link: "/false-ceiling"
  },
  {
    id: "pooja",
    title: "Sacred Pooja Spaces <br/><span class='text-orange'>Designed for Life</span>",
    subtitle: "Vastu-compliant mandir designs with intricate marble carving and CNC jaali work for a serene spiritual experience.",
    image: "/inspiration/pooja-room.png",
    link: "/pooja-room"
  }
];

const SliderHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const current = slides[currentSlide];

  return (
    <section className="slider-hero">
      {/* Background Layer */}
      <div className="slider-bg-container">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide-img-wrapper ${index === currentSlide ? 'active' : ''}`}
          >
            <Image 
              src={slide.image} 
              alt={slide.id} 
              fill 
              priority={index === 0}
              style={{ objectFit: 'cover' }}
              className="hero-bg-img"
            />
            <div className="overlay" />
          </div>
        ))}
      </div>

      <div className="container slider-content">
        <div className="hero-text-block">
          <div className={`text-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            <h1 dangerouslySetInnerHTML={{ __html: current.title }} />
            <p className="hero-subtitle">{current.subtitle}</p>
            
            <div className="hero-cta-wrapper">
              <Link href={current.link} className="btn-orange-large">
                Explore This Service →
              </Link>
            </div>
          </div>

          <div className="slider-indicators">
            {slides.map((_, index) => (
              <button 
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="hero-form-container">
          <div className="form-card">
            <h3>Get Free Consultation</h3>
            <p>Expert designers are just a click away.</p>
            <LeadForm source={`Hero Slider - ${current.id}`} ctaText="Get Free Consultation" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderHero;
