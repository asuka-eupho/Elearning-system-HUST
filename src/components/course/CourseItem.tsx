import React from 'react'
import { IconClock, IconEye, IconStar } from '../icons'
import Link from 'next/link'
import Image from 'next/image'
import { ICourse } from '@/database/course.model'

const CourseItem = ({ data }: { data: ICourse }) => {
    const courseInfo = [
        {
            title: data.views,
            icon: (className?: string) => <IconEye className={className}></IconEye>
        },
        {
            title: data.rating[0],
            icon: (className?: string) => <IconStar className={className}></IconStar>,
        },
        {
            title: "30h25p",
            icon: (className?: string) => (
                <IconClock className={className}></IconClock>
            ),
        },
    ]
    return (
        <div className='bg-white dark:bg-grayDarker dark:border-opacity-10 border border-gray-200 p-4 rounded-2xl'>
            <Link href="#" className='block h-[180px] relative'>
                <Image
                    src={data.image}
                    alt=""
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                    sizes="@media (min-width: 640px) 300px, 100vw"
                    priority />
            </Link>
            <div className='pt-4'>
                <h3 className='font-bold text-lg mb-3'>haa</h3>
                <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
                    {courseInfo.map((item, index) => (
                        <div className="flex items-center gap-2" key={index}>
                            {item.icon("size-4")}
                            <span>{item.title}</span>
                        </div>
                    ))}

                    <span className="font-bold text-primary ml-auto text-base">
                        {data.price.toLocaleString()} VND
                    </span>
                </div>

                <Link
                    href={`/course/hihi`}
                    className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12"
                >
                    Xem chi tiết
                </Link>
            </div>
        </div>
    )
}

export default CourseItem