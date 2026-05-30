"use server";

import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function getTestimonials() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function createTestimonial(data: any) {
  try {
    await dbConnect();
    const testimonial = await Testimonial.create(data);
    return { success: true, testimonial: JSON.parse(JSON.stringify(testimonial)) };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    await dbConnect();
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
    return { success: true, testimonial: JSON.parse(JSON.stringify(testimonial)) };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { success: false, error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await dbConnect();
    await Testimonial.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return { success: false, error: "Failed to delete testimonial" };
  }
}
