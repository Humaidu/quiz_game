import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css'],
})
export class QuizDetailsComponent implements OnInit {
  quizId: any;
  quiz: any = {};
  answers: any = {};
  questions: any = {};
  currentQuestionIndex: number = 0;
  score: number = 0;
  alphabets = ['A', 'B', 'C', 'D'];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizById(this.quizId).subscribe((data) => {
      this.quiz = data;
      console.log(this.quiz);
    }, (err)=>{
      console.error('Error loading quiz:', err);
    });

    this.quizService.getQuestionsByQuiz(this.quizId).subscribe((questions) => {
      this.questions = questions
    })
  }

  prevQuestion() {
    this.currentQuestionIndex--;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }

  getOptionLabel(index: number): string {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index];
  }
  

  submitQuiz() {
    this.score = 0;
    this.questions.forEach((question: any, index: any) => {
      if (this.answers[index] === question.answer) {
        this.score++;
      }
    });
    this.currentQuestionIndex = this.questions.length; 
  }
}
