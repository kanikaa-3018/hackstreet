import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    batch: { type: String, required: true },
    phone: { type: Number, required: true },
    position: { type: String, required: true },
    currentLocation: { type: String, required: true },
    company: { type: String, required: true },
    bio: { type: String },
    linkedin: { type: String, default: "", required: false },
    instagram: { type: String, default: "", required: false },
    profileImage: { type: String, default: "" , },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alumni" }], 
  },
  { timestamps: true }
); 

export default mongoose.model("Alumni", alumniSchema);
