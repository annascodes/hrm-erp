import mongoose from "mongoose";

const performanceReviewSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // manager/hr
  reviewDate: { type: Date, default: Date.now },
  rating: { type: Number, min: 1, max: 5, required: true },
  feedback: String,
  goals: String,
}, { timestamps: true });

const PerformanceReview = mongoose.models.PerformanceReview || mongoose.model("PerformanceReview", performanceReviewSchema);
export default PerformanceReview;
