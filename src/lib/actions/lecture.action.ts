"use server";

import Course from "@/database/course.model";
import { connectToDatabase } from "../mongoose";
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import Lecture from "@/database/lecture.model";
import { success } from "zod";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
    try {
        connectToDatabase()
        const findCourse = await Course.findById(params.course);
        if (!findCourse) return;
        const newLec = await Lecture.create(params)
        findCourse.lectures.push(newLec._id)
        findCourse.save();
        revalidatePath(params.path || "/");
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
    }
}
export async function updateLecture(params: TUpdateLectureParams) {
    try {
        connectToDatabase();
        const res = await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
            new: true
        })
        revalidatePath(params.updateData.path || "/")
        if (!res) return;

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
    }
}