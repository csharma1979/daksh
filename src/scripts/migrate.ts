import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Adjust path to find .env.local
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

import DesignCategory from "../models/DesignCategory";
import DesignSubcategory from "../models/DesignSubcategory";
import DesignGallery from "../models/DesignGallery";

const mainCategories = [
  {
    title: "Trending 2026",
    slug: "trending",
    heroImage: "/design-ideas/trending-hero.png",
    heroTitle: "Trending 2026 Interior <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Explore the latest luxury forecasts and modern evolutions for Indian homes.",
  },
  {
    title: "Living Room",
    slug: "living-room",
    heroImage: "/inspiration/living-room.png",
    heroTitle: "Living Room Interior <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Explore our curated gallery of award-winning living room designs in Bangalore.",
  },
  {
    title: "Modular Kitchen",
    slug: "modular-kitchen",
    heroImage: "/inspiration/modular-kitchen.png",
    heroTitle: "Modular Kitchen <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Ergonomic, easy-to-clean, and high-tech culinary spaces.",
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    heroImage: "/inspiration/master-bedroom.png",
    heroTitle: "Bedroom Interior <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Relaxing sanctuaries and space-optimized master suites.",
  },
  {
    title: "Wardrobes",
    slug: "wardrobe",
    heroImage: "/inspiration/wardrobe.png",
    heroTitle: "Wardrobe <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Bespoke storage solutions from walk-in closets to sliding systems.",
  },
  {
    title: "Home Office",
    slug: "home-office",
    heroImage: "/inspiration/home-office.png",
    heroTitle: "Home Office <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Productivity-optimized workspaces built for the modern professional.",
  },
  {
    title: "Bathroom",
    slug: "bathroom",
    heroImage: "/inspiration/bathroom.png",
    heroTitle: "Bathroom <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Spa-like luxury and functional transformations for wet areas.",
  },
  {
    title: "Kids Room",
    slug: "kids-room",
    heroImage: "/artifacts/kids_adventure_room_1775013751006.png",
    heroTitle: "Kids Room <span class='text-orange'>Design Ideas</span>",
    heroSubtitle: "Imaginative sanctuaries from rocket-ship bunks to creative play zones.",
  }
];

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  // Clear existing to avoid duplicates if rerun
  await DesignGallery.deleteMany({});
  await DesignSubcategory.deleteMany({});
  await DesignCategory.deleteMany({});
  
  const extractedPath = path.join(__dirname, 'extracted_data.json');
  const extractedData = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

  let sortOrder = 1;
  for (const mc of mainCategories) {
    const cat = await DesignCategory.create({
      name: mc.title,
      slug: mc.slug,
      sortOrder: sortOrder++,
      status: "Active",
      heroImage: mc.heroImage,
      heroTitle: mc.heroTitle,
      heroSubtitle: mc.heroSubtitle
    });
    console.log(`Created Category: ${cat.name}`);

    const extData = extractedData.find((e: any) => e.slug === mc.slug);
    if (!extData) continue;

    // Create subcategories
    const subcatsMap: any = {};
    let subSort = 1;
    for (const sub of extData.subcategories) {
      const subDoc = await DesignSubcategory.create({
        categoryId: cat._id,
        name: sub,
        slug: sub.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sortOrder: subSort++,
        status: "Active"
      });
      subcatsMap[sub] = subDoc._id;
    }
    
    // Create items
    for (const item of extData.items) {
      // If a category didn't match a created subcategory (e.g. no subcategories array but items have categories)
      let subId = subcatsMap[item.category];
      if (!subId && item.category) {
         const newSub = await DesignSubcategory.create({
            categoryId: cat._id,
            name: item.category,
            slug: item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            sortOrder: subSort++,
            status: "Active"
         });
         subcatsMap[item.category] = newSub._id;
         subId = newSub._id;
      }
      
      await DesignGallery.create({
        categoryId: cat._id,
        subcategoryId: subId,
        title: item.title,
        description: item.description,
        images: [item.image],
        featuredImage: item.image,
        featured: false,
        status: "Active"
      });
    }
    console.log(` Migrated items for ${cat.name}`);
  }

  console.log("Migration Complete.");
  process.exit(0);
}

migrate().catch(console.error);
