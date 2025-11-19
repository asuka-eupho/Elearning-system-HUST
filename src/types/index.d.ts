import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";

export type TActiveLinkProps = {
    url: string,
    children: React.ReactNode
}
export type TMenuItem = {
    url: string;
    title: string;
    icon?: React.ReactNode;
    onlyIcon?: boolean
}
//user
export type TCreateUserParams = {
    clerkId: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
}
// Course
export type TCreateCourseParams = {
    title: string;
    slug: string;
    author: string;
};
export type TUpdateCourseParams = {
    slug: string;
    updateData: Partial<ICourse>;
    path?: string
};
export type TUpdateLessonInLecture = {
    _id: string,
    title: string,
    lessons: ILesson[];
}
export interface TCourseLectureUpdateParams extends Omit<ICourse, "lectures"> {
    lectures: TUpdateLessonInLecture[];
}
//lecture
export type TCreateLectureParams = {
    course: string;
    title?: string;
    order?: number;
    path?: string
}
export type TUpdateLectureParams = {
    lectureId: string;
    updateData: {
        title?: string;
        order?: number;
        _destroy?: boolean;
        path?: string
    }
}
// lesson
export type TCreateLessonParams = {
    lecture: string;
    course: string;
    title?: string;
    order?: number;
    path?: string;
    slug?: string
}
export type TUpdateLessonParams = {
    lessonId: string;
    path?: string;
    updateData: {
        title?: string;
        slug?: string;
        duration?: number;
        video_url?: string;
        content?: string;
    }
}
// History
export type TCreateHistoryParams = {
    course: string;
    lesson: string;
    checked: boolean | string;
    path: string
}