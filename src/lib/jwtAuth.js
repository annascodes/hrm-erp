import jwt from "jsonwebtoken"

export const createToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_KEY)
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
        return null;
    }
}