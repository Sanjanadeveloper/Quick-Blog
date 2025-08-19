import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    try{
        mongoose.connection.on("connected", () => console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/blonja`)
    }catch(error){
        console.error("Failed to connect DB", error.message);
        process.exit(1); // Exit if database connection fails
    }
}

export default connectDB;





