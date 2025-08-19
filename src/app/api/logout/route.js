import { verifyAuth } from "@/lib/middleware/verifyAuth";
import AuditLog from "@/lib/models/auditLogModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const auth = await verifyAuth()
    const token = (await cookies()).delete('token', { path: '/' })

    const newAudit = new AuditLog(
        {
            user: auth.id,
            action: 'Logged Out',
            desc: `User  just logged out to the system.`,
            target: 'User',
            targetId: auth.id,
        }
    )
    try {
        await newAudit.save()
    } catch (error) {
        return NextResponse.json({ error: 'Err in saving new audit in logout/route.js POST' }, { status: 500 })
    }

    return NextResponse.json({ success: true, msg: 'User logged out successfully' }, { status: 200 })
}