import { HelpService } from './../../help/help.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MinimumPaymentType } from './credit-card.types';
import { MathService } from 'src/app/math/math.service';
import { MetaService } from '../../shared/meta.service';
import { PaymentService } from '../../shared/payment.service';
import { ScheduleCompare } from '../../shared/schedule-compare.type';
import { ActivatedRoute } from '@angular/router';
import { FormInput, FormInputType } from '../../controls/form-input';
import { PieChartData } from 'src/app/chart.service';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/shared/schedule.type';

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
export class CreditCardCalculatorComponent implements OnInit, OnDestroy {
  // controls
  creditCardFormGroup!: FormGroup;
  balanceControl!: FormInput;
  interestRateControl!: FormControl<any>;
  minimumPaymentTypeControl!: FormControl;
  paymentTypeControl!: FormControl;
  extraPaymentControl!: FormControl;
  fixedPaymentControl!: FormControl;

  paymentTypeList: { value: number, text: string }[] = [
    { value: 1, text: 'Minimum Payment' },
    { value: 2, text: 'Minimum Payment + Extra Payment' },
    { value: 3, text: 'Fixed Payment' },
  ];

  minimumPaymentTypeList: MinimumPaymentType[] = [];
  showErrors!: boolean;
  showResults = false;
  showSummary = true;
  showExtraPayment = true;
  showMinimumPayment = false;
  showFixedPayment = false;
  //mode use this to hide things on the calculator form
  isMiniumPaymentType = false;
  isExtraPaymentType = false;
  isFixedPaymentType = false;

  isMinModeWithFixedPayment = false;
  //
  scheduleCompare!: ScheduleCompare;
  minimumPayment = 0;
  monthlyPayment = 0;
  fixedPayment = 0;
  extraPayment = 0;
  fixedPaymentError = '';
  showPaymentInput!: boolean;

  subList$: Subscription[] = [];

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
    this.interestRateControl.setValue(16.4);
    this.minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);

    //this.paymentTypeControl = new FormControl(null, [Validators.required]);
    this.paymentTypeControl = new FormControl(this.paymentTypeList[1].value, [Validators.required]);
    //this.extraPaymentControl = new FormControl('');
    this.extraPaymentControl = new FormInput(FormInputType.CreditCardExtraPayment);
    this.fixedPaymentControl = new FormInput(FormInputType.CreditCardFixedPayment);

    this.creditCardFormGroup = new FormGroup({
      balance: this.balanceControl,
      interestRate: this.interestRateControl,
      minimumPaymentType: this.minimumPaymentTypeControl,
      extraPayment: this.extraPaymentControl,
      paymentType: this.paymentTypeControl,
      fixedPayment: this.fixedPaymentControl
    });

    this.subList$.push(this.minimumPaymentTypeControl.valueChanges.subscribe(() => {
      this.calculateMinimumPayment();
    }));

    this.subList$.push(this.paymentTypeControl.valueChanges.subscribe(this.setPaymentType));
    this.paymentTypeControl.setValue(this.paymentTypeList[1].value);
    //this.paymentTypeControl.setValue(PaymentType.MinimumPaymentOnly.toString());

    this.subList$.push(this.activatedRoute.queryParams.subscribe(params => {
      const { demo } = params;
      if (demo === '1') {
        this.demoMinimumPaymentOnly();
      }
      if (demo === '2') {
        this.demoExtraPayment();
      }
    }));
    this.calculateMinimumPayment();
  }

  setPaymentType = () => {

    const paymentType = this.mathService.getFloat(this.paymentTypeControl.value);
    this.isMiniumPaymentType = false;
    this.isExtraPaymentType = false;
    this.isFixedPaymentType = false;

    switch (paymentType) {
      case PaymentType.MinimumPaymentOnly:
        this.isMiniumPaymentType = true;
        this.showPaymentInput = false;
        this.extraPaymentControl.clearValidators();
        this.extraPaymentControl.updateValueAndValidity();
        this.fixedPaymentControl.clearValidators();
        this.fixedPaymentControl.updateValueAndValidity();
        break;
      case PaymentType.MinimumPaymentPlusExtra:
        this.isExtraPaymentType = true;
        this.showPaymentInput = true;
        this.fixedPaymentControl.clearValidators();
        this.fixedPaymentControl.updateValueAndValidity();
        this.extraPaymentControl.setValidators([Validators.min(1), Validators.max(99999), Validators.required]);
        this.extraPaymentControl.updateValueAndValidity();
        this.showExtraPayment = true;
        break;
      case PaymentType.FixedPayment:
        this.isFixedPaymentType = true;
        this.showPaymentInput = true;
        this.extraPaymentControl.clearValidators();
        this.extraPaymentControl.updateValueAndValidity();
        this.fixedPaymentControl.setValidators(this.validateFixedPayment as any); //TODO does making this 'any' break it
        this.fixedPaymentControl.updateValueAndValidity();
        this.showExtraPayment = false;
        break;
    }
    this.calculateMinimumPayment();
  };

  calculatePayment = () => {
    switch (this.mathService.getFloat(this.paymentTypeControl.value)) {
      case PaymentType.MinimumPaymentOnly:
        this.monthlyPayment = this.minimumPayment;
        break;
      case PaymentType.MinimumPaymentPlusExtra:
        this.extraPayment = this.mathService.getFloat(this.extraPaymentControl.value, 0)!;
        this.monthlyPayment = this.minimumPayment + this.extraPayment!;
        break;
      case PaymentType.FixedPayment:

        this.monthlyPayment = this.mathService.getFloat(this.fixedPaymentControl.value, 0)!;
        this.fixedPayment = this.monthlyPayment;
        break;
    }
  };

  calculate = () => {
    if (this.creditCardFormGroup.valid) {

      this.calculateMinimumPayment(); //TODO This is hack to prevent the autofull from breaking remove it when you fix it 
      const balance = this.mathService.getFloat(this.balanceControl.value, 0);
      const interest = this.mathService.getFloat(this.interestRateControl.value, 0);
      const minimumPaymentType = this.minimumPaymentTypeControl.value as MinimumPaymentType;
      let payment = 0;
      this.showFixedPayment = false;
      let addFixedPayment = false;

      switch (this.mathService.getFloat(this.paymentTypeControl.value)) {
        case PaymentType.MinimumPaymentOnly:
          this.showFixedPayment = true;
          payment = this.minimumPayment;
          this.showMinimumPayment = true;
          payment = this.minimumPayment;
          addFixedPayment = true;
          break;
        case PaymentType.MinimumPaymentPlusExtra:
          payment = this.mathService.getFloat(this.extraPaymentControl.value, 0)!;
          this.showMinimumPayment = false;
          break;
        case PaymentType.FixedPayment:
          payment = this.mathService.getFloat(this.fixedPaymentControl.value, 0)!;
          this.showFixedPayment = true;
          this.showMinimumPayment = false;
          addFixedPayment = true;
          break;
      }

      const s1 = this.paymentService
        .creditCardSchedule(balance!, interest!, minimumPaymentType.percentOfBalance, 0, false,
          minimumPaymentType.useInterest);

      const s2 = this.paymentService
        .creditCardSchedule(balance!, interest!, minimumPaymentType.percentOfBalance, payment, addFixedPayment,
          minimumPaymentType.useInterest);
      this.scheduleCompare = this.paymentService.getScheduleCompare(s1, s2);

      const originalChartData: PieChartData[] = [
        { name: 'Interest', color: 'red', y: s1.interest },
        { name: 'Principal', color: 'green', y: s1.balanceStart }
      ];

      this.showResults = true;
      this.showSummary = true;
      this.showErrors = false;

      window.setTimeout(() => {
        const element = document.querySelectorAll('#scroll-to-container')[0] as HTMLElement;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);

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

  ngOnDestroy(): void {
    this.subList$.forEach((sub$) => {
      sub$.unsubscribe();
    });
  }
}
