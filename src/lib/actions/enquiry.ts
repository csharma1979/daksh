"use server";

import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import Partner from "@/models/Partner";
import { revalidatePath } from "next/cache";

export async function submitEnquiry(data: any) {
  try {
    await dbConnect();
    await Enquiry.create(data);
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function submitPartnerRequest(data: any) {
  try {
    await dbConnect();
    await Partner.create(data);
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/partners");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEnquiryStatus(id: string, status: string) {
  try {
    await dbConnect();
    await Enquiry.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePartnerStatus(id: string, status: string) {
  try {
    await dbConnect();
    await Partner.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/partners");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
