"use client";
import { TActiveLinkProps } from '@/types';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const ActiceLink = ({ url, children }: TActiveLinkProps) => {
    const pathname = usePathname()
    const isActive = url === pathname
    return (
        <Link href={url}
            className={`p-3 rounded-md flex items-center gap-3 transition-all dark:text-grayDark
            ${isActive ? "!text-primary bg-primary bg-opacity-10 svg-animate" : " hover:!text-primary hover:!bg-primary hover:!bg-opacity-10"}`} >
            {children}
        </Link >
    )
}

export default ActiceLink