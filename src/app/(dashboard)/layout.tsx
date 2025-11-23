import MenuItem from '@/components/common/MenuItem'
import Sidebar from '@/components/layout/sidebar'
import { menuItems } from '@/constants/menu-constant'

import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="wrapper block pb-20 lg:pb-0 lg:grid grid-cols-[300px,minmax(0,1fr)] h-screen">
            <Sidebar />
            <ul className="flex p-3 bgDrakMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16 z-50">
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        url={item.url}
                        title={item.title}
                        icon={item.icon}
                        onlyIcon
                    />
                ))}
            </ul>
            <div className='hidden lg:block'></div>
            <main className='p-4'>{children}</main>
        </div>
    )
}

export default layout