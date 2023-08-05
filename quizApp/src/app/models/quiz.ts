import { Time } from "@angular/common";

export interface Quiz {
    quiz_title: string,
    description: string,
    category: string,
    duration: number,
    questions: [string, string, string,string]
}
