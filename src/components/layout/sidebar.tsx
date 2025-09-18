import { menuItems } from '@/constants';
import React from 'react'

const Sidebar = () => {
    return (
        <div className='p-4 border-r border-r-gray-300'>
            <a href="/" className='font-bold flex items-center text-2xl mb-2 '>
                <img className='size-20' src="https://upload.wikimedia.org/wikipedia/vi/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg" alt="" />
                HUST Elearning
            </a>
            <ul className='flex flex-col gap-3'>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        url={item.url}
                        title={item.title}
                        icon={item.icon}
                    />
                ))}
            </ul>
        </div>
    )
}
function MenuItem({
    url = "/",
    title = "",
    icon
}: {
    url: string;
    title: string;
    icon?: React.ReactNode
}) {
    return (
        <li>
            <a href={url} className='p-3 rounded-md flex items-center gap-3 hover:text-primary hover:bg-primary hover:bg-opacity-10'>
                {icon}
                {title}
            </a>
        </li>
    )
}

export default Sidebar