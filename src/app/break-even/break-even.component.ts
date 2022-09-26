import { UnitService } from './../unit.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { revenueVariableExpenseValidator } from '../validators/revenue-variable-expense.validator';

@Component({
  selector: 'app-break-even',
  templateUrl: './break-even.component.html',
  styleUrls: ['./break-even.component.scss']
})
export class BreakEvenComponent {

  unitsToBreakEven?: number;
  showErrors = false;
  //form set up
  formGroup: FormGroup<{
    revenuePerUnit: FormControl<number>;
    variableExpense: FormControl<number>;
    fixedExpense: FormControl<number>;
  }>;

  constructor(private formBuilder: FormBuilder,
    private unitService: UnitService) {

    this.formGroup = this.formBuilder.group({
      revenuePerUnit: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      //variable expense
      variableExpense: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)]
      }),

      fixedExpense: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] })
    });

    this.formGroup.addValidators(revenueVariableExpenseValidator());
  }

  isInvalid = (control: AbstractControl): boolean => {
    return (control.touched && control.invalid) || (control.invalid && this.showErrors);
  };

  isVariableExpenseValid = (control: AbstractControl): boolean => {

    return this.isInvalid(control) ||
      (control.touched && this.formGroup.errors && this.formGroup.errors['variableExpenseError']);

  };

  submit = () => {
    if (this.formGroup.valid) {
      let rpu = this.formGroup.value.revenuePerUnit!;
      let ve = this.formGroup.value.variableExpense!;
      let fe = this.formGroup.value.fixedExpense!;
      this.unitsToBreakEven = this.unitService.breakEvenUnits(rpu, ve, fe);
    }
  };
}