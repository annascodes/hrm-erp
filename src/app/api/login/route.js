import { dbConnect } from "@/lib/dbConnection"
import User from "@/lib/models/userModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import { createToken } from "@/lib/jwtAuth"
import { cookies } from "next/headers"
import AuditLog from "@/lib/models/auditLogModel"

export async function POST(req) {
    const body = await req.json()
 
    if (!body?.username || body.username.trim() === '') {
        return NextResponse.json({ error: 'Enter valid username!!!' }, { status: 409 })
    }
    await dbConnect()
    const user = await User.findOne(
        {
            $or: [{ username: body.username }, { email: body.username }]
        }
    )
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const isValidPass = bcrypt.compareSync(body.password, user.password)
    if (!isValidPass) return NextResponse.json({ error: 'Wrong credentials' }, { status: 401 })


    const token = createToken({ id: user._id, role: user.role })
    const cookieStore = await cookies()
    cookieStore.set('token', token, { httpOnly: true, path: '/' })

    const { password, ...rest } = user._doc;

    const newAudit = new AuditLog(
        {
            user: user._id,
            action: 'Logged In',
            desc: `User "${user.username}" just logged in to the system.`,
            target: 'User',
            targetId: user._id,
        }
    )
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({ error: 'Err in saving new audit in login/route.js POST' }, { status: 500 })
    }
    return NextResponse.json(rest)

}