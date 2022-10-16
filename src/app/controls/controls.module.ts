import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupInputComponent } from './form-group-input/form-group-input.component';
import { NumericInputDirective } from './directives/numeric-input.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalculatorWrapperComponent } from './calculator-wrapper/calculator-wrapper.component';

@NgModule({
  declarations: [
    FormGroupInputComponent,
    NumericInputDirective,
    CalculatorWrapperComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    FormGroupInputComponent,
    NumericInputDirective,
    CalculatorWrapperComponent
  ]
})
export class ControlsModule { }
