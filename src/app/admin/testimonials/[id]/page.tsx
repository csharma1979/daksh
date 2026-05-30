import TestimonialForm from "@/components/admin/TestimonialForm";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const testimonial = await Testimonial.findById(params.id);

  if (!testimonial) notFound();

  return <TestimonialForm initialData={JSON.parse(JSON.stringify(testimonial))} />;
}
