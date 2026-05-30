import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected to MongoDB");

  const email = "support@dakshinteriors.in";
  const password = "Omprakash@123#";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    existingUser.password = hashedPassword;
    await existingUser.save();
    console.log("Updated existing admin user");
  } else {
    await User.create({
      name: "Daksh Admin",
      email,
      password: hashedPassword,
      role: "admin"
    });
    console.log("Created new admin user");
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

seed().catch(err => console.error(err));
