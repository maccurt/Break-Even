import { CreditCardEffects } from './credit-card-state/credit-card.effects';
import { StoreModule } from '@ngrx/store';
import { ChartModule } from './../chart/chart.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardCalculatorComponent } from './credit-card-calculator/credit-card-calculator.component';
import { CreditCardScheduleListComponent } from './credit-card-schedule-list/credit-card-schedule-list.component';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../controls/controls.module';
import { TimeCardComponent } from './time-card/time-card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';
import { IconModule } from '../icon/icon.module';
import { CreditCardScheduleComponent } from './credit-card-schedule/credit-card-schedule.component';
import { MinimumPaymentTrapSectionComponent } from './minimum-payment-trap-section/minimum-payment-trap-section.component';
import { CreditCardDevilSectionComponent } from './credit-card-devil-section/credit-card-devil-section.component';
import { InterestSavedSectionComponent } from './interest-saved-section/interest-saved-section.component';
import { TimeSavedSectionComponent } from './time-saved-section/time-saved-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { creditCardFeatureKey, creditCardReducer } from './credit-card-state/credit-card.reducers';
import { CreditCardWizardComponent } from './credit-card-wizard/credit-card-wizard.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { EffectsModule } from '@ngrx/effects';
import { MinimumPaymentCalculationComponent } from './minimum-payment-calculation/minimum-payment-calculation.component';
import { CcWizardSummaryComponent } from './cc-wizard-summary/cc-wizard-summary.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { CreditCardIntroRateComponent } from './credit-card-intro-rate/credit-card-intro-rate.component';

@NgModule({
  declarations: [
    CreditCardCalculatorComponent,    
    CreditCardScheduleListComponent,
    TimeCardComponent,
    ScheduleCardComponent,
    CreditCardScheduleComponent,
    MinimumPaymentTrapSectionComponent,
    CreditCardDevilSectionComponent,
    InterestSavedSectionComponent,
    TimeSavedSectionComponent,
    CreditCardWizardComponent,
    ScheduleItemComponent,
    MinimumPaymentCalculationComponent,
    CcWizardSummaryComponent,
    CreditCardFormComponent,
    CreditCardIntroRateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    RouterModule,
    HighchartsChartModule,
    MaterialModule,
    IconModule,
    ChartModule,
    StoreModule.forFeature(creditCardFeatureKey, creditCardReducer),
    EffectsModule.forFeature([CreditCardEffects]),
  ],
  exports: [
    CreditCardCalculatorComponent,    
    CreditCardScheduleListComponent,
    TimeCardComponent
  ]
})
export class CreditCardModule { }