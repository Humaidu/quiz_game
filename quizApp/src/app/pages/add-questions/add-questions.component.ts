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
  question: string = '';
  optionA: string = '';
  optionB: string = '';
  optionC: string = '';
  optionD: string = '';
  answer: string = '';
  options: any = [];
  quizId: any;
  quizId2: any;
  quiz:any;
  questions: any;

  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  questionForm = this.fb.group({
    question: ['', Validators.required],
    optionA: ['', Validators.required],
    optionB: ['', Validators.required],
    optionC: ['', Validators.required],
    optionD: ['', Validators.required],
    answer: ['', Validators.required],
  });

  ngOnInit() {
    this.quizId2 = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizById(this.quizId2).subscribe((data) => {
      this.quiz = data;
    });

    this.quizService.getQuestionsByQuiz(this.quizId2).subscribe((questions) => {
      this.questions = questions
    })
  }

  getOptionLabel(index: number): string {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index];
  }

  createQuizAndQuestion() {

    this.optionA = this.questionForm.value.optionA?.trim()!;
    this.optionB = this.questionForm.value.optionB?.trim()!;
    this.optionC = this.questionForm.value.optionC?.trim()!;
    this.optionD = this.questionForm.value.optionD?.trim()!;
    this.answer = this.questionForm.value.answer?.trim()!;
    this.question = this.questionForm.value.question?.trim()!;

    const questionData = {
      question: this.question,
      options: [this.optionA, this.optionB, this.optionC, this.optionD],
      answer: this.answer,
    };
    console.log('questionData: ', questionData);

    this.route.params.subscribe((params) => {
      this.quizId = +params['id'];
    });

    this.quizService
      .createQuestiion(questionData, this.quizId)
      .subscribe((res) => {
        console.log('quizQuestionData: ',res);
        alert('Question added successfully');
      });

    this.questionForm.reset();
  }
}
