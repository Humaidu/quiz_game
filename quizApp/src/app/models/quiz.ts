import { Time } from "@angular/common";

export interface Quiz {
    id?: number,
    quiz_title: string,
    description: string,
    category: string,
    duration: number,
}
