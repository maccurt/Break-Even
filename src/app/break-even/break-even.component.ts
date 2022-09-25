import { UnitService } from './../unit.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-break-even',
  templateUrl: './break-even.component.html',
  styleUrls: ['./break-even.component.scss']
})
export class BreakEvenComponent implements OnInit {

  unitsToBreakEven?: number;

  formGroup: FormGroup<{
    revenuePerUnit: FormControl<number>;
    variableExpense: FormControl<number>;
    fixedExpense: FormControl<number>;
  }>;

  constructor(private formBuilder: FormBuilder,
    private unitService: UnitService) {

    this.formGroup = this.formBuilder.group({
      revenuePerUnit: new FormControl(0, { nonNullable: true }),
      variableExpense: new FormControl(0, { nonNullable: true }),
      fixedExpense: new FormControl(0, { nonNullable: true })
    });
  }

  ngOnInit(): void {

  }

  submit = () => {

    if (this.formGroup.valid) {
      let rpu = this.formGroup.value.revenuePerUnit!;
      let ve = this.formGroup.value.variableExpense!;
      let fe = this.formGroup.value.fixedExpense!;
      this.unitsToBreakEven = this.unitService.breakEvenUnits(rpu, ve, fe);

    }
  }
}