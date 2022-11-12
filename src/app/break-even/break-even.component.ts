import { HelpService } from './../help/help.service';
import { IconService } from './../icon/icon.service';
import { UnitIncomeStatement } from './../unit-income-statement.class';
import { ProfitAnalysisService } from '../profitAnalysis.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { revenueVariableExpenseValidator } from '../validators/revenue-variable-expense.validator';
import { PieChartData, ProfitDreamerChartService } from '../chart/profit-dreamer-chart.service';
import * as Highcharts from 'highcharts';
import { MetaService } from '../shared/meta.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-break-even',
  templateUrl: './break-even.component.html',
  styleUrls: ['./break-even.component.scss']
})
export class BreakEvenComponent {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  incomeStatement!: UnitIncomeStatement;
  unitsToBreakEven?: number;
  showErrors = false;
  chartRef: any;

  revenuePerUnitControl: FormControl<number | null> =
    new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(.1)] });
  variableExpenseControl: FormControl<number | null> =
    new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(.1)] });
  fixedExpenseControl: FormControl<number | null> =
    new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] });
  netIncomeControl: FormControl<number | null> =
    new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] });
  taxRateControl: FormControl<number | null> =
    new FormControl<number | null>(35, { validators: [Validators.required, Validators.min(1), Validators.max(99)] });

  formGroup: FormGroup<{
    revenuePerUnit: FormControl<number | null>;
    variableExpense: FormControl<number | null>;
    fixedExpense: FormControl<number | null>;
    netIncome: FormControl<number | null>;
    taxRate: FormControl<number | null>;
  }>;

  constructor(private formBuilder: FormBuilder,
    private unitService: ProfitAnalysisService,
    private chartService: ProfitDreamerChartService,
    public help: HelpService,
    public icons: IconService,
    private title: Title,
    private metaService: MetaService) {

    this.title.setTitle('Unit Profit');
    this.metaService.addTitle('Unit Profit Calculator');
    this.metaService.addDescription('Calculate How Many Units You Need To Sell To Reach A Certain Net Income');

    this.formGroup = this.formBuilder.group({
      revenuePerUnit: this.revenuePerUnitControl,
      variableExpense: this.variableExpenseControl,
      fixedExpense: this.fixedExpenseControl,
      netIncome: this.netIncomeControl,
      taxRate: this.taxRateControl,
    });

    this.formGroup.addValidators(revenueVariableExpenseValidator());
  }

  isInvalid = (control: AbstractControl): boolean => {
    return (control.touched && control.invalid) || (control.invalid && this.showErrors);
  };

  isVariableExpenseValid = (control: AbstractControl): boolean => {

    //TODO remove this magic string out of here
    return this.isInvalid(control) ||
      (control.touched && this.formGroup.errors && this.formGroup.errors['variableExpenseError']);
  };

  submit = () => {
    if (this.formGroup.valid) {
      this.showErrors = false;

      let rpu = this.formGroup.value.revenuePerUnit!;
      let ve = this.formGroup.value.variableExpense!;
      let fe = this.formGroup.value.fixedExpense!;
      let ni = this.formGroup.value.netIncome!;
      let taxRate = this.formGroup.value.taxRate!;

      this.incomeStatement = this.unitService.unitsIncomeStatementNetIcome(rpu, ve, fe, ni, taxRate);

      let data: PieChartData[] = [
        { name: 'Variable Expense', y: this.incomeStatement.variableExpense, color: '#ffcccc' },
        { name: 'Fixed Expense', y: this.incomeStatement.fixedExpense, color: '#ffe6cc' },
        { name: 'Taxes', y: this.incomeStatement.incomeTax, color: '#cce0ff' },
        { name: 'Net Income', y: this.incomeStatement.netIncome, color: '#4d4d4d', sliced: true }
      ];

      this.chartOptions = this.chartService.pieChartOptions('Revenue Break Down', data);
    }
    else {
      this.showErrors = true;
    }
  };
}