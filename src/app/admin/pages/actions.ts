"use server";

import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";
import { revalidatePath } from "next/cache";

export async function updatePage(id: string, data: any) {
  try {
    await dbConnect();
    await Page.findByIdAndUpdate(id, data);
    revalidatePath("/admin/pages");
    revalidatePath(`/admin/pages/${id}`);
    revalidatePath("/"); // Revalidate home
    revalidatePath("/partner-with-us");
    revalidatePath("/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePage(id: string) {
  try {
    await dbConnect();
    await Page.findByIdAndDelete(id);
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
