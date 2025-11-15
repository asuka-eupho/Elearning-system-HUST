import HeadingView from '@/components/common/HeadingView'
import CourseUpdateContent from '@/components/course/CourseUpdateContent'
import { getCourseBySlug } from '@/lib/actions/course.action'

import React from 'react'

const page = async ({ searchParams }:
    {
        searchParams: {
            slug: string
        }
    }) => {
    const findCourse = await getCourseBySlug({ slug: searchParams.slug });
    if (!findCourse) return <div>Course Not Found!</div>
    return (
        <>
            <HeadingView>
                Nội dung:<strong className='text-primary'>{findCourse.title}</strong>
            </HeadingView>
            <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))}></CourseUpdateContent>
        </>
    )
}

export default page