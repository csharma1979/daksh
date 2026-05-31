"use server";

import dbConnect from "../mongodb";
import DesignGallery from "@/models/DesignGallery";
import DesignCategory from "@/models/DesignCategory";
import { revalidatePath } from "next/cache";

export async function getGalleries(filters: any = {}) {
  await dbConnect();
  const galleries = await DesignGallery.find(filters)
    .populate("categoryId", "name slug")
    .populate("subcategoryId", "name slug")
    .sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(galleries));
}

export async function getGalleriesByCategory(categoryId: string) {
  await dbConnect();
  const galleries = await DesignGallery.find({ categoryId, status: "Active" })
    .populate("subcategoryId", "name slug")
    .sort({ featured: -1, createdAt: -1 });
  return JSON.parse(JSON.stringify(galleries));
}

export async function createGallery(data: any) {
  await dbConnect();
  const newGallery = await DesignGallery.create(data);
  revalidatePath("/admin/media/design-ideas");
  
  // Revalidate public routes
  revalidatePath("/design-ideas");
  if (data.categoryId) {
    const category = await DesignCategory.findById(data.categoryId);
    if (category) {
      revalidatePath(`/design-ideas/${category.slug}`);
    }
  }
  return JSON.parse(JSON.stringify(newGallery));
}

export async function updateGallery(id: string, data: any) {
  await dbConnect();
  const updated = await DesignGallery.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/admin/media/design-ideas");
  
  // Revalidate public routes
  revalidatePath("/design-ideas");
  if (updated && updated.categoryId) {
    const category = await DesignCategory.findById(updated.categoryId);
    if (category) {
      revalidatePath(`/design-ideas/${category.slug}`);
    }
  }
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteGallery(id: string) {
  await dbConnect();
  const gallery = await DesignGallery.findById(id);
  await DesignGallery.findByIdAndDelete(id);
  revalidatePath("/admin/media/design-ideas");
  
  // Revalidate public routes
  revalidatePath("/design-ideas");
  if (gallery && gallery.categoryId) {
    const category = await DesignCategory.findById(gallery.categoryId);
    if (category) {
      revalidatePath(`/design-ideas/${category.slug}`);
    }
  }
  return { success: true };
}
