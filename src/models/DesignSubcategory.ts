import mongoose, { Schema, Document } from "mongoose";

export interface IDesignSubcategory extends Document {
  categoryId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  sortOrder: number;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const DesignSubcategorySchema: Schema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "DesignCategory", required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

// Ensure slugs are unique per category
DesignSubcategorySchema.index({ categoryId: 1, slug: 1 }, { unique: true });

export default mongoose.models.DesignSubcategory ||
  mongoose.model<IDesignSubcategory>("DesignSubcategory", DesignSubcategorySchema);
