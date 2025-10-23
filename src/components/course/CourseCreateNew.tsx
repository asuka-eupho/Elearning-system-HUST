"use client"
import { IUser } from '@/database/user.model';
import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '../ui/button';
import { toast } from "react-toastify";
import slugify from "slugify";
import { useRouter } from 'next/router';
import { createCourse } from '@/lib/actions/course.action';

const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
    slug: z.string().optional(),
});

const CourseCreateNew = ({ user }: { user: IUser }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const data = {
                title: values.title,
                slug:
                    values.slug ||
                    slugify(values.title, {
                        lower: true,
                        locale: "vi",
                    }),
                author: user._id,
            };
            const res = await createCourse(data);
            if (!res?.success) {
                toast.error(res?.message);
                return;
            }
            toast.success("Tạo khóa học thành công");
            if (res?.data) {
                router.push(`/manage/course/update?slug=${res.data.slug}`);
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên khóa học *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên khóa học" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Đường dẫn khóa học</FormLabel>
                                <FormControl>
                                    <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    isLoading={isSubmitting}
                    variant="primary"
                    type="submit"
                    className="w-[120px]"
                    disabled={isSubmitting}
                >
                    Tạo khóa học
                </Button>
            </form>
        </Form>
    )
}

export default CourseCreateNew