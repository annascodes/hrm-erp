import { cookies } from "next/headers";
import { verifyToken } from "../jwtAuth";

export async function isAdmin() {
    try {
        const token = (await cookies()).get('token')?.value
        if(!token) return{ok: false, error: 'Missing token', status: 401}

        const decode = verifyToken(token)
        if(!decode || decode?.role !== 'admin')
            return {ok: false, error: 'Admin access only.', status: 403}
    
        return {...decode, ok:true}
        
    } catch (error) {
        console.log('Err in  middleware/isAdmin.js :',error)
        return {ok: false, error: 'Server error', status: 500}
        
    }
    
}