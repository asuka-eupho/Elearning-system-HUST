import React from 'react'
import { IconPlay } from '../icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LessonItem = ({ lesson, url, isActive }: {
    lesson: {
        title: string,
        duration: number
    },
    url?: string,
    isActive?: boolean
}) => {
    return (
        <div className={cn("flex items-center gap-3 bgDarkMode border borderDarkMode rounded-lg p-3 text-sm font-medium",
            isActive ? "text-purple-600 font-semibold pointer-events-none" : ""
        )}>
            <IconPlay className='size-4 flex-shrink-0' />
            {url ? <Link href={url} className='line-clamp-1'>{lesson.title}</Link> : <h4 className='line-clamp-1'>{lesson.title}</h4>}
            <span className='ml-auto text-xs font-semibold'>
                {lesson.duration} phút
            </span>
        </div>
    )
}

export default LessonItem