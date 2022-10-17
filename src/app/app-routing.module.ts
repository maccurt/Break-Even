import { CreditCardCalculatorComponent } from './credit-card/credit-card-calculator/credit-card-calculator.component';
import { HomeComponent } from './home-domain/home/home.component';
import { BreakEvenComponent } from './break-even/break-even.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },
  { path: 'unit-profit', component: BreakEvenComponent },  
  { path: 'credit-card', component: CreditCardCalculatorComponent },  
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
