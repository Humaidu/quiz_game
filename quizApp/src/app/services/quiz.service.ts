import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  apiUrl: string = 'http://localhost:3000/quizzes';
  private quizData: any;


  constructor(private http: HttpClient) {}

  setQuizData(data: any) {
    this.quizData = data;
  }

  getQuizData() {
    return this.quizData;
  }

  // saveCompleteQuizData(data: any): Observable<any> {
  //   // Send HTTP POST request to JSON Server to save complete quiz data
  //   return this.http.post('http://localhost:3000/quizzes', data);
  // }

  createCompleteQuiz(quizData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, quizData, httpOptions);
  }

  getAllQuizzes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getQuizById(quizId:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/quizzes/${quizId}`);
  }
}
