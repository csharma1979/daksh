"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import TrustStats from "@/components/TrustStats";
import FAQSection from "@/components/FAQSection";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import {
  Compass,
  Wind,
  Droplets,
  Flame,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layout,
  Sunrise,
  Zap,
  ChevronRight
} from "lucide-react";
import "./VastuTips.css";

// Standardized Gallery Items
const galleryItems = [
  {
    id: 1,
    category: "Residential",
    title: "Main Entrance",
    direction: "North or East",
    image: "/inspiration/vastu-hero.png",
    description: "The gateway for Prana. Correct alignment ensures prosperity and vitality."
  },
  {
    id: 2,
    category: "Residential",
    title: "Master Kitchen",
    direction: "South-East",
    image: "/inspiration/modular-kitchen.png",
    description: "The Agni corner. Optimized for family health and culinary energy."
  },
  {
    id: 3,
    category: "Residential",
    title: "Master Bedroom",
    direction: "South-West",
    image: "/inspiration/wardrobe.png",
    description: "The zone of stability. Rooted in the Nairutya corner for peace."
  },
  {
    id: 4,
    category: "Commercial",
    title: "Executive Cabin",
    direction: "South-West",
    image: "/inspiration/home-office.png",
    description: "The seat of authority. Engineered for strategic control and decision power."
  },
  {
    id: 5,
    category: "Commercial",
    title: "Office Entrance",
    direction: "North or East",
    image: "/inspiration/storage-units.png",
    description: "The vacuum for opportunities. Designed to attract new business flow."
  },
  {
    id: 6,
    category: "Commercial",
    title: "Finance Zone",
    direction: "North",
    image: "/inspiration/vastu-hero.png",
    description: "The prosperity hub. Aligned for smooth cash flow and financial growth."
  }
];

const categories = ["All", "Residential", "Commercial"];

const chakraDirections = [
  { id: "ne", label: "Ishanya (NE)", room: "Pooja/Study", element: "Water" },
  { id: "e", label: "Purva (E)", room: "Entrance", element: "Solar" },
  { id: "se", label: "Agneya (SE)", room: "Kitchen", element: "Fire" },
  { id: "s", label: "Dakshin (S)", room: "Bedroom", element: "Earth" },
  { id: "sw", label: "Nairutya (SW)", room: "Master Bed", element: "Earth" },
  { id: "w", label: "Pashchim (W)", room: "Dining", element: "Space" },
  { id: "nw", label: "Vayavya (NW)", room: "Guest/Store", element: "Air" },
  { id: "n", label: "Uttara (N)", room: "Safe/Living", element: "Water" }
];

const quickTips = [
  { title: "No Leaking Taps", description: "Water leakage represents financial loss in Vastu.", icon: <Droplets size={20} /> },
  { title: "North-East Slope", description: "A gentle slope towards the North-East brings prosperity.", icon: <Sparkles size={20} /> },
  { title: "Salt Water Mop", description: "Mopping with sea salt water removes negative energy.", icon: <Sparkles size={20} /> },
  { title: "Clear Center", description: "Keep the Brahmasthan center empty for energy circulation.", icon: <Layout size={20} /> }
];

const vastuFaqs = [
  {
    question: "Is Vastu necessary for a modern apartment?",
    answer: "While modern architecture often limits structural changes, Vastu principles can still be applied through furniture placement, color therapy, and symbolic corrections."
  },
  {
    question: "Which direction is best for a student's study table?",
    answer: "The best direction for a study table is East or North. The student should face either of these directions to enhance concentration."
  },
  {
    question: "How can I fix a Vastu defect without demolition?",
    answer: "Many 'Vastu Doshas' can be corrected using remedies like specialized mirrors, metallic pyramids, specific crystals, and color-coded zones."
  }
];

export default function VastuTipsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDirection, setSelectedDirection] = useState(chakraDirections[0]);
  const [showScorecard, setShowScorecard] = useState(false);
  const [checklist, setChecklist] = useState({ entrance: false, kitchen: false, bedroom: false, center: false });

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const toggleCheck = (id: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const score = Object.values(checklist).filter(Boolean).length * 25;

  return (
    <main className="vastu-page">
      <HeroBanner 
        title="Vastu Shastra <span class='text-orange'>Solutions</span>"
        subtitle="Optimize your home's energy without sacrificing style. Our Vastu solutions are engineered for maximum prosperity and spiritual harmony in Bangalore."
        backgroundImage="/inspiration/vastu-hero.png"
        breadcrumbCategory="Vastu Tips"
      />

      {/* Gallery Section - Direct like Storage Units */}
      <section className="gallery-section container py-24 bg-white">
        <div className="section-header">
           <h2>Design <span className="text-orange">Inspiration</span></h2>
           <p>Explore our range of specialized Vastu solutions, custom-built for every room in your home.</p>
        </div>

        <div className="filter-bar flex gap-4 mb-20">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn-premium ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="vastu-gallery-card group">
              <div className="vastu-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="direction-tag">{item.direction}</div>
                <div className="inspiration-info-box">
                  <div className="flex items-center mb-2">
                    <span className="category-dot" />
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{item.category}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Mandala Section (Moved down) */}
      <section id="interactive-tools" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="mandala-bg-accent"></div>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="mandala-visual relative z-10 flex justify-center">
              <div className="vastu-chakra-premium">
                <div className="chakra-center-glow">
                  <Compass className="text-orange animate-pulse-slow" size={60} />
                </div>
                {chakraDirections.map((dir, idx) => {
                  const angle = idx * 45;
                  return (
                    <div
                      key={dir.id}
                      className={`chakra-slice-premium ${selectedDirection.id === dir.id ? 'active' : ''}`}
                      style={{ transform: `rotate(${angle}deg)` }}
                      onClick={() => setSelectedDirection(dir)}
                    >
                      <div className="slice-content-premium" style={{ transform: `rotate(-${angle}deg)` }}>
                        <span className="dir-label-premium">{dir.id.toUpperCase()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="chakra-aura"></div>
            </div>

            <div className="mandala-info relative z-10">
              <div className="info-card-premium">
                <span className="text-orange font-bold uppercase tracking-widest text-[11px] bg-orange/10 px-4 py-1 rounded-full">{selectedDirection.element} Element</span>
                <h2 className="text-4xl font-black mt-8 mb-6 text-blue-dark leading-tight">{selectedDirection.label} <span className="text-orange">Alignment</span></h2>
                <p className="text-xl opacity-70 mb-10 leading-relaxed">
                  The {selectedDirection.id.toUpperCase()} corner radiates energy governed by divine elements. For optimal Vastu harmony, this zone is best for <strong>{selectedDirection.room}</strong>.
                </p>
                <div className="info-cta-box">
                  <button className="btn-modern-dark" onClick={() => setShowScorecard(true)}>
                    <span>Start Vastu Audit</span>
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vastu Scorecard */}
      {showScorecard && (
        <section id="vastu-audit" className="py-32 bg-white relative overflow-hidden">
          <div className="container relative z-10">
            <div className="scorecard-box-premium p-12 md:p-20 bg-gray-50 rounded-[64px]">
              <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
                <div className="text-left">
                  <h2 className="text-5xl font-black text-blue-dark mb-4">Vastu <span className="text-orange">Self-Audit</span></h2>
                  <p className="text-xl text-gray-500">Measure your home&apos;s energetic score in real-time.</p>
                </div>
                <div className="score-reveal">
                    <div className="score-circle-premium">
                        <span className="score-number">{score}%</span>
                        <span className="score-label">Aligned</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {[
                    { id: 'entrance', label: 'Entrance in North/East?', desc: 'The gateway for positive Prana energy.' },
                    { id: 'kitchen', label: 'Kitchen in South-East?', desc: 'Optimal placement for the Agni transition.' },
                    { id: 'bedroom', label: 'Master Bed in South-West?', desc: 'Ensures stability and restful sleep.' },
                    { id: 'center', label: 'Center Area Empty?', desc: 'Keeps the Brahmasthan clear for circulation.' }
                ].map((item) => (
                    <div 
                        key={item.id} 
                        className={`audit-card-premium ${checklist[item.id as keyof typeof checklist] ? 'active' : ''}`} 
                        onClick={() => toggleCheck(item.id as keyof typeof checklist)}
                    >
                        <div className="check-indicator">
                            {checklist[item.id as keyof typeof checklist] ? <CheckCircle2 size={32} /> : <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                        </div>
                        <div className="audit-text">
                            <h4>{item.label}</h4>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6">
                <a href="/contact" className="btn-modern-orange text-center">Consult Vastu Expert</a>
                <button className="text-gray-400 hover:text-blue-dark transition-colors font-bold uppercase tracking-widest text-xs" onClick={() => setShowScorecard(false)}>Reset Tool</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quality Section (Mahabhutas) */}
      <section className="quality-section bg-gray-50 py-32 relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="quality-text relative z-10">
            <span className="text-orange font-black uppercase tracking-[5px] text-xs mb-3 block">Five Elements</span>
            <h2 className="text-6xl font-black text-blue-dark mb-10 leading-none">Scientific <span className="text-orange">Ancestry</span></h2>
            <p className="text-xl opacity-70 mb-16 leading-relaxed">We balance the Five Mahabhutas to create a bio-energetic field that supports your growth, health, and spiritual prosperity.</p>

            <div className="mahabhuta-grid">
                {[
                    { title: "Agni (Fire)", desc: "Governs vitality, fame, and metabolic health. Optimized in the South-East zone.", icon: <Flame />, code: "AG-01" },
                    { title: "Jala (Water)", desc: "Symbolizes wealth flow and spiritual clarity. Aligned with the North-East.", icon: <Droplets />, code: "JL-02" },
                    { title: "Vayu (Air)", desc: "Drives movement, communication, and social energy. Optimized in the North-West.", icon: <Wind />, code: "VY-03" }
                ].map((element, idx) => (
                    <div key={idx} className="element-card-premium group">
                        <div className="element-icon-box">{element.icon}</div>
                        <div>
                            <span className="scientific-meta">{element.code} // Elemental Field</span>
                            <h4 className="text-2xl font-black text-blue-dark mb-2">{element.title}</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">{element.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
          <div className="quality-image-wrapper relative">
            <div className="image-scientific-border" />
            <div className="relative h-[650px] rounded-[100px] overflow-hidden border-[15px] border-white shadow-2xl z-10">
              <Image
                src="/inspiration/vastu-hero.png"
                alt="Vastu Elemental Science"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="wisdom-section-wrapper py-32">
        <div className="energy-surge-bg" />
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-orange font-black uppercase tracking-[5px] text-xs mb-3 block">Daily Wisdom</span>
              <h2 className="text-6xl font-black text-blue-dark leading-none">Energy <span className="text-orange">Elevators</span></h2>
              <p className="mt-6 opacity-60 text-lg font-light leading-relaxed">Non-structural micro-changes for immediate energetic impact in any apartment or villa.</p>
            </div>
            <a href="/contact" className="btn-modern-outline">Expert Advisory <ArrowRight size={20} className="ml-3" /></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickTips.map((tip, idx) => (
              <div key={idx} className="glass-tip-card group">
                <div className="tip-number">0{idx + 1}</div>
                <div className="tip-icon-box">{tip.icon}</div>
                <span className="tip-vibe-badge">+15% Spectral Balance</span>
                <h4 className="text-2xl font-black text-blue-dark mb-4">{tip.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm font-light">{tip.description}</p>
                <div className="tip-decoration-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DesignSessionCTA 
        heading="Book a <span class='text-orange'>Vastu Consultation</span>"
        subheading="Get expert guidance on how to align your home for prosperity and well-being without structural changes."
        buttonText="Book Free Vastu Audit"
      />
      <TrustStats />

      <FAQSection
        items={vastuFaqs}
        title="Vastu Intelligence"
        subtitle="Common questions about our modern Vastu-integrated design philosophy."
      />

    </main>
  );
}
