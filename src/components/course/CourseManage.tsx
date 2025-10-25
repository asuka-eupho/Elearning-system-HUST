"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import HeadingView from '../common/HeadingView'
import Image from 'next/image'
import { commonClassNames, courseStatus } from '@/constants'
import { cn } from '@/lib/utils'
import { IconDelete, IconEdit, IconEye, IconStudy } from '../icons'
import Link from 'next/link'
import { ICourse } from '@/database/course.model'
import Swal from 'sweetalert2'
import { updateCourse } from '@/lib/actions/course.action'
import { ECourseStatus } from '@/types/enums'
import { toast } from 'react-toastify'
import { Input } from '../ui/input'


const CourseManage = ({ courses }: { courses: ICourse[] }) => {

    const handleDeleteCourse = (slug: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateCourse({
                    slug,
                    updateData: {
                        status: ECourseStatus.PENDING,
                        _destroy: true,
                    },
                    path: "/manage/course"
                })

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
        try {
            Swal.fire({
                title: "Thay đổi trạng thái khóa học?",
                text: "Hãy kiểm tra kỹ trước khi thực hiện!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đúng, Tôi đồng ý!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateCourse({
                        slug,
                        updateData: {
                            status: ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING,
                            _destroy: ECourseStatus.PENDING ? true : false,
                        },
                        path: "/manage/course"
                    })

                    toast.success("Cập nhật trạng thái khóa học thành công!")
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center mb-10">
                <HeadingView >Quản Lý Khóa Học</HeadingView>
                <div className="w-[300px]">
                    <Input placeholder='Tìm kiếm khóa học...' />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">TT Khóa Học</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Quản Lý Tác Vụ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.length > 0 && courses.map((course) => {
                        const courseStatusItem = courseStatus.find((item) => item.value === course.status);
                        return (
                            <TableRow key={course.slug}>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Image
                                            className='flex-shrink-0 size-20 rounded-lg object-cover'
                                            alt=''
                                            src={course.image}
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className='font-bold text-base'>{course.title}</h3>
                                        <h4 className='text-sm text-slate-500'>{new Date(course.created_at).toLocaleDateString("vi-VI")}</h4>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-bold text-base">{course.price.toLocaleString()} VND</span>
                                </TableCell>
                                <TableCell>
                                    <button onClick={() => handleChangeStatus(course.slug, course.status)}
                                        type='button'
                                        className={cn(commonClassNames.status, courseStatusItem?.className)}>{courseStatusItem?.title}</button>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <Link href={`/manage/course/`} className={commonClassNames.action}>
                                            <IconStudy />
                                        </Link>
                                        <Link href={`/course/${course.slug}`} className={commonClassNames.action}>
                                            <IconEye />
                                        </Link>
                                        <Link href={`/manage/course/update?slug=${course.slug}`} className={commonClassNames.action}>
                                            <IconEdit />
                                        </Link>
                                        <button onClick={() => handleDeleteCourse(course.slug)} className={commonClassNames.action}>
                                            <IconDelete />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }

                    )}

                </TableBody>
            </Table>
            <div className="flex justify-end gap-3">
                <button className={commonClassNames.paginationButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>

                </button>
                <button className={commonClassNames.paginationButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>

                </button>
            </div>
        </div>
    )
}

export default CourseManage