import { IconModule } from './../icon/icon.module';
import { MaterialModule } from './../material/material.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreakEvenComponent } from '../break-even/break-even.component';
const routes: Routes = [
  { path: 'unit-profit', component: BreakEvenComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule,
    RouterModule    
  ],
  exports: [
    HomeComponent    
  ]
})
export class HomeModule { }
