import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    profileImg: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg'
    },
    role: {
        type: String,
        enum: ['admin', 'hr', 'employee'],
        default: 'employee',
    },
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee' 
    }, // optional, if user is also an employee
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User;
