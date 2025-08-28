import { dbConnect } from "@/lib/dbConnection";
import { verifyAuth } from "@/lib/middleware/verifyAuth";
import AuditLog from "@/lib/models/auditLogModel";
import Employee from "@/lib/models/employeeModel";
import LeaveBalance from "@/lib/models/leaveBalanceModel";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    const { userId } = await params;
    const body = await req.json()


    const auth = await verifyAuth()
    if (!auth || (auth.role !== 'admin' && auth.role !== 'hr'))
        return NextResponse.json({ error: 'Neither admin nor hr' }, { status: 403 })

    await dbConnect()

    const isAlreadyEmp = await Employee.findOne({ userId })
    if (isAlreadyEmp) return NextResponse.json({ error: 'Already employee id has assigned' }, { status: 403 })
    // console.log(body)


    const newEmployee = new Employee({ ...body, userId, createdBy: auth.id })
    try {
        await newEmployee.save()
        // console.log("Employee saved:", newEmployee)
    } catch (err) {
        console.error("Error saving employee:", err)
        return NextResponse.json({ error: "Failed to save employee" }, { status: 500 })
    }


    const updateUser = await User.findOneAndUpdate(
        {
            _id: userId
        },
        {
            employeeId: newEmployee._id
        },
        { new: true }

    )
    const newLeaveBalance = new LeaveBalance(
        {
            employee: newEmployee._id
        }
    )
    try {
        await newLeaveBalance.save()
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Err in initializing leaveBalance for emplooye' }, { state: 500 })
    }

    if (!updateUser) return NextResponse.json({ error: 'Err in updating user after creating employee id' }, { status: 500 })

    const { password, ...restUser } = updateUser._doc;

    const audit = new AuditLog(
        {
            user: auth.id,
            action: 'Employee created',
            desc: `${auth.role} assigned the employee id to ${updateUser.username} `,
            target: "Employee",
            targetId: newEmployee._id


        }
    )

    try {
        await audit.save()
    } catch (error) {
        return NextResponse.json({error: 'err in saving audit in employee/[userId]/route.js'},{status: 500})
    }
    return NextResponse.json({ updateUser: restUser, newLeaveBalance })
}


export async function PUT(req, {params}) {
    const auth = await verifyAuth()
    const authUser = await User.findById(auth.id)
    if (!authUser) return NextResponse.json({error: 'auth user did not find'}, {status: 404})
    const {userId} =  await params;

    if(!(auth.role ==='admin' || auth.role ==='hr' || auth.id === userId.toString()))
        return NextResponse.json({error: 'Not authorized to this action.'}, {status: 409})

    const body = await  req.json()
    await dbConnect()
    const employee = await Employee.findOne({userId})
    if(!employee)
        return NextResponse.json({error: 'No employee found under this userId'}, {status: 404})

    const UpdEmp = await Employee.findByIdAndUpdate(
        employee._id,
        {
            $set:{
                ...(body.firstName && {firstName : body.firstName}),
                ...(body.lastName && {lastName : body.lastName}),
                ...(body.employeeCode && {employeeCode : body.employeeCode}),
                ...(body.email && {email : body.email}),
                ...(body.phoneNumber && {phoneNumber : body.phoneNumber}),
                ...(body.address && {address : body.address}),
                ...(body.dateOfBirth && {dateOfBirth : body.dateOfBirth}),
                ...(body.hireDate && {hireDate : body.hireDate}),
                ...(body.jobTitle && {jobTitle : body.jobTitle}),
                ...(body.department && {department : body.department}),
                ...(body.salary && {salary : body.salary}),
                ...(body.status && {status : body.status}),
            }
        },{new:true}
    )

    try {
        await UpdEmp.save()
    } catch (error) {
        return NextResponse.json({error: 'Error in saving updation of employee'},{status: 500})
    }

    const newAudit = await AuditLog(
        {
            user: auth.id,
            action: 'Update Employee',
            desc: `${authUser?.username} who is ${authUser.role} update this employee ${employee.firstName} ${employee.lastName}.`,
            target: 'Employee',
            targetId: UpdEmp._id,
            meta: {
                before: employee,
                after: UpdEmp
            }
        }
    )
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({error: 'Error in saving audit in /api/employee/[userId]/route.js - PUT; while updating employee profile.'},{status: 500})
    }


    return NextResponse.json(UpdEmp)
}