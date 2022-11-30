import { ControlsModule } from './../controls/controls.module';
import { IconModule } from './../icon/icon.module';
import { MaterialModule } from './../material/material.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreakEvenComponent } from '../break-even/break-even.component';
import { AboutComponent } from './about/about.component';
import { SevenHabitsComponent } from './seven-habits/seven-habits.component';
import { ChartModule } from '../chart/chart.module';
const routes: Routes = [
  { path: 'unit-profit', component: BreakEvenComponent }
];

@NgModule({
  declarations: [HomeComponent, AboutComponent, SevenHabitsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule,
    RouterModule,
    ControlsModule,
    ChartModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
