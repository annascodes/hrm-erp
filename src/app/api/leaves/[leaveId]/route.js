import { getLeaveDays } from "@/lib/apiHelpers/dateFilters";
import { dbConnect } from "@/lib/dbConnection";
import { verifyAuth } from "@/lib/middleware/verifyAuth";
import AuditLog from "@/lib/models/auditLogModel";
import Employee from "@/lib/models/employeeModel";
import LeaveBalance from "@/lib/models/leaveBalanceModel";
import Leave from "@/lib/models/leaveModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const auth = await verifyAuth()
    if (auth.role !== 'admin' && auth.role !== 'hr')
        return NextResponse.json({ error: 'You are neither admin nor hr ' }, { status: 403 })
    const { leaveId } = await params;
    const body = await req.json()
    const requestedLeaveDays = getLeaveDays(body.startDate, body.endDate)
 

    /* on "Approve": 
            1- Calculate the days ------- DONE
            2- Add in leaveBalance model -----------DONE
            3- Change status to 'Approve' --------DONE
            4- Make an entry in auditLog model
    */
    /* on "Reject": 
            1- Change status to 'Reject' --------DONE
            2- Make an entry in auditLog model
    */

    await dbConnect()

    if (!body.employeeId) {
        return NextResponse.json({ error: 'Need employee id' }, { status: 404 })
    }
    const employeeInfo = await Employee.findOne({_id:body.employeeId})
    if(!employeeInfo)
        return NextResponse.json({error: 'Employee from passed down id not found'},{status: 404})

    const leaveBalance = await LeaveBalance.findOne({ employee: body.employeeId })
 

    let balancingLeave;
    if (!leaveBalance && body.response === 'Approved') {
        console.log(`--------creating new leavebalance-------`.bgYellow)
        balancingLeave = new LeaveBalance({
            employee: body.employeeId,
            ...(body.leaveType === 'Annual Leave' && { annual: requestedLeaveDays }),
            ...(body.leaveType === 'Sick Leave' && { sick: requestedLeaveDays }),
            ...(body.leaveType === 'Casual Leave' && { casual: requestedLeaveDays }),
            ...(body.leaveType === 'Unpaid Leave' && { unpaid: requestedLeaveDays }),
        })

        try {
            await balancingLeave.save()
        } catch (error) {
            return NextResponse.json({ error: 'err in saving new balancingLeave' }, { status: 500 })
        } 
    }
    if (leaveBalance  && body.response === 'Approved') {
        // add days under leave type
         console.log(`--------appending existing leavebalance-------`.bgYellow)
        balancingLeave = await LeaveBalance.findOneAndUpdate(
            {
                employee: body.employeeId
            },
            {
                ...(body.leaveType === 'Annual Leave' && { annual: leaveBalance.annual + requestedLeaveDays }),
                ...(body.leaveType === 'Sick Leave' && { sick: leaveBalance.sick + requestedLeaveDays }),
                ...(body.leaveType === 'Casual Leave' && { casual: leaveBalance.casual + requestedLeaveDays }),
                ...(body.leaveType === 'Unpaid Leave' && { unpaid: leaveBalance.unpaid + requestedLeaveDays }),
            }
        )
        try {
            await balancingLeave.save()
        } catch (error) {
            return NextResponse.json({ error: 'err in saving existing balancingLeave' }, { status: 500 })
        }

    }
    const updateLeave = await Leave.findOneAndUpdate(
        {
            _id: leaveId,
        },
        {
            status: body.response,
            approver: auth.id,
            ...(body.response === 'Rejected' &&
                { rejectionReason: body?.rejectionReason || 'not feasible' })
        },
        { new: true }
    )

    // making auditlog 
    const newAudit = new AuditLog({
        user: auth.id,
        action: `Leave ${body.response} `  ,
        desc: `${auth?.role} "${body.response}" the "${body.leaveType}" request of ${employeeInfo?.firstName} ${employeeInfo.lastName} `,
        target: 'Leave',
        targetId: updateLeave._id,
        

    })
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({error:'Error in saving new Audit in leaves/[leaveId]/route.js in PUT request'}, {status: 500})
    }

    return NextResponse.json({ success: true, msg: 'Leave status changed', updateLeave, newAudit })

}

// export async function GET(req, { params }) {
//     const auth = await verifyAuth()
//     if (!auth)
//         return NextResponse.json({ error: "Need login" }, { status: 401 })

//     const {leaveId} = await params;

//     const pendingLeaves = await Leave.findById(leaveId).populate(
//         {
//             path: 'employee',
//             populate: {
//                 path: 'userId',
//                 select: 'username'
//             }

//         }
//     )
//     if(!pendingLeaves)
//         return NextResponse.json({error: 'Leave not found'},{status: 404})


//     return NextResponse.json({ success: true, msg: 'sent pending leaves', pendingLeaves })

// }