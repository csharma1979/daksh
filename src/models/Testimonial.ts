import mongoose, { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  avatar: { type: String },
  isPublished: { type: Boolean, default: true },
}, { 
  timestamps: true 
});

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);

export default Testimonial;
