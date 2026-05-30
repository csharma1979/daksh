import "./testimonials.css";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getTestimonials } from "@/lib/actions/testimonials";
import TestimonialList from "@/components/admin/TestimonialList";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="admin-page-enhanced">
      <div className="admin-header-premium">
        <div className="header-info">
          <h1>Customer Voices</h1>
          <p>Review and amplify your client success stories.</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-add-premium">
          <Plus size={20} />
          <span>New Testimonial</span>
        </Link>
      </div>

      <TestimonialList initialTestimonials={testimonials} />
    </div>
  );
}
