import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  quizData!: any;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  quizForm = this.fb.group({
    quiz_title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    duration: ['', Validators.required],
  });

  ngOnInit() {}

  createQuizData() {
    this.quizData = this.quizForm.value;
    this.quizService.createQuiz(this.quizData).subscribe((quiz)=>{
      this.router.navigate(['/add-question', quiz.id]);
      alert('Quiz Succesfully Created');
    })

    this.quizForm.reset();
  }
}
