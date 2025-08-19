import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['admin', 'hr', 'employee'] // or dynamic
  },
  permissions: [{
    module: String,      // e.g., 'leave', 'employee'
    access: [String],    // e.g., ['create', 'read', 'update', 'delete']
  }],
}, { timestamps: true });

const Role =  mongoose.models.Role || mongoose.model('Role', roleSchema);
export default Role;
