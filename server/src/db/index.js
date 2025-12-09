import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

export const connectionDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected || DB Host at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection failed", error)
        process.exit(1)
    }
}





















