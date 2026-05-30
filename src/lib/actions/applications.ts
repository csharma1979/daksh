"use server";

import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";
import { revalidatePath } from "next/cache";

export async function getApplications(jobId?: string) {
  try {
    await dbConnect();
    const query = jobId ? { jobId } : {};
    const apps = await Application.find(query).populate('jobId', 'title').sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(apps));
  } catch (err) {
    console.error("Error fetching applications:", err);
    return [];
  }
}

export async function submitApplication(data: any) {
  try {
    await dbConnect();
    const app = await Application.create(data);
    revalidatePath("/admin/applications");
    return { success: true, application: JSON.parse(JSON.stringify(app)) };
  } catch (err) {
    console.error("Error submitting application:", err);
    return { success: false, error: "Failed to submit application" };
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await dbConnect();
    const app = await Application.findByIdAndUpdate(id, { status }, { new: true });
    if (!app) return { success: false, error: "Application not found" };
    revalidatePath("/admin/applications");
    return { success: true, application: JSON.parse(JSON.stringify(app)) };
  } catch (err) {
    console.error("Error updating status:", err);
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateApplicationNotes(id: string, internalNotes: string) {
  try {
    await dbConnect();
    const app = await Application.findByIdAndUpdate(id, { internalNotes }, { new: true });
    if (!app) return { success: false, error: "Application not found" };
    revalidatePath("/admin/applications");
    return { success: true, application: JSON.parse(JSON.stringify(app)) };
  } catch (err) {
    console.error("Error updating notes:", err);
    return { success: false, error: "Failed to update notes" };
  }
}

export async function deleteApplication(id: string) {
  try {
    await dbConnect();
    await Application.findByIdAndDelete(id);
    revalidatePath("/admin/applications");
    return { success: true };
  } catch (err) {
    console.error("Error deleting application:", err);
    return { success: false, error: "Failed to delete" };
  }
}
