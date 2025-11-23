import HeadingView from '@/components/common/HeadingView';
import CourseCreateNew from '@/components/course/CourseCreateNew';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {
    const { userId } = await auth();
    if (!userId) return null;
    const mongoUser = await getUserInfo({ userId });
    if (!mongoUser) return null;
    return (
        <div>
            <HeadingView>Tạo Khóa Học Mới</HeadingView>
            <CourseCreateNew user={JSON.parse(JSON.stringify(mongoUser))}></CourseCreateNew>
        </div>
    )
}

export default page