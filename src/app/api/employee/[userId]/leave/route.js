import { getLeaveDays, startAndEndOfDay } from "@/lib/apiHelpers/dateFilters";
import { dbConnect } from "@/lib/dbConnection";
import { verifyAuth } from "@/lib/middleware/verifyAuth";
import AuditLog from "@/lib/models/auditLogModel";
import Employee from "@/lib/models/employeeModel";
import Leave from "@/lib/models/leaveModel";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import moment from 'moment'

export async function POST(req, {params}) {
    const {userId} = await params;
    const body =await req.json()
    const auth = await verifyAuth()
    if(!auth)return NextResponse.json({erro: 'No authenticated, need login'},{status: 402})

    const user = await User.findById(userId)
    if(!user) return NextResponse.json({error: 'user not found'}, {status: 404})
    if(!user.employeeId) return NextResponse.json({error: 'Employee id is not yet assigned'}, {status: 403}) 
    
    const newLeaveApp = new Leave({...body, employee: user.employeeId, })
    try {
        await newLeaveApp.save()
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Leave application not sent due to some SERVER ERROR.'}, {status: 500 })
    }


    const newAudit = new AuditLog(
        {
            user: auth.id,
            action: 'Leave posted',
            desc: `Posted a "${body?.leaveType}" request from ${moment(body?.startDate).format("dddd, Do MMMM YYYY")} to ${moment(body?.endDate).format('dddd, Do MMMM YYYY')} for ${getLeaveDays(body?.startDate, body?.endDate)} days `,
            target: 'Leave',
            targetId: newLeaveApp._id,
        }
    )
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({error: 'Err in saving new audit in employee/[userId]/leave/route.js in POST'}, {status: 500})
    }

    return NextResponse.json({success: true, msg: 'Leave application sent', newLeaveApp})

    
}

export async function GET(req,{params}) {
    const auth = await verifyAuth()
    await dbConnect() 
    const employee = await Employee.findOne({userId: auth.id})
    if(!employee) return NextResponse.json({error: 'Employee not found'}, {status: 404})

    const {searchParams} = new URL(req.url)
    const createdAt = searchParams.get('createdAt')
    const leaveType = searchParams.get('leaveType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const query = {}

    if(createdAt && createdAt!='undefined')
        query.createdAt = startAndEndOfDay(createdAt) //from 00:00 to 23:59
    if(leaveType && leaveType!== 'undefined')
        query.leaveType = leaveType
    if(startDate && startDate!== 'undefined')
        query.startDate = startAndEndOfDay(startDate) 
    if(endDate && endDate!== 'undefined')
        query.endDate = startAndEndOfDay(endDate)
        
    query.employee = employee._id
    const allLeaves = await Leave.find(query).populate(
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
    ).sort({createdAt: -1})

    
    return NextResponse.json({success: true, msg:`All leaves of ${employee?.firstName}`, allLeaves})
}