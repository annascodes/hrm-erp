import mongoose from "mongoose";

const leaveBalanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  annual: { type: Number, default: 0 },
  sick: { type: Number, default: 0 },
  casual: { type: Number, default: 0 },
  unpaid: { type: Number, default: 0 },
}, { timestamps: true });

const LeaveBalance =  mongoose.models.LeaveBalance || mongoose.model('LeaveBalance', leaveBalanceSchema);

export default LeaveBalance;
