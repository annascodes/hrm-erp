import { dbConnect } from "@/lib/dbConnection";
import { verifyAuth } from "@/lib/middleware/verifyAuth";
import Employee from "@/lib/models/employeeModel";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import AuditLog from "@/lib/models/auditLogModel";
import LeaveBalance from "@/lib/models/leaveBalanceModel";

export async function GET(req, { params }) {
    const { username } = await params;
    await dbConnect()
    const user = await User.findOne({ username })
    const employee = await Employee.findOne({ userId: user._id }).populate('userId', 'username role').populate('createdBy', 'username role')
    let leaveBalance = null;
    if (employee)
        leaveBalance = await LeaveBalance.findOne({ employee: employee._id })
    return NextResponse.json({ user, employee, leaveBalance })
}
export async function POST(req, { params }) {
    const { username } = await params;

    const auth = await verifyAuth()
    const authUser = await User.findById(auth.id)

    const user = await User.findOne({ username })
    if (!(auth.role === 'admin' || auth.role === 'hr' || auth.id === user._id.toString()))
        return NextResponse.json({ error: 'not authorized to do this action' }, { status: 403 })
    const body = await req.json()
    // console.log(`------------------`.bgYellow)
    // console.log(body)

    if (!body?.email || body.email.trim() === '' || !body?.email.includes('@')) {
        return NextResponse.json({error: 'Enter valid email!!!'},{status: 409})
    }
    if (!body?.username || body.username.trim() === '') {
        return NextResponse.json({error: 'Enter valid username!!!'},{status: 409})
    }
 


    let hashedPass = null;
    if (body.password?.trim())
        hashedPass = await bcrypt.hash(body.password.trim(), 10)

    let updateUser;
    try {
        updateUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    ...(body.username !== user.username && { username: body.username.trim() }),
                    ...(body.email !== user.email && { email: body.email.trim() }),
                    ...(hashedPass && { password: hashedPass })
                }
            },
            { new: true }
        )
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }


    const newAudit = new AuditLog(
        {
            user: auth.id,
            action: 'Update User',
            desc: `${authUser.username}-${auth.role} updated profile of ${updateUser.username} `,
            target: "User",
            targetId: updateUser._id,
            meta: {
                before: user,
                after: updateUser
            }

        }
    )
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({ error: 'Err in saving audit for update user /api/user/[username]/route.js - POST' }, { status: 500 })
    }


    return NextResponse.json(updateUser)

}