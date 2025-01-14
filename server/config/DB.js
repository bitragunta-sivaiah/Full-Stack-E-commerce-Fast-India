// mongodb connection
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGO_URL){
    throw new Error('Missing MONGO_URL environment variable')
}

async function connectDB(){
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("MongoDB connected")
        } catch (error) {
            console.error("Error connecting to MongoDB", error)
            process.exit(1)
        }
}

export default connectDB;