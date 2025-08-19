import mongoose from "mongoose"
import colors from 'colors'

export const dbConnect = async()=>{
    if(mongoose.connection.readyState >= 1){
        console.log(` already DB connected `.bgGreen)
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
          console.log(` DB connected `.bgGreen)
    } catch (error) {
        console.log(` err in DB connection `.bgRed)
        console.log(error)
    }
}