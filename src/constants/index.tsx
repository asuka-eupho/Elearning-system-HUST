import IconExplore from "@/components/icons/icon.explore";
import IconPlay from "@/components/icons/icon.play";

export const menuItems: {
    url: string;
    title: string;
    icon: React.ReactNode;
}[] = [
        {
            url: "/",
            title: "Khu vực học tập",
            icon: <IconPlay className="size-5" />
        },
        {
            url: "/explore",
            title: "Khám phá thêm",
            icon: <IconExplore className="size-5" />
        }
    ]