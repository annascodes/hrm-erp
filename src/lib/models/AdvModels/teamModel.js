import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
}, { timestamps: true });

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export default Team;
