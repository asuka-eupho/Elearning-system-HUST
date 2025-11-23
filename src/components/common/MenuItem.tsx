import React from 'react'
import ActiceLink from './ActiveLink';

interface MenuItemProps {
    url: string;
    title: string;
    icon: React.ReactNode;
    onlyIcon?: boolean;
}

const MenuItem = ({ icon, onlyIcon, title = '', url = '/' }: MenuItemProps) => {
    return (
        <li>
            <ActiceLink url={url}>
                {icon}
                {onlyIcon ? null : title}
            </ActiceLink>
        </li>
    )
}

export default MenuItem