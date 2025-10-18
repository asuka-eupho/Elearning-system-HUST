import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {
    const { userId } = await auth();
    if (!userId) return null;
    const mongoUser = await getUserInfo({ userId });
    if (!mongoUser) return null;
    return (
        <div>page</div>
    )
}

export default page