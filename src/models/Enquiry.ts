import mongoose, { Schema } from "mongoose";

const EnquirySchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  location: { type: String },
  projectType: { type: String },
  propertyType: { type: String },
  budget: { type: String },
  message: { type: String },
  source: { type: String, default: "Website" },
  status: { type: String, enum: ["Unread", "Read", "Archived"], default: "Unread" },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
