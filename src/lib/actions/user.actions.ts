import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

export async function createUser(params: TCreateUserParams) {
    try {
        connectToDatabase()
        const newUser = await User.create(params)
        return newUser
    } catch (error) {
        console.log(error);
    }
}