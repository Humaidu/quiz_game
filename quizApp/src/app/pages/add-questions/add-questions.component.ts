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
  question: string ='';
  optionA: string = '';
  optionB: string = '';
  optionC: string = '';
  optionD: string = '';
  answer: string = '';
  options: any = [];

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
    this.optionA = this.questionForm.value.optionA?.trim()!;
    this.optionB = this.questionForm.value.optionB?.trim()!;
    this.optionC = this.questionForm.value.optionC?.trim()!;
    this.optionD = this.questionForm.value.optionD?.trim()!;
    this.answer = this.questionForm.value.answer?.trim()!;
    this.question = this.questionForm.value.question?.trim()!;

    const optionsData : any = [
      this.optionA, this.optionB, this.optionC, this.optionD
    ]
    const questionData: any = {
      question: this.question,
      options: optionsData,
      answer: this.answer
    }
    const quizQuestionData: any = {
      ...this.quizService.getQuizData(),
      questions: [questionData]
    };
    this.quizService.createCompleteQuiz(quizQuestionData).subscribe((res) => {
      console.log(res);
      alert('Question Succesfully Created');
    });
    this.questionForm.reset();
  }
}
