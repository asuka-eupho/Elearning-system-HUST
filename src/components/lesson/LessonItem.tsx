import React from 'react'
import { IconPlay } from '../icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { createHistory } from '@/lib/actions/history.action'

const LessonItem = ({ lesson, url, isActive = false, isChecked = false }: {
    lesson: {
        title: string,
        duration: number,
        course: string,
        _id: string
    },
    url?: string,
    isActive?: boolean,
    isChecked?: boolean;
}) => {
    const handleCompleteLesson = async (checked: string | boolean) => {
        try {
            await createHistory({
                course: lesson.course,
                lesson: lesson._id,
                checked,
                path: url || "/"
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cn("flex items-center gap-3 bgDarkMode border borderDarkMode rounded-lg p-3 text-sm font-medium",
            isActive ? "text-purple-600 font-semibold" : ""
        )}>
            {url && (
                <Checkbox
                    defaultChecked={isChecked}
                    className="size-4 flex-shrink-0"
                    onCheckedChange={(checked) => handleCompleteLesson(checked)}
                />
            )}
            <IconPlay className='size-4 flex-shrink-0' />
            {url ? <Link href={url} className={cn("line-clamp-1", isActive && "pointer-events-none")}>{lesson.title}</Link>
                : <h4 className='line-clamp-1'>{lesson.title}</h4>
            }
            <span className='ml-auto text-xs font-semibold'>
                {lesson.duration} phút
            </span>
        </div>
    )
}

export default LessonItem