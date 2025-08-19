import { dbConnect } from "@/lib/dbConnection";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const {username} = await params;
    await dbConnect()
    const user = await User.findOne({username})
    return NextResponse.json(user)
}