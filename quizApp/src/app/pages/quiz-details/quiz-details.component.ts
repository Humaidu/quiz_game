import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
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
  shuffleQuestions: Question[] = [];
  selectedQuizType: any;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizById(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        this.selectedQuizType = data.quiz_type;
        console.log(this.quiz);
      },
      (err) => {
        console.error('Error loading quiz:', err);
      }
    );

    this.quizService.getQuestionsByQuiz(this.quizId).subscribe((questions) => {
      this.shuffleQuestions = this.shuffleQuestion(questions);
      // this.questions = questions
      this.questions = this.shuffleQuestions;
    });
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

  retryQuiz() {
    this.currentQuestionIndex = 0;
    this.questions = this.shuffleQuestions;
  }

  private shuffleQuestion(array: any[]): any {
    let currentIndex = array.length,
      randomIndex,
      tempValue;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  }

  submitQuiz() {
    console.log(this.selectedQuizType);
    if (this.selectedQuizType == 'multiple_choice') {
      this.score = 0;
      this.questions.forEach((question: any, index: any) => {
        if (this.answers[index] === question.answer) {
          this.score++;
        }
      });
      this.currentQuestionIndex = this.questions.length;
    } else {
      alert('Quiz Submitted');
    }
  }
}
