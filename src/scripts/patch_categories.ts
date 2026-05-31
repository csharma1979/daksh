import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

import DesignCategory from "../models/DesignCategory";

const requiredCategories = [
  { name: "Living Room", slug: "living-room", heroImage: "/inspiration/living-room.png" },
  { name: "Bedroom", slug: "bedroom", heroImage: "/inspiration/master-bedroom.png" },
  { name: "Modular Kitchen", slug: "modular-kitchen", heroImage: "/inspiration/modular-kitchen.png" },
  { name: "Wardrobe", slug: "wardrobe", heroImage: "/inspiration/wardrobe.png" },
  { name: "Bathroom", slug: "bathroom", heroImage: "/inspiration/bathroom.png" },
  { name: "Kids Room", slug: "kids-room", heroImage: "/artifacts/kids_adventure_room_1775013751006.png" },
  { name: "Full Kitchen Designs", slug: "full-kitchen-designs", heroImage: "/inspiration/modular-kitchen.png" },
  { name: "Wardrobe Designs", slug: "wardrobe-designs", heroImage: "/inspiration/wardrobe.png" },
  { name: "TV Units & Storage", slug: "tv-units-and-storage", heroImage: "/inspiration/living-room.png" },
  { name: "False Ceiling", slug: "false-ceiling", heroImage: "/inspiration/master-bedroom.png" },
  { name: "Pooja Room", slug: "pooja-room", heroImage: "/inspiration/living-room.png" },
  { name: "Trending Designs", slug: "trending-designs", heroImage: "/design-ideas/trending-hero.png" },
  { name: "Vastu Tips", slug: "vastu-tips", heroImage: "/inspiration/living-room.png" }
];

async function updateCategories() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB for patching categories.");

  // 1. Rename existing ones if needed
  await DesignCategory.updateOne({ slug: "trending" }, { $set: { name: "Trending Designs", slug: "trending-designs" } });
  
  // They said "Wardrobe" instead of "Wardrobes"
  await DesignCategory.updateOne({ slug: "wardrobe" }, { $set: { name: "Wardrobe" } });

  // Wait, if "Home Office" is not in the list, do we disable it or leave it?
  // "The complete category list should be:" implies exact match. 
  // Let's set Home Office to Inactive so it doesn't show on the frontend but data is kept.
  await DesignCategory.updateOne({ slug: "home-office" }, { $set: { status: "Inactive" } });

  // 2. Upsert all the required categories
  let sortOrder = 1;
  for (const rc of requiredCategories) {
    const existing = await DesignCategory.findOne({ slug: rc.slug });
    if (!existing) {
      console.log(`Creating new category: ${rc.name}`);
      await DesignCategory.create({
        name: rc.name,
        slug: rc.slug,
        sortOrder: sortOrder,
        status: "Active",
        heroImage: rc.heroImage,
        heroTitle: `${rc.name} <span class='text-orange'>Design Ideas</span>`,
        heroSubtitle: `Explore our curated gallery for ${rc.name} designs.`
      });
    } else {
      console.log(`Updating existing category: ${rc.name}`);
      await DesignCategory.updateOne({ _id: existing._id }, { $set: { sortOrder, status: "Active" } });
    }
    sortOrder++;
  }

  console.log("Patching complete.");
  process.exit(0);
}

updateCategories().catch(console.error);
