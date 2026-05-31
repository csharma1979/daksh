"use server";

import dbConnect from "../mongodb";
import DesignSubcategory from "@/models/DesignSubcategory";
import { revalidatePath } from "next/cache";

export async function getSubcategories(categoryId?: string) {
  await dbConnect();
  const filter = categoryId ? { categoryId } : {};
  const subs = await DesignSubcategory.find(filter).sort({ sortOrder: 1 }).populate("categoryId", "name slug");
  return JSON.parse(JSON.stringify(subs));
}

export async function createSubcategory(data: any) {
  await dbConnect();
  const newSub = await DesignSubcategory.create(data);
  revalidatePath("/admin/media/design-ideas");
  return JSON.parse(JSON.stringify(newSub));
}

export async function updateSubcategory(id: string, data: any) {
  await dbConnect();
  const updated = await DesignSubcategory.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/admin/media/design-ideas");
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteSubcategory(id: string) {
  await dbConnect();
  await DesignSubcategory.findByIdAndDelete(id);
  revalidatePath("/admin/media/design-ideas");
  return { success: true };
}
