import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected');
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}