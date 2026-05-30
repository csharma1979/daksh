const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
  status: { type: String, enum: ["Published", "Draft"], default: "Draft" },
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model("Page", PageSchema);

const pagesData = [
  {
    title: "Home",
    slug: "home",
    status: "Published",
    seo: {
      title: "Daksh Interiors | Dream Home Starts Here",
      description: "India's most trusted home interior brand. We design, manufacture and install with precision.",
      keywords: ["interior design", "home decor", "modular kitchen", "bangalore"]
    },
    content: {
      hero: {
        title: "Dream Home Starts Here",
        subtitle: "India's most trusted home interior brand. We design, manufacture and install with precision.",
        badges: ["⭐ 4.8/5 Rated", "📅 45-Day Delivery", "🛡️ 10-Year Warranty"],
        image: "/hero-bg.jpg"
      },
      services: {
        title: "One-stop shop for all things interiors",
        subtitle: "Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office.",
        items: [
          { title: "Modular Interiors", desc: "Functional kitchen, wardrobe and storage", image: "/modular-interiors.png", link: "/services/modular" },
          { title: "Full Home Interiors", desc: "Turnkey interior solutions for your home", image: "/full-home.png", link: "/services/full-home" },
          { title: "Luxury Interiors", desc: "Tailored interiors that redefine elegance", image: "/luxury.png", link: "/services/luxury" },
          { title: "Renovations", desc: "Expert solutions to upgrade your home", image: "/renovations.png", link: "/services/renovation" }
        ]
      },
      projects: {
        title: "Real Homes by Daksh Interiors",
        subtitle: "Explore our recently completed projects that redefine urban living.",
        items: [
          { title: "Modern Minimalist Villa", location: "DLF Phase 5, Gurugram", image: "/projects/villa.png", tags: ["Luxury", "Full Home"] },
          { title: "Scandinavian Penthouse", location: "Indiranagar, Bangalore", image: "/projects/penthouse.png", tags: ["Modular", "Modern"] },
          { title: "Urban Chic Apartment", location: "Whitefield, Bangalore", image: "/projects/apartment.png", tags: ["Compact", "Functional"] }
        ]
      }
    }
  },
  {
    title: "Partner With Us",
    slug: "partner-with-us",
    status: "Published",
    seo: {
      title: "Partner With Us | Join Daksh Interiors Network",
      description: "Collaborate with Daksh Interiors. We provide the manufacturing and execution support for your design business.",
      keywords: ["interior design partner", "architect collaboration", "design business"]
    },
    content: {
      hero: {
        title: "Empowering Independent Designers",
        subtitle: "Scale your business with India's most advanced manufacturing backend and turnkey execution support.",
        image: "/partner-hero.png"
      },
      benefits: {
        title: "Why Partner with Daksh?",
        subtitle: "We provide the tools and execution power so you can focus on what you do best: Designing.",
        items: [
          { icon: "🚀", title: "Fastest Execution", desc: "Industry-leading 45-day delivery guarantee from factory to finish." },
          { icon: "💰", title: "Lucrative Earnings", desc: "Earn high referral commissions or enjoy bulk pricing for your projects." },
          { icon: "💎", title: "Premium Quality", desc: "Access to German-engineered hardware and ISO-certified manufacturing." },
          { icon: "🛠️", title: "Turnkey Support", desc: "We handle civil, electrical, plumbing, and site management for you." }
        ]
      }
    }
  },
  {
    title: "Contact",
    slug: "contact",
    status: "Published",
    seo: {
      title: "Contact Us | Get in Touch with Daksh Interiors",
      description: "Ready to design your dream home? Reach out to us for a free consultation today.",
      keywords: ["contact interior designer", "bangalore studio", "interior consultation"]
    },
    content: {
      hero: {
        title: "Let’s Design Your Dream Space",
        subtitle: "Have a project in mind? Whether it's home interiors, office design, or turnkey execution — we’re here to bring your vision to life.",
        image: "/contact-hero.png"
      },
      details: {
        address: "No. XX, 2nd Floor, Main Road, Whitefield, Bangalore – 560066",
        phone: "+91 98765 43210",
        email: "hello@dakshinteriors.com",
        hours: "Mon – Sat: 10 AM – 7 PM"
      }
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    for (const page of pagesData) {
      await Page.findOneAndUpdate(
        { slug: page.slug },
        page,
        { upsert: true, new: true }
      );
      console.log(`Seeded page: ${page.title}`);
    }

    console.log("Content seeding complete.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
