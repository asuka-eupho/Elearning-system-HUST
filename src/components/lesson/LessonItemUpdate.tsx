"use client";
import { ILesson } from '@/database/lesson.model'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { updateLesson } from '@/lib/actions/lesson.action';
import { editorOptions } from '@/constants';
import { useTheme } from 'next-themes';


const formSchema = z.object({
    slug: z.string().optional(),
    duration: z.number().optional(),
    video_url: z.string().optional(),
    content: z.string().optional()

});

const LessonItemUpdate = ({ lesson }: {
    lesson: ILesson
}) => {
    const editorRef = useRef<any>(null);
    const theme = useTheme()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: lesson.slug,
            video_url: lesson.video_url,
            duration: lesson.duration,
            content: lesson.content
        }
    });

    useEffect(() => {
        if (editorRef.current) {
            setTimeout(() => {
                editorRef.current.setContent(lesson.content)
            }, 1000)
        }
    }, [lesson.content])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await updateLesson({
                lessonId: lesson._id,
                updateData: values
            })
            if (res?.success) {
                toast.success("Cập nhật thành công!")
            }

        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Đường dẫn - Slug *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tên khóa học" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời lượng bài học *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Thời lượng (phút)" {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="video_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video URL *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Video link/source" {...field}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className='col-start-1 col-end-3'>
                                    <FormLabel>Nội dung</FormLabel>
                                    <FormControl>
                                        <Editor
                                            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                                            onInit={(_evt: any, editor: any) => {
                                                (editorRef.current = editor).setContent(
                                                    lesson.content || ""
                                                );
                                            }}
                                            value={field.value}
                                            {...editorOptions(field, theme)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end gap-5 items-center mt-5">
                        <Button type='submit'></Button>
                        <Link href="/" className='text-sm text-slate-600'>Xem trước</Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LessonItemUpdate