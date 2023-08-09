import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  apiUrl: string = 'http://localhost:3000';
  private quizData: any;


  constructor(private http: HttpClient) {}

  setQuizData(data: any) {
    this.quizData = data;
  }

  getQuizData() {
    return this.quizData;
  }


  createQuiz(quiz: Quiz): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(`${this.apiUrl}/quizzes`, quiz, httpOptions);
  }

  createQuestiion(question: Question, quizId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(`${this.apiUrl}/questions`, { ...question, quizId}, httpOptions);
  }

  getAllQuizzes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quizzes`);
  }

  getQuizById(quizId:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quizzes/${quizId}`);
  }

  getQuestionsByQuiz(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions?quizId=${quizId}`);
  }
}
