import Sidebar from '@/components/layout/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] h-screen">
            <div></div>
            <Sidebar />
            <main className='p-4'>{children}</main>
        </div>
    )
}

export default layout