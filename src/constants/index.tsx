import { IconPlay, IconExplore } from "@/components/icons";
import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

export const menuItems: TMenuItem[] = [
    {
        url: "/",
        title: "Khám phá",
        icon: <IconPlay className="size-5" />
    },
    {
        url: "/explore",
        title: "Khu Vực Học Tập",
        icon: <IconExplore className="size-5" />
    }
];
export const courseStatus: {
    title: string;
    value: ECourseStatus;
    className?: string
}[] = [
        {
            title: "Đã duyệt",
            value: ECourseStatus.APPROVED,
            className: "text-green-500 bg-green-500"
        },
        {
            title: "Chờ phê duyệt",
            value: ECourseStatus.PENDING,
            className: "text-yellow-500 bg-yellow-500"
        },
        {
            title: "Từ chối",
            value: ECourseStatus.REJECTED,
            className: "text-red-500 bg-red-500"
        }
    ];
export const courseLevel: {
    title: string;
    value: ECourseLevel;
}[] = [
        {
            title: "Dễ, Cơ bản",
            value: ECourseLevel.BEGINNER
        },
        {
            title: "Trung bình, Khá",
            value: ECourseLevel.INTERMEDIATE
        },
        {
            title: "Nâng cao",
            value: ECourseLevel.ADVANCED
        }
    ];
export const courseLevelTitle: Record<ECourseLevel, string> = {
    [ECourseLevel.BEGINNER]: "Cơ bản",
    [ECourseLevel.INTERMEDIATE]: "Trung bình-Khá",
    [ECourseLevel.ADVANCED]: "Nâng cao",
}

export const commonClassNames = {
    status: 'bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-nowrap',
    paginationButton: "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary",
    action: "size-9 rounded-md border flex items-center justify-center p-2 text-gray-500 hover:border-opacity-90 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20"
}