"use server";

import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";
import { revalidatePath } from "next/cache";

export async function getJobs(activeOnly = false) {
  try {
    await dbConnect();
    const query = activeOnly ? { isActive: true } : {};
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(jobs));
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return [];
  }
}

export async function getJobById(id: string) {
  try {
    await dbConnect();
    const job = await Job.findById(id);
    return JSON.parse(JSON.stringify(job));
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    return null;
  }
}

export async function addJob(data: any) {
  try {
    await dbConnect();
    const job = await Job.create(data);
    revalidatePath("/admin/jobs");
    revalidatePath("/careers");
    return { success: true, job: JSON.parse(JSON.stringify(job)) };
  } catch (err) {
    console.error("Error adding job:", err);
    return { success: false, error: "Failed to add job" };
  }
}

export async function updateJob(id: string, data: any) {
  try {
    await dbConnect();
    const job = await Job.findByIdAndUpdate(id, data, { new: true });
    if (!job) return { success: false, error: "Job not found" };
    revalidatePath("/admin/jobs");
    revalidatePath("/careers");
    return { success: true, job: JSON.parse(JSON.stringify(job)) };
  } catch (err) {
    console.error("Error updating job:", err);
    return { success: false, error: "Failed to update job" };
  }
}

export async function deleteJob(id: string) {
  try {
    await dbConnect();
    await Job.findByIdAndDelete(id);
    revalidatePath("/admin/jobs");
    revalidatePath("/careers");
    return { success: true };
  } catch (err) {
    console.error("Error deleting job:", err);
    return { success: false, error: "Failed to delete job" };
  }
}
