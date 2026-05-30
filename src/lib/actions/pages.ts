"use server";

import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export async function getPagesList() {
  try {
    await dbConnect();
    const pages = await Page.find({}, 'title slug _id').sort({ title: 1 });
    return JSON.parse(JSON.stringify(pages));
  } catch (error) {
    console.error("Error fetching pages list:", error);
    return [];
  }
}

export async function getPageById(id: string) {
  try {
    await dbConnect();
    const page = await Page.findById(id);
    return JSON.parse(JSON.stringify(page));
  } catch (error) {
    console.error("Error fetching page by ID:", error);
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    await dbConnect();
    const page = await Page.findOne({ slug });
    return JSON.parse(JSON.stringify(page));
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

export async function updatePage(id: string, data: any) {
  try {
    await dbConnect();
    const updatedPage = await Page.findByIdAndUpdate(id, data, { new: true });
    return { success: true, page: JSON.parse(JSON.stringify(updatedPage)) };
  } catch (error) {
    console.error("Error updating page:", error);
    return { success: false, error: "Failed to update page" };
  }
}
