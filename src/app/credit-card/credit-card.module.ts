import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardCalculatorComponent } from './credit-card-calculator/credit-card-calculator.component';
import { CreditCardMinimumPaymentComponent } from './credit-card-minimum-payment/credit-card-minimum-payment.component';
import { CreditCardScheduleListComponent } from './credit-card-schedule-list/credit-card-schedule-list.component';
import { InterestSavingsComponent } from './interest-savings/interest-savings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../controls/controls.module';
import { TimeCardComponent } from './time-card/time-card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';
import { IconModule } from '../icon/icon.module';
import { CreditCardScheduleComponent } from './credit-card-schedule/credit-card-schedule.component';
import { MinimumPaymentTrapSectionComponent } from './minimum-payment-trap-section/minimum-payment-trap-section.component';
import { CreditCardDevilSectionComponent } from './credit-card-devil-section/credit-card-devil-section.component';

@NgModule({
  declarations: [
    CreditCardCalculatorComponent,
    CreditCardMinimumPaymentComponent,
    CreditCardScheduleListComponent,
    InterestSavingsComponent,
    TimeCardComponent,
    ScheduleCardComponent,    
    CreditCardScheduleComponent, MinimumPaymentTrapSectionComponent, CreditCardDevilSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    RouterModule,
    HighchartsChartModule,
    MaterialModule,
    IconModule
  ],
  exports: [
    CreditCardCalculatorComponent,
    CreditCardMinimumPaymentComponent,    
    CreditCardScheduleListComponent,
    InterestSavingsComponent,
    TimeCardComponent
  ]
})
export class CreditCardModule { }