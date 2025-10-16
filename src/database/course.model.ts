import { ECourseLevel, ECourseStatus } from "@/types/enums";

export interface ICourse extends Document {
    _id: string,
    title: string,
    image: string;
    intro_url: string;
    desc: string;
    price: number;
    sale_price: number;
    slug: string;
    status: ECourseStatus;
    level: ECourseLevel;
    views: number;
}