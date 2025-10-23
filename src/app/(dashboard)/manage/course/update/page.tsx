import HeadingView from '@/components/common/HeadingView';
import CourseUpdate from '@/components/course/CourseUpdate';
import { getCourseBySlug } from '@/lib/actions/course.action';
import React from 'react'

const page = async ({ searchParams }:
    {
        searchParams: {
            slug: string
        }
    }) => {
    const findCourse = await getCourseBySlug({
        slug: searchParams.slug,
    });
    if (!findCourse) return null;
    return (
        <>
            <HeadingView className="mb-8">Cập nhật khóa học</HeadingView>
            <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
        </>
    );
}

export default page