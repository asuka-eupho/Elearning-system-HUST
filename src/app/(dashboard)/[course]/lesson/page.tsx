import PageNotFound from '@/app/page.not.found';
import IconLeftArrow from '@/components/icons/IconLeftArrow';
import IconRightArrow from '@/components/icons/IconRightArrow';
import { Button } from '@/components/ui/button';
import { getCourseBySlug } from '@/lib/actions/course.action';
import { findAllLessons, getLessonBySlug } from '@/lib/actions/lesson.action';
import React from 'react'
import LessonNavigation from './LessonNavigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TUpdateLessonInLecture } from '@/types';
import LessonItem from '@/components/lesson/LessonItem';
import HeadingView from '@/components/common/HeadingView';
import LessonContent from '@/components/lesson/LessonContent';

const page = async ({ params, searchParams }: {
    params: {
        course: string;
    },
    searchParams: {
        slug: string
    }
}) => {
    const course = params.course;
    const slug = searchParams.slug;

    const findCourse = await getCourseBySlug({ slug: course })
    if (!findCourse) return null
    const courseId = findCourse?._id.toString()

    const lessonList = await findAllLessons({ course: courseId || "" });

    const lessonDetails = await getLessonBySlug({
        slug,
        course: courseId || ""
    })
    if (!lessonDetails) return null

    const currentLessonIndex = lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
    const prevLesson = lessonList?.[currentLessonIndex - 1];
    const nextLesson = lessonList?.[currentLessonIndex + 1];
    const lectures = findCourse.lectures || []
    const videoId = lessonDetails.video_url?.split("v=").at(-1);

    return (
        <div className="grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
            <div>
                <div className="relative mb-5 aspect-video">
                    <iframe className='w-full h-full object-fill' src={`https://www.youtube.com/embed/${videoId}`}></iframe>
                </div>
                <div className='flex items-center justify-between mb-5'>
                    <LessonNavigation
                        nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`}
                        prevLesson={!prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`}
                    >
                    </LessonNavigation>
                </div>
                <HeadingView className='mb-10'>{lessonDetails.title}</HeadingView>
                <div className='p-5 rounded-lg bgDarkMode border boderDarkMode'>
                    <div dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}></div>
                </div>
            </div>
            <div>
                <div className='sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto'>
                    <LessonContent
                        lectures={lectures}
                        course={course}
                        slug={slug}
                    ></LessonContent>
                </div>
            </div>
        </div>
    )
}

export default page