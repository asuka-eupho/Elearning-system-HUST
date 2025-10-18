import User, { IUser } from "@/database/user.model";
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
export async function getUserInfo({
    userId
}: {
    userId: string
}): Promise<IUser | null | undefined> {
    try {
        connectToDatabase();
        const user = await User.findOne({ clerkId: userId });
        if (!user) return null;
        return user
    } catch (error) {
        console.log(error)
    }
}