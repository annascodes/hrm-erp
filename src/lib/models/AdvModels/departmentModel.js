import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Department Head
}, { timestamps: true });

const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);
export default Department;
