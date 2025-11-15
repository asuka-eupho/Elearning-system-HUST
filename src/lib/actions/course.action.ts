"use server";

import { TCourseLectureUpdateParams, TCreateCourseParams, TUpdateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";

// CRUD action
export async function createCourse(params: TCreateCourseParams) {
    try {
        connectToDatabase();
        const existCourse = await Course.findOne({ slug: params.slug });
        if (existCourse) {
            return {
                success: false,
                message: "Đường dẫn khóa học đã tồn tại!",
            };
        }
        const course = await Course.create(params);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(course)),
        };
    } catch (error) {
        console.log(error);
    }
}
export async function updateCourse(params: TUpdateCourseParams) {
    try {
        connectToDatabase()
        const courseFound = await Course.findOne({ slug: params.slug })
        if (!courseFound) return;
        await Course.findOneAndUpdate(
            { slug: params.slug },
            params.updateData,
            { new: true });
        revalidatePath(params.path || "/");
        return {
            success: true,
            message: "Cập nhật khóa học thành công!",
        };
    } catch (error) {
        console.log(error);
    }
}

// Data fetching action
export async function getCourseBySlug({ slug }: { slug: string }): Promise<TCourseLectureUpdateParams | undefined> {
    try {
        connectToDatabase()
        const findCo = await Course.findOne({ slug }).populate({
            path: "lectures",
            model: Lecture,
            select: "_id title",
            match: {
                _destroy: false
            },
            populate: {
                path: "lessons",
                model: Lesson,
                match: {
                    _destroy: false
                }
            }
        });
        return findCo
    } catch (error) {
        console.log(error);
    }
}
export async function getAllCourses(): Promise<ICourse[] | undefined> {
    try {
        connectToDatabase();
        const courses = await Course.find();
        return courses
    } catch (error) {
        console.log(error)
    }
}