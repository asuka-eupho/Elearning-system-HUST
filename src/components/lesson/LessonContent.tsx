import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import LessonItem from './LessonItem'
import { TUpdateLessonInLecture } from '@/types'

const LessonContent = ({ lectures, course, slug }: {
    lectures: TUpdateLessonInLecture[],
    course: string,
    slug: string
}) => {
    return (
        <div className='flex flex-col gap-5'>
            {lectures.map((lecture: TUpdateLessonInLecture) => (
                <Accordion
                    type="single"
                    key={lecture._id}
                    collapsible
                    className="w-full"
                >
                    <AccordionItem value={lecture._id.toString()}>
                        <AccordionTrigger>
                            <div className="flex items-center justify-between gap-3 w-full pr-5">
                                <>
                                    <div>{lecture.title}</div>
                                </>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="!bg-transparent border-none">
                            {lecture.lessons.map(lesson => (
                                <LessonItem
                                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                                    isActive={!slug ? false : lesson.slug === slug}
                                    key={lesson._id}
                                    lesson={lesson}>

                                </LessonItem>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}

        </div>
    )
}

export default LessonContent