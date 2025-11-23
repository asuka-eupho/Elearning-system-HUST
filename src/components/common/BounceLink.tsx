import Link from 'next/link'
import React from 'react'
import { IconPlus } from '../icons'

const BounceLink = ({ url }: { url: string }) => {
    return (
        <>
            <Link className="flexCenter fixed bottom-5 right-5 size-16 animate-bounce rounded-full bg-primary text-white"
                href={url}>
                <IconPlus />
            </Link>
        </>

    )
}

export default BounceLink