import { HelpModule } from './../help/help.module';
import { IconModule } from './../icon/icon.module';
import { MaterialModule } from './../material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupInputComponent } from './form-group-input/form-group-input.component';
import { NumericInputDirective } from './directives/numeric-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorWrapperComponent } from './calculator-wrapper/calculator-wrapper.component';
import { StatSectionComponent } from './stat-section/stat-section.component';
import { InfoSectionComponent } from './info-section/info-section.component';

@NgModule({
  declarations: [
    FormGroupInputComponent,
    NumericInputDirective,
    CalculatorWrapperComponent,
    StatSectionComponent,
    InfoSectionComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconModule,
    HelpModule
  ],
  exports: [
    FormGroupInputComponent,
    NumericInputDirective,
    CalculatorWrapperComponent,
    StatSectionComponent,
    InfoSectionComponent
  ]
})
export class ControlsModule { }
