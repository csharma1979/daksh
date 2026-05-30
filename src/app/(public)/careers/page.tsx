import { getJobs } from "@/lib/actions/jobs";
import JobBoard from "@/components/public/JobBoard";
import "./careers.css";

export default async function CareersPage() {
  const jobs = await getJobs(true);

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="container">
          <div className="hero-content">
            <span className="subtitle">Join Our Vision</span>
            <h1>Build a Career in <br/><span className="text-orange">Premium Interiors</span></h1>
            <p>We are a team of visionary designers, architects, and builders dedicated to transforming living spaces into works of art.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-careers">
        <div className="container">
          <div className="grid-2">
            <div className="about-text">
              <h2>Why Daksh Interiors?</h2>
              <p>At Daksh, we don't just build homes; we build dreams. We believe in creativity, integrity, and the pursuit of excellence. Join us and be part of a culture that celebrates innovation and rewards hard work.</p>
              
              <ul className="benefits-list">
                <li>🎨 Creative Freedom & Innovation</li>
                <li>🤝 Collaborative Culture</li>
                <li>🚀 Accelerated Growth Paths</li>
                <li>🌍 Work on Prestigious Projects</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Work Environment" />
            </div>
          </div>
        </div>
      </section>

      <section className="job-board-section">
        <div className="container">
          <div className="section-header">
            <h2>Current <span className="text-orange">Openings</span></h2>
            <p>Explore our active roles and find your perfect fit.</p>
          </div>
          
          <JobBoard initialJobs={jobs} />
        </div>
      </section>
    </div>
  );
}
