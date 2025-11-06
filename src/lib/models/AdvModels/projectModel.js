import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  status: {
    type: String,
    enum: ["Planned", "In Progress", "Completed", "On Hold"],
    default: "Planned",
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
