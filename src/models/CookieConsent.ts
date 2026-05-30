import mongoose, { Schema, Document } from "mongoose";

export interface ICookieConsent extends Document {
  email?: string;
  ipAddress: string;
  userAgent: string;
  consent: "Accepted" | "Rejected";
  createdAt: Date;
}

const CookieConsentSchema: Schema = new Schema({
  email: { type: String, required: false },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  consent: { type: String, enum: ["Accepted", "Rejected"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CookieConsent || mongoose.model<ICookieConsent>("CookieConsent", CookieConsentSchema);
