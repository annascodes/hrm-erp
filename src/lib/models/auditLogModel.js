import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String, // 'create_employee', 'approve_leave', etc.
  desc: String,
  target: String, // 'Employee', 'Leave'
  targetId: { type: mongoose.Schema.Types.ObjectId, refPath: 'target' },
  // timestamp: { type: Date, default: Date.now },
  meta: mongoose.Schema.Types.Mixed // extra info
}, {timestamps:true});

const AuditLog =  mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
