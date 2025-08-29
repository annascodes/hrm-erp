import User from "@/lib/models/userModel"
import { NextResponse } from "next/server"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const email = searchParams.get('email')
    const createdAt = searchParams.get('createdAt')
    const role = searchParams.get('role')

    const startindex = searchParams.get('startindex')
    const limit = searchParams.get('limit')

    // console.log(username)
    // console.log(email)
    // console.log(createdAt)
    // console.log(role)
    // console.log(startindex)
    // console.log(limit)



    const users = await User.find().select('-password')

    return NextResponse.json(users)


}