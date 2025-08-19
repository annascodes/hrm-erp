import { verifyAuth } from "@/lib/middleware/verifyAuth";
import Leave from "@/lib/models/leaveModel";
import { NextResponse } from "next/server";
import Employee from "@/lib/models/employeeModel";

export async function GET(req, { params }) {
    const auth = await verifyAuth()
    if (auth.role !== 'admin' && auth.role !== 'hr')
        return NextResponse.json({ error: "You'r neither admin nor hr" }, { status: 403 })

    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const status = searchParams.get('status')
    const onlyPendingCount = searchParams.get('onlyPendingCount') || false
    // from here to 
    const leaveType = searchParams.get('leaveType') // from leave table
    const createdAt = searchParams.get('createdAt') // from leave table
    const startDate = searchParams.get('startDate') // from leave table
    const endDate = searchParams.get('endDate')// from leave table
    const username = searchParams.get('username') // this username name is coming  

    const query = {};
    if (leaveType && leaveType !== 'undefined') query.leaveType = leaveType;
    if (status) query.status = status;
    if (createdAt && !isNaN(new Date(createdAt).getTime())) {
        const dayStart = new Date(createdAt)
        const dayEnd = new Date(createdAt)
        dayEnd.setHours(23, 59, 59, 999)
        query.createdAt = { $gte: dayStart, $lte: dayEnd }
    }

    if (startDate && !isNaN(new Date(startDate).getTime())) {
        const startOfDay = new Date(startDate);
        const endOfDay = new Date(startDate);
        endOfDay.setHours(23, 59, 59, 999);
        query.startDate = { $gte: startOfDay, $lte: endOfDay };
    }
    if (endDate && !isNaN(new Date(endDate).getTime())) {
        const startOfDay = new Date(endDate);
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        query.endDate = { $gte: startOfDay, $lte: endOfDay };
    }


    const pendingCount = await Leave.countDocuments({ status: "Pending" });

    if (onlyPendingCount) {
        return NextResponse.json({ success: true, msg: 'sent pending leaves', pendingCount })
    }

 
    const leaves = await Leave.find(query).populate(
        {
            path: 'employee',
            populate: {
                path: 'userId',
                select: 'username'
            },


        }
    ).populate({
        path: 'approver',
        select: 'username role'
    }
    )


    let filteredLeaves = leaves;
    if (username && username !== 'undefined') {
        const usernameRegex = new RegExp(username, 'i'); // 'i' for case-insensitive
        filteredLeaves = leaves.filter(
            (leave) => usernameRegex.test(leave.employee?.userId?.username)
        );

    } 
    return NextResponse.json({ success: true, msg: 'leaves sent', leaves: filteredLeaves, pendingCount })

}