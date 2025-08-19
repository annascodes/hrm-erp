import { dbConnect } from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import User from "@/lib/models/userModel";
import bcrypt from 'bcryptjs'
import AuditLog from "@/lib/models/auditLogModel";

export async function POST(req) {
    const body = await req.json()
    console.log(body)

    await dbConnect()
    const isExist = await User.findOne(
        {
            $or: [{ email: body.email }, { username: body.username }]
        }
    )

    if (isExist) return NextResponse.json({ error: 'Username or email is taken' }, { status: 409 })

    const hashedPass = bcrypt.hashSync(body.password, 10)
    const newUser = new User({
        email: body.email,
        username: body.username,
        password: hashedPass || body.password,
    })
    if (!newUser) return NextResponse.json({ error: 'Registeration failed.' }, { status: '500' })
    await newUser.save()


    const newAudit = new AuditLog(
        {
            user: newUser._id,
            action: 'Registered',
            desc: `User "${newUser.username} " just signed registeration to the system.`,
            target: 'User',
            targetId: newUser._id,
        }
    )
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({ error: 'Err in saving new audit in register/route.js POST' }, { status: 500 })
    }

    return NextResponse.json({ success: true, msg: 'User created successfully', user: newUser })

}