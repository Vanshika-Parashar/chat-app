import mongoose from "mongoose";
//Function to connect to the mongodb databse
export const connectDB=async () =>{
    try{ 
        mongoose.connection.on('connected',()=> console.log('Databse Connected'));
        mongoose.set("bufferCommands", false);
        await mongoose.connect(process.env.MONGODB_URI);

    } catch (error){
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}