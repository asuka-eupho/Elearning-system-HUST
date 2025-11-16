"use client"
import React, { MouseEvent, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { commonClassNames } from '@/constants'
import { IconCancel, IconCheck, IconDelete, IconEdit } from '../icons'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { createLecture, updateLecture } from '@/lib/actions/lecture.action'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { ILecture } from '@/database/lecture.model'
import { TCourseLectureUpdateParams, TUpdateLessonInLecture } from '@/types'
import { cn } from '@/lib/utils'
import { createLesson, updateLesson } from '@/lib/actions/lesson.action'
import slugify from 'slugify'
import LessonItemUpdate from '../lesson/LessonItemUpdate'

const CourseUpdateContent = ({ course }: {
    course: TCourseLectureUpdateParams
}) => {
    const lectures = course.lectures

    const [lectureEdit, setLectureEdit] = useState("");
    const [lessonEdit, setLessonEdit] = useState("");
    const [lectureIdEdit, setLectureIdEdit] = useState("");
    const [lessonIdEdit, setLessonIdEdit] = useState("")

    const handleAddNewLec = async () => {
        try {
            const res = await createLecture({
                title: "Chương mới",
                course: course._id,
                order: lectures.length + 1,
                path: `manage/course/update-content?slug=${course.slug}`
            });
            if (res?.success) {
                toast.success("Thêm chương mới thành công!");
            }
        } catch (error) {
            toast.error(`${error}`)
        }
    }
    const handleDeleteLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e.stopPropagation();
        try {
            Swal.fire({
                title: "Xóa Chương này?",
                text: "khi thực hiện thao tác này, dữ liệu sẽ biến mất!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok, Xóa ngay!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await updateLecture({
                        lectureId,
                        updateData: {
                            _destroy: true,
                            path: `manage/course/update-content?slug=${course.slug}`
                        }
                    })
                    if (res?.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Bài giảng đã xóa thành công",
                            icon: "success"
                        });
                    }

                }
            });

        } catch (error) {
            console.log(error)
        }
    }
    const handleAddNewLesson = async (lectureId: string, courseId: string) => {
        try {
            const res = await createLesson({
                path: `manage/course/update-content?slug=${course.slug}`,
                lecture: lectureId,
                course: courseId,
                title: "Tieu de moi",
                slug: `tieu-de-moi-${new Date().getTime().toString().slice(-3)}`
            });
            if (res?.success) {
                toast.success("Thêm thành công")
                return;
            }
            toast.error("Thêm thất bại, thử lại!");
        } catch (error) {

        }
    }
    const handleUpdateLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e.stopPropagation();
        try {
            const res = await updateLecture({
                lectureId,
                updateData: {
                    title: lectureEdit,
                    path: `manage/course/update-content?slug=${course.slug}`
                }
            })
            if (res?.success) {
                toast.success("Cập nhật thành công");
                setLectureIdEdit("")
                setLectureEdit("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateLesson = async (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {
        try {
            const res = await updateLesson({
                lessonId,
                path: `manage/course/update-content?slug=${course.slug}`,
                updateData: {
                    title: lessonEdit,
                    slug: slugify(lessonEdit, { lower: true, locale: "vi", remove: /[*~.()'"!:@]/g, })
                }
            });
            if (res?.success) {
                toast.success("Cập nhật bài học thành công!");
                setLessonEdit("")
                setLessonIdEdit("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {lectures.map((lecture: TUpdateLessonInLecture, index) => (
                <div key={lecture._id}>
                    <Accordion
                        type="single"
                        collapsible={!lectureIdEdit}
                        className="w-full"
                    >
                        <AccordionItem value={lecture._id}>
                            <AccordionTrigger>
                                <div className="flex items-center justify-between gap-3 w-full pr-5">
                                    {lecture._id === lectureIdEdit ? (
                                        <>
                                            <div className='w-full'>
                                                <Input defaultValue={lecture.title}
                                                    placeholder='Tên Chương...'
                                                    onChange={(e) => setLectureEdit(e.target.value)}
                                                />
                                            </div>
                                            <div className='flex gap-2'>
                                                <span className={cn(commonClassNames.action, "text-green-500")}
                                                    onClick={(e) => handleUpdateLecture(e, lecture._id)}
                                                >
                                                    <IconCheck />
                                                </span>
                                                <span className={cn(commonClassNames.action, "text-red-500")}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLectureIdEdit("")
                                                    }}
                                                >
                                                    <IconCancel />
                                                </span>
                                            </div>
                                        </>
                                    ) :
                                        <>
                                            <div>{lecture.title}</div>
                                            <div className="flex gap-2">
                                                <span className={commonClassNames.action} onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLectureIdEdit(lecture._id);
                                                }}>
                                                    <IconEdit />
                                                </span>
                                                <span className={commonClassNames.action} onClick={e => handleDeleteLecture(e, lecture._id)}>
                                                    <IconDelete />
                                                </span>
                                            </div>
                                        </>
                                    }
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="border-none !bg-transparent text-balance">
                                <div className="flex flex-col gap-5">
                                    {lecture.lessons.map((lesson) => (
                                        <Accordion type="single" key={lesson._id} collapsible={!lessonEdit}>
                                            <AccordionItem value={lesson._id} >
                                                <AccordionTrigger>
                                                    <div className="flex items-center justify-between gap-3 w-full pr-5">
                                                        {lesson._id === lessonIdEdit ? (
                                                            <>
                                                                <div className='w-full'>
                                                                    <Input defaultValue={lecture.title}
                                                                        placeholder='Tên Bài Học...'
                                                                        onChange={(e) => setLessonEdit(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className='flex gap-2'>
                                                                    <span className={cn(commonClassNames.action, "text-green-500")}
                                                                        onClick={(e) => handleUpdateLesson(e, lesson._id)}
                                                                    >
                                                                        <IconCheck />
                                                                    </span>
                                                                    <span className={cn(commonClassNames.action, "text-red-500")}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setLessonIdEdit("")
                                                                        }}
                                                                    >
                                                                        <IconCancel />
                                                                    </span>
                                                                </div>
                                                            </>
                                                        ) :
                                                            <>
                                                                <div>{lesson.title}</div>
                                                                <div className="flex gap-2">
                                                                    <span className={commonClassNames.action} onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setLessonIdEdit(lesson._id);
                                                                    }}>
                                                                        <IconEdit />
                                                                    </span>
                                                                    <span className={commonClassNames.action}
                                                                    // onClick={e => handleDeleteLesson(e, lecture._id)}
                                                                    >
                                                                        <IconDelete />
                                                                    </span>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <LessonItemUpdate lesson={lesson}>

                                                    </LessonItemUpdate>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button className='mt-4 ml-auto w-fit block'
                        onClick={() => handleAddNewLesson(lecture._id, course._id)}>Thêm Bài Giảng Mới</Button>
                </div>

            ))}
            <Button className='mt-4' onClick={handleAddNewLec}>Thêm Chương Mới</Button>
        </div>
    )
}

export default CourseUpdateContent