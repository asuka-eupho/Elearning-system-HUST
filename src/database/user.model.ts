import { EUserRole, EUserStatus } from "@/types/enums";
import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    status: EUserStatus;
    role: EUserRole;
    created_at: Date
    courses: Schema.Types.ObjectId[]
}
const userSchema = new Schema<IUser>({
    clerkId: {
        type: String
    },
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    avatar: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: Object.values(EUserRole),
        default: EUserRole.USER,
    },
    status: {
        type: String,
        enum: Object.values(EUserStatus),
        default: EUserStatus.ACTIVE,
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});
const User = models.User || model<IUser>("User", userSchema)
export default User