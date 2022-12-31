import { TesterComponent } from './tester/tester.component';
import { SevenHabitsComponent } from './home-domain/seven-habits/seven-habits.component';
import { CreditCardCalculatorComponent } from './credit-card/credit-card-calculator/credit-card-calculator.component';
import { HomeComponent } from './home-domain/home/home.component';
import { BreakEvenComponent } from './break-even/break-even.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './home-domain/about/about.component';
import { CreditCardWizardComponent } from './credit-card/credit-card-wizard/credit-card-wizard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TesterComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'unit-profit', component: BreakEvenComponent },
  { path: 'credit-card', component: CreditCardCalculatorComponent },
  { path: 'credit-card-wizard', component: CreditCardWizardComponent },
  { path: 'credit-card-devil', component: CreditCardWizardComponent },
  { path: 'the-7-habits', component: SevenHabitsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
