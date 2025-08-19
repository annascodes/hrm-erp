import { cookies } from "next/headers";
import { verifyToken } from "../jwtAuth";

export async function isHr() {
    try {
        const token = (await cookies()).get('token')?.value
        if(!token) return{ok: false, error: 'Missing token', status: 401}

        const decode = verifyToken(token)
        if(!decode || decode?.role !== 'hr')
            return {ok: false, error: 'hr access only.', status: 403}
    
        return {...decode, ok:true}
        
    } catch (error) {
        console.log('Err in  middleware/isHr.js :',error)
        return {ok: false, error: 'Server error', status: 500}
        
    }
    
}