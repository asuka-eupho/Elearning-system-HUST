import { menuItems } from '@/constants';
import Link from 'next/link';
import React from 'react'
import ActiceLink from '../common/ActiveLink';
import { TMenuItem } from '@/types';
import { ModeToggle } from '../common/ModeToggle';
import { useAuth, UserButton } from '@clerk/nextjs';
import { IconUsers } from '../icons';

const Sidebar = () => {
    const { userId } = useAuth()
    return (
        <div className='hidden p-4 border-r borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]'>
            <a href="/" className='font-bold flex items-center text-2xl mb-2 '>
                <img className='size-20' src="https://upload.wikimedia.org/wikipedia/vi/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg" alt="" />
                <span className='text-primary'>H</span>
                UST Elearning
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
            <div className='flex items-center justify-end gap-2'>
                <ModeToggle></ModeToggle>
                {!userId ? (
                    <Link href="/sign-in"
                        className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"><IconUsers />Sign In</Link>
                ) : <UserButton />}

            </div>
        </div>
    )
}
export function MenuItem({
    url = "/",
    title = "",
    icon,
    onlyIcon
}: TMenuItem) {
    return (
        <li>
            <ActiceLink url={url}>
                {icon}
                {onlyIcon ? null : title}
            </ActiceLink>
        </li>
    )
}

export default Sidebar