import mongoose, { Schema } from "mongoose";

const PageSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: Schema.Types.Mixed, required: true }, // Flexible JSON for modular sections
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogTitle: String,
    ogImage: String,
  },
  status: { type: String, enum: ["Published", "Draft"], default: "Draft" },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model("Page", PageSchema);
