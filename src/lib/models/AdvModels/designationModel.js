import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // e.g. "Software Engineer"
  description: String,
  level: { type: String, enum: ["Junior", "Mid", "Senior", "Lead", "Manager"], default: "Junior" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // optional link
  salaryRange: {
    min: Number,
    max: Number,
  },
}, { timestamps: true });

const Designation = mongoose.models.Designation || mongoose.model("Designation", designationSchema);
export default Designation;
