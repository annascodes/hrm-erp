import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  startDate: { type: Date, required: true },
  endDate: Date,
  status: {
    type: String,
    enum: ["Planned", "Ongoing", "Completed"],
    default: "Planned",
  },
}, { timestamps: true });

const Training = mongoose.models.Training || mongoose.model("Training", trainingSchema);
export default Training;
