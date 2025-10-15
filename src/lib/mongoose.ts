"use server";
import mongoose from "mongoose";
// singleton connection
let isConnected: boolean = false
export const connectToDatabase = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("Mongodb-url not set")
    }
    if (isConnected) {
        console.log("connect successfully")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "HUST-LMS"
        });
        isConnected = true
    } catch (error) {
        console.log("Run errors while connecting to db...")
    }
}