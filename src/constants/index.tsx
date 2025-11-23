import { IconPlay, IconExplore } from "@/components/icons";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

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
export const editorOptions = (field: any, theme: any) => ({
    initialValue: "",
    onBlur: field.onBlur,
    onEditorChange: (content: any) => field.onChange(content),
    init: {
        codesample_global_prismjs: true,
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        height: 300,
        menubar: false,
        plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "heading",
        ],
        toolbar:
            "undo redo | " +
            "codesample | bold italic forecolor | alignleft aligncenter |" +
            "alignright alignjustify | bullist numlist |" +
            "image |" +
            "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
            "link",
        content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
    },
});

