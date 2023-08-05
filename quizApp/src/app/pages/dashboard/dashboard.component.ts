import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quizzes:any; //

  constructor(private quizService: QuizService, private router: Router){}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((data)=>{
      this.quizzes = data
    })
  }

}
