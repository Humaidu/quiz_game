import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {

  quizId: string = '';
  quiz: any = [];

  constructor(private quizService: QuizService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizById(this.quizId).subscribe((data)=>{
      this.quiz = data;
      console.log(this.quiz);
    })
  }

}
