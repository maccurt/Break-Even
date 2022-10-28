import { HelpService } from './../../help/help.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MinimumPaymentType } from './credit-card.types';
import { MathService } from 'src/app/math/math.service';
import { MetaService } from '../../shared/meta.service';
import { PaymentService } from '../../shared/payment.service';
import { ScheduleCompare } from '../../shared/schedule-compare.type';
import { ActivatedRoute } from '@angular/router';
import { FormInput, FormInputType } from '../../controls/form-input';
import { PieChartData, ProfitDreamerChartService } from 'src/app/chart.service';

const extra = 'extra';
export enum PaymentType {
  MinimumPaymentOnly = 1,
  MinimumPaymentPlusExtra,
  FixedPayment
}

@Component({
  selector: 'app-credit-card-calculator',
  templateUrl: './credit-card-calculator.component.html',
  styleUrls: ['./credit-card-calculator.component.scss']
})
export class CreditCardCalculatorComponent implements OnInit {
  // controls
  creditCardFormGroup!: FormGroup;
  balanceControl!: FormInput;
  interestRateControl!: FormControl<any>;
  minimumPaymentTypeControl!: FormControl;
  paymentTypeControl!: FormControl;
  extraPaymentControl!: FormControl;
  fixedPaymentControl!: FormControl;

  minimumPaymentTypeList: MinimumPaymentType[] = [];
  showErrors!: boolean;
  showResults = false;
  showSummary = true;
  showExtraPayment = true;
  minimumPaymentMode = false;
  isFixedPayment = false;
  //
  scheduleCompare!: ScheduleCompare;
  minimumPayment = 0;
  payment = 0;
  fixedPaymentError = '';
  showPaymentInput!: boolean;

  constructor(
    private title: Title,
    private metaService: MetaService,
    private mathService: MathService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    public help: HelpService) {
    this.title.setTitle('Credit Card Calculator');
    this.metaService.addTitle('Credit Card Calculator');
    this.metaService.addDescription('Calculates your credit card interest and how many years it will take to pay off');
  }

  ngOnInit(): void {
    this.minimumPaymentTypeList = this.paymentService.getMinimumPaymentTypeList();
    this.balanceControl = new FormInput(FormInputType.CreditCardBalance);
    this.interestRateControl = new FormInput(FormInputType.CreditCardInterestRate);
    this.minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);

    this.paymentTypeControl = new FormControl(null, [Validators.required]);
    this.extraPaymentControl = new FormControl('');
    this.fixedPaymentControl = new FormControl('');

    this.creditCardFormGroup = new FormGroup({
      balance: this.balanceControl,
      interestRate: this.interestRateControl,
      minimumPaymentType: this.minimumPaymentTypeControl,
      extraPayment: this.extraPaymentControl,
      paymentType: this.paymentTypeControl,
      fixedPayment: this.fixedPaymentControl
    });

    this.minimumPaymentTypeControl.valueChanges.subscribe(() => {
      this.calculateMinimumPayment();
    });

    this.paymentTypeControl.valueChanges.subscribe(this.setPaymentType);
    this.paymentTypeControl.setValue(PaymentType.MinimumPaymentOnly.toString());

    this.activatedRoute.queryParams.subscribe(params => {
      const { demo } = params;
      if (demo === '1') {
        this.demoMinimumPaymentOnly();
      }
      if (demo === '2') {
        this.demoExtraPayment();
      }
    });
    this.calculateMinimumPayment();
    this.calculatePayment();    
  }

  demoExtraPayment = (): void => {

    this.paymentTypeControl.setValue(PaymentType.MinimumPaymentPlusExtra.toString());
    this.balanceControl.setValue(10000);
    this.interestRateControl.setValue(15);
    this.extraPaymentControl.setValue(100);
    this.calculateMinimumPayment();
    this.calculate();

  };

  demoMinimumPaymentOnly = (): void => {
    this.paymentTypeControl.setValue(PaymentType.MinimumPaymentOnly.toString());
    this.balanceControl.setValue(10000);
    this.interestRateControl.setValue(15);
    this.extraPaymentControl.setValue(100);
    this.calculateMinimumPayment();
    this.calculate();
  };

  setPaymentType = () => {

    const paymentType = this.mathService.getFloat(this.paymentTypeControl.value);

    switch (paymentType) {
      case PaymentType.MinimumPaymentOnly:
        this.showPaymentInput = true;
        this.extraPaymentControl.clearValidators();
        this.extraPaymentControl.updateValueAndValidity();
        this.fixedPaymentControl.clearValidators();
        this.fixedPaymentControl.updateValueAndValidity();
        break;
      case PaymentType.MinimumPaymentPlusExtra:
        this.showPaymentInput = false;
        this.fixedPaymentControl.clearValidators();
        this.fixedPaymentControl.updateValueAndValidity();
        this.extraPaymentControl.setValidators([Validators.min(1), Validators.max(99999), Validators.required]);
        this.extraPaymentControl.updateValueAndValidity();
        this.showExtraPayment = true;
        break;
      case PaymentType.FixedPayment:
        this.showPaymentInput = false;
        this.extraPaymentControl.clearValidators();
        this.extraPaymentControl.updateValueAndValidity();
        this.fixedPaymentControl.setValidators(this.validateFixedPayment as any); //TODO does making this any break it
        this.fixedPaymentControl.updateValueAndValidity();
        this.showExtraPayment = false;
        break;
    }

    this.calculatePayment();
  };

  calculatePayment = () => {

    switch (this.mathService.getFloat(this.paymentTypeControl.value)) {
      case PaymentType.MinimumPaymentOnly:
        this.payment = this.minimumPayment;
        break;
      case PaymentType.MinimumPaymentPlusExtra:
        const extraPayment = this.mathService.getFloat(this.extraPaymentControl.value, 0);
        this.payment = this.minimumPayment + extraPayment!;
        break;
      case PaymentType.FixedPayment:
        this.payment = this.mathService.getFloat(this.fixedPaymentControl.value, 0)!;
        break;
    }
  };

  calculate = () => {

    if (this.creditCardFormGroup.valid) {
      const balance = this.mathService.getFloat(this.balanceControl.value, 0);
      const interest = this.mathService.getFloat(this.interestRateControl.value, 0);
      const minimumPaymentType = this.minimumPaymentTypeControl.value as MinimumPaymentType;
      let payment = 0;
      this.isFixedPayment = false;

      switch (this.mathService.getFloat(this.paymentTypeControl.value)) {
        case PaymentType.MinimumPaymentOnly:
          payment = this.minimumPayment;
          this.minimumPaymentMode = true;
          this.isFixedPayment = true;
          payment = this.minimumPayment;
          break;
        case PaymentType.MinimumPaymentPlusExtra:
          payment = this.mathService.getFloat(this.extraPaymentControl.value, 0)!;
          this.minimumPaymentMode = false;
          break;
        case PaymentType.FixedPayment:
          payment = this.mathService.getFloat(this.fixedPaymentControl.value, 0)!;
          this.isFixedPayment = true;
          this.minimumPaymentMode = false;
          break;
      }

      const s1 = this.paymentService
        .creditCardSchedule(balance!, interest!, minimumPaymentType.percentOfBalance, 0, false,
          minimumPaymentType.useInterest);

      const s2 = this.paymentService
        .creditCardSchedule(balance!, interest!, minimumPaymentType.percentOfBalance, payment, this.isFixedPayment,
          minimumPaymentType.useInterest);
      this.scheduleCompare = this.paymentService.getScheduleCompare(s1, s2);

      const originalChartData: PieChartData[] = [
        { name: 'Interest', color: 'red', y: s1.interest },
        { name: 'Principal', color: 'green', y: s1.balanceStart }
      ];

      this.showResults = true;
      this.showSummary = true;
      this.showErrors = false;
    }
    else {
      this.showErrors = true;
    }
  };

  calculateMinimumPayment = () => {
    if (this.balanceControl.valid && this.interestRateControl.valid) {
      const balance = this.mathService.getFloat(this.balanceControl.value, 0);
      const minimumPaymentType = this.minimumPaymentTypeControl.value as MinimumPaymentType;
      const interest = this.mathService.getFloat(this.interestRateControl.value, 0);
      this.minimumPayment = this.paymentService.determineMinimumPayment(
        0, minimumPaymentType.percentOfBalance, balance!, interest!, minimumPaymentType.useInterest);
    }

    this.calculatePayment();
    this.fixedPaymentControl.updateValueAndValidity();
  };

  setShowSummary = () => {
    this.showSummary = !this.showSummary;
  };
  // TODO move this to service or directive or something it is duplicated
  // If you use the input-component you get this, so eventually remove this
  isInvalid = (control: AbstractControl) => {
    return (control.touched && control.invalid) || (control.invalid && this.showErrors);
  };

  validateFixedPayment = (fg: FormGroup): ValidationErrors | null => {

    let error = null;
    if (!this.fixedPaymentControl.value) {
      this.fixedPaymentError = '1 to 9999';
      error = { errorMessage: this.fixedPaymentError };
      return error;
    }

    const fixedPayment = this.mathService.getFloat(this.fixedPaymentControl.value);

    if (fixedPayment && fixedPayment < this.minimumPayment) {
      this.fixedPaymentError = 'Must be greater than minimum payment.';
      error = { errorMessage: this.fixedPaymentError };
      return error;
    }

    return null;
  };
}
