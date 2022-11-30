import { RouterModule } from '@angular/router';
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
import { FormInputComponent } from './form-input/form-input.component';
import { ColumnResponsiveDirective } from './directives/colum-directives/column-responsive.directive';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    FormGroupInputComponent,
    FormInputComponent,
    InputComponent,
    NumericInputDirective,
    ColumnResponsiveDirective,
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
    HelpModule,
    RouterModule
  ],
  exports: [
    FormGroupInputComponent,
    NumericInputDirective,
    ColumnResponsiveDirective,
    CalculatorWrapperComponent,
    StatSectionComponent,
    InfoSectionComponent,
    FormInputComponent,
    InputComponent
  ]
})
export class ControlsModule { }
