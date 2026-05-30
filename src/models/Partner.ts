import mongoose, { Schema } from "mongoose";

const PartnerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  profession: { type: String, required: true },
  experience: { type: String },
  portfolio: { type: String },
  status: { type: String, enum: ["Pending", "Reviewed", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);
