import { shadowAround } from "@/lib/helperFunctions";
import { FiUser, FiMail, FiPhone, FiHome, FiCalendar, FiBriefcase, FiDollarSign, FiLayers } from "react-icons/fi";

export default function EmployeeCard({ employee }) {
    return (
        <div

            className={`flex flex-col gap-3 p-4  rounded-2xl  bg-white border-2 border-gray-100 m-5  ${shadowAround}`}>
            <h1 className="btn btn-primary btn-xs tracking-wider  cursor-default  text-sm">
                        Employee card
                    </h1>



            {/* FUll name */}
            <div className="flex flex-row items-center gap-3">
                <FiUser className="text-xl" />
                <span className="font-medium ">Fullname:</span>
                <span>  {employee.firstName} {employee.lastName}</span>
            </div>

            {/* Employee Code */}
            <div className="flex flex-row items-center gap-3">
                <FiLayers className="text-xl" />
                <span className="font-medium ">Code:</span>
                <span>{employee.employeeCode}</span>
            </div>

            {/* Email */}
            <div className="flex flex-row items-center gap-3">
                <FiMail className="text-xl" />
                <span className="font-medium">Email:</span>
                <span>{employee.email}</span>
            </div>

            {/* Phone */}
            <div className="flex flex-row items-center gap-3">
                <FiPhone className="text-xl" />
                <span className="font-medium">Phone:</span>
                <span>{employee.phoneNumber || "—"}</span>
            </div>

            {/* Address */}
            <div className="flex flex-row items-center gap-3">
                <FiHome className="text-xl" />
                <span className="font-medium">Address:</span>
                <span>{employee.address || "—"}</span>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-row items-center gap-3">
                <FiCalendar className="text-xl" />
                <span className="font-medium">DOB:</span>
                <span>{employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : "—"}</span>
            </div>

            {/* Hire Date */}
            <div className="flex flex-row items-center gap-3">
                <FiCalendar className="text-xl" />
                <span className="font-medium">Hire Date:</span>
                <span>{new Date(employee.hireDate).toLocaleDateString()}</span>
            </div>

            {/* Job Title */}
            <div className="flex flex-row items-center gap-3">
                <FiBriefcase className="text-xl" />
                <span className="font-medium">Job:</span>
                <span>{employee.jobTitle || "—"}</span>
            </div>

            {/* Department */}
            <div className="flex flex-row items-center gap-3">
                <FiLayers className="text-xl" />
                <span className="font-medium">Dept:</span>
                <span>{employee.department || "—"}</span>
            </div>

            {/* Salary */}
            <div className="flex flex-row items-center gap-3">
                <FiDollarSign className="text-xl" />
                <span className="font-medium">Salary:</span>
                <span>{employee.salary ? `$${employee.salary}` : "—"}</span>
            </div>

            {/* Status */}
            <div className="flex flex-row items-center gap-3">
                <FiUser className="text-xl" />
                <span className="font-medium">Status:</span>
                <span>{employee.status}</span>
            </div>
        </div>
    );
}
