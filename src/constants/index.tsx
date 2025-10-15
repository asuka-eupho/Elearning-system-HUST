import { IconPlay, IconExplore } from "@/components/icons";
import { TMenuItem } from "@/types";

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
]