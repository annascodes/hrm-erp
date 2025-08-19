import { dbConnect } from "@/lib/dbConnection";
import { verifyToken } from "@/lib/jwtAuth";
import { isAdmin } from "@/lib/middleware/isAdmin";
import User from "@/lib/models/userModel";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')


    const admin = await isAdmin()
    if (!admin.ok) return NextResponse.json({ error: admin.error }, { status: admin.status })

    await dbConnect()
    let users
    if (query) {
        users = await User.find(
            {
                $or: [
                    { username: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ]
            }
        ).select('-password')
    }
    else{
         users = await User.find().select('-password')
    }

    // i want to fetch every user whos username or email contains query e.g if query='a' it should fetch me users whos username or email contain a in it 


    return NextResponse.json(users)

}