import CourseGrid from '@/components/common/CourseGrid'
import HeadingView from '@/components/common/HeadingView'
import CourseItem from '@/components/course/CourseItem'
import { getAllCourses } from '@/lib/actions/course.action'
import React from 'react'

const page = async () => {
    const courses = (await getAllCourses()) || [];
    return (
        <div>
            <HeadingView>Khám Phá Các Khóa Học</HeadingView>
            <CourseGrid>
                {courses.length > 0 &&
                    courses?.map((item) => (
                        <CourseItem key={item.slug} data={item}></CourseItem>
                    ))}
            </CourseGrid>
        </div>
    )
}

export default page