import { cookies } from "next/headers";
import { verifyToken } from "../jwtAuth";

export async function verifyAuth() {
    try {
        const token = (await cookies()).get('token')?.value
        if(!token) return{ok: false, error: 'Missing token', status: 401}

        const decode = verifyToken(token)
        
    
        return decode
        
    } catch (error) {
        console.log('Err in  middleware/isHr.js :',error)
        return {ok: false, error: 'Server error', status: 500}
        
    }
    
}