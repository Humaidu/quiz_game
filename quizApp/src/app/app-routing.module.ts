import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { AddQuestionsComponent } from './pages/add-questions/add-questions.component';
import { authGuard } from './shared/auth.guard';
import { QuizDetailsComponent } from './pages/quiz-details/quiz-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'create', component: CreateQuizComponent},
  { path: 'add-question/:id', component: AddQuestionsComponent},
  {path: 'quiz-details/:id', component: QuizDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
