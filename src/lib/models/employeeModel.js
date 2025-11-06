import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeCode: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  address: String,
  dateOfBirth: Date,
  hireDate: { type: Date, required: true },
  
  jobTitle: String,
  department: String,
  salary: Number,
  status: {
    type: String,
    enum: ['Active', 'On Leave', 'Terminated'],
    default: 'Active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,

  }
}, { timestamps: true });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;