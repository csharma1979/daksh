"use server";

import dbConnect from "../mongodb";
import DesignGallery from "@/models/DesignGallery";
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
  return JSON.parse(JSON.stringify(newGallery));
}

export async function updateGallery(id: string, data: any) {
  await dbConnect();
  const updated = await DesignGallery.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/admin/media/design-ideas");
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteGallery(id: string) {
  await dbConnect();
  await DesignGallery.findByIdAndDelete(id);
  revalidatePath("/admin/media/design-ideas");
  return { success: true };
}
