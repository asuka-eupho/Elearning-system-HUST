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
    title: string,
    value: ECourseStatus
}[] = [
        {
            title: "Đã duyệt",
            value: ECourseStatus.APPROVED
        },
        {
            title: "Chờ phê duyệt",
            value: ECourseStatus.PENDING
        },
        {
            title: "Từ chối",
            value: ECourseStatus.REJECTED
        }
    ];
export const courseLevel: {
    title: string,
    value: ECourseLevel
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