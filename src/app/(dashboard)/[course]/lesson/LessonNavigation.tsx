import IconLeftArrow from '@/components/icons/IconLeftArrow'
import IconRightArrow from '@/components/icons/IconRightArrow'
import { Button } from '@/components/ui/button'
import { ILesson } from '@/database/lesson.model'
import { useRouter } from 'next/router'
import React from 'react'

const LessonNavigation = ({ nextLesson, prevLesson }: {
    nextLesson: string,
    prevLesson: string,
}) => {
    const router = useRouter()
    return (
        <div className="flex gap3">
            <Button className='size-10 p-3'
                disabled={!prevLesson}
                onClick={() => !prevLesson ? null : router.push(prevLesson)}>
                <IconLeftArrow />
            </Button>
            <Button className='size-10 p-3'
                disabled={!nextLesson}
                onClick={() => router.push(nextLesson)}>
                <IconRightArrow />
            </Button>
        </div >
    )
}

export default LessonNavigation