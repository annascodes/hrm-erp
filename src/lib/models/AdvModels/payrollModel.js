import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  payDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Payroll = mongoose.models.Payroll || mongoose.model("Payroll", payrollSchema);
export default Payroll;
