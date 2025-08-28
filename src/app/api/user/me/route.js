import { dbConnect } from "@/lib/dbConnection";
import { verifyToken } from "@/lib/jwtAuth";
import User from "@/lib/models/userModel";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const token = (await cookies()).get('token').value;
        // if(!token){
        //     console.log('no token-> api/user/me GET-method.')
        //     return 
        // }
        const isVerified = verifyToken(token)
        if (!isVerified) return NextResponse.json({ error: 'Failed authorization/authentication' }, { status: 401 })

        await dbConnect()
        const me = await User.findById(isVerified.id)
        if (!me) return NextResponse.json({ error: 'User(you) not found.' }, { status: 404 })

        return NextResponse.json(me)

    } catch (error) {
        console.log('Err in /api/user/me : ', error)
        return NextResponse.json({ error: 'Error fetching logged user.' }, { status: 500 })
    }

}