"use server";

import dbConnect from "../mongodb";
import DesignCategory from "@/models/DesignCategory";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  await dbConnect();
  const categories = await DesignCategory.find().sort({ sortOrder: 1 });
  return JSON.parse(JSON.stringify(categories));
}

export async function getCategoryBySlug(slug: string) {
  await dbConnect();
  const category = await DesignCategory.findOne({ slug });
  return JSON.parse(JSON.stringify(category));
}

export async function createCategory(data: any) {
  await dbConnect();
  const newCat = await DesignCategory.create(data);
  revalidatePath("/admin/media/design-ideas");
  revalidatePath("/design-ideas");
  return JSON.parse(JSON.stringify(newCat));
}

export async function updateCategory(id: string, data: any) {
  await dbConnect();
  const updated = await DesignCategory.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/admin/media/design-ideas");
  revalidatePath("/design-ideas");
  if (updated) {
    revalidatePath(`/design-ideas/${updated.slug}`);
  }
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteCategory(id: string) {
  await dbConnect();
  await DesignCategory.findByIdAndDelete(id);
  // Optional: Also delete related subcategories and galleries, but handled separately usually
  revalidatePath("/admin/media/design-ideas");
  revalidatePath("/design-ideas");
  return { success: true };
}
