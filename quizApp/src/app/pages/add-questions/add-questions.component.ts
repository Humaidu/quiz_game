import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css'],
})
export class AddQuestionsComponent implements OnInit {
  questionData: any;

  constructor(private quizService: QuizService, private fb: FormBuilder) {}

  questionForm = this.fb.group({
    question: ['', Validators.required],
    optionA: ['', Validators.required],
    optionB: ['', Validators.required],
    optionC: ['', Validators.required],
    optionD: ['', Validators.required],
    answer: ['', Validators.required],
  });

  ngOnInit() {}

  createQuizAndQuestion() {
    this.questionData = this.questionForm.value;
    const quizQuestionData: any = {
      ...this.quizService.getQuizData(),
      question: this.questionData,
    };
    this.quizService.createCompleteQuiz(quizQuestionData).subscribe((res) => {
      console.log(res);
      alert('Question Succesfully Created');
    });
    this.questionForm.reset();
  }
}
