import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    leaveType: {
        type: String,
        enum: ['Sick Leave', 'Annual Leave', 'Casual Leave', 'Unpaid Leave'],
        required: true
    },
    startDate: { 
        type: Date, 
        required: true
     },
    endDate: { 
        type: Date, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true
     },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    approver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    rejectionReason: String
}, { timestamps: true });

const Leave = mongoose.models.Leave || mongoose.model('Leave', leaveSchema);
export default Leave;
