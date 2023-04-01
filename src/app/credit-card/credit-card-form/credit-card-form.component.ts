import { ScheduleCompare } from './../../shared/schedule-compare.type';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpService } from 'src/app/help/help.service';
import { IconService } from 'src/app/icon/icon.service';
import { MetaService } from 'src/app/shared/meta.service';
import { MinimumPaymentCalculation } from 'src/app/shared/minimum-payment-calculation.class';
import { PaymentService } from 'src/app/shared/payment.service';
import { ScheduleItem } from 'src/app/shared/schedule-item';
import { Schedule } from 'src/app/shared/schedule.class';
import { PaymentType } from '../credit-card-calculator/payment-type.enum';
import { CreditCardMode } from '../credit-card-wizard/credit-card-wizard.component';

export class CreditFormOutput {
  scheduleCompare!: ScheduleCompare;
  isSubmitted: boolean = false;
}

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit, OnDestroy {

  @Output() calculateEvent = new EventEmitter<CreditFormOutput>();
  scheduleCompare!: ScheduleCompare;

  tabIndex: number = 0;
  subList$: Subscription[] = [];
  interestRate: number = 15.13;
  minimumPayment: number = 0;
  minimumPaymentCalculation!: MinimumPaymentCalculation;
  isSubmitted: boolean = false;
  schedule1!: Schedule;
  schedule2!: Schedule;

  scheduleListForMinPayment!: ScheduleItem[];
  minimumPaymentTypeList = this.paymentService.getMinimumPaymentTypeList();

  //form group controls
  balanceControl = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(999999)]);
  interestRateControl = new FormControl(this.interestRate, [Validators.required, Validators.min(1), Validators.max(99)]);
  minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);
  fixedPaymentControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999999)]);

  //intro rate mode controls  
  introInterestRate = new FormControl(0);
  introMonths = new FormControl(12, [Validators.required, Validators.min(0), Validators.max(36)]);
  introTransferFeeRate = new FormControl(0);
  introTransferCostPercent = new FormControl(0);

  formGroup = this.fb.group({
    balance: this.balanceControl,
    interestRate: this.interestRateControl,
    minimumPaymentType: this.minimumPaymentTypeControl,
    fixedPayment: this.fixedPaymentControl,
    introInterestRate: this.introInterestRate,
    introMonths: this.introMonths,
    introTransferFeeRate: this.introTransferFeeRate,
    introTransferCostPercent: this.introTransferCostPercent
  });
  fixedPaymentIsMinPayment: boolean = false;

  mode: CreditCardMode = CreditCardMode.default;

  isIntroRateMode: boolean = false;

  constructor(private fb: FormBuilder,
    public help: HelpService,
    public icon: IconService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {

    this.subList$.push(this.minimumPaymentTypeControl.valueChanges.subscribe(() => {
      this.submit();
    }));

    this.route.data.subscribe((data: any) => {
      if (data.mode) {
        this.mode = data.mode as CreditCardMode;
        this.isIntroRateMode = (this.mode === CreditCardMode.introductoryRate);
      }
    });

    if (this.isIntroRateMode) {
      this.interestRateControl.addValidators([Validators.required, Validators.min(1), Validators.max(99)]);
      this.introInterestRate.addValidators([Validators.required, Validators.min(0), Validators.max(99)]);
    }

    this.route.queryParamMap.subscribe((parms) => {
      if (parms.get('demo')) {
        const demo = parms.get('demo');
        let tab = Number(parms.get('tab'));
        if (tab) {
          this.tabIndex = tab;
        }

        this.balanceControl.setValue(20000);

        if (demo === '2') {
          this.balanceControl.setValue(1000);
          this.introInterestRate.setValue(3);
          this.introMonths.setValue(6);
          this.introTransferCostPercent.setValue(3);
          this.fixedPaymentControl.setValue(100);
        }

        this.submit();
      }
    });
  }

  submit = () => {

    if (this.balanceControl.valid && this.interestRateControl.valid) {

      const minimumPaymentType = this.minimumPaymentTypeControl.value!;
      let balance = this.formGroup.value.balance!;
      let interestRate = this.formGroup.value.interestRate!;

      let introMonths: number = 0;
      let introRate: number = 0;
      let introPercentFee;

      if (this.formGroup.value.introMonths! > 0) {
        introMonths = this.formGroup.value.introMonths!;
        introRate = this.formGroup.value.introInterestRate!;
        introPercentFee = this.formGroup.value.introTransferFeeRate!;
        console.log(introMonths, introRate, introPercentFee);

      }

      this.schedule1 = this.paymentService
        .creditCardScheduleZeroPercentOption(balance, interestRate, minimumPaymentType.percentOfBalance!,
          0, false, minimumPaymentType.useInterest,
          introRate, introMonths, introPercentFee);
      this.schedule1.title = 'Minimum Payment Only Total';
      this.schedule1.paymentType = PaymentType.MinimumPaymentOnly;

      this.minimumPayment = this.paymentService.determineMonthlyPayment(
        0, minimumPaymentType.percentOfBalance, balance!, interestRate!, minimumPaymentType.useInterest);

      this.minimumPaymentCalculation = this.paymentService.
        minimumPaymentCalculation(minimumPaymentType.percentOfBalance, balance,
          interestRate, minimumPaymentType.useInterest);

      this.fixedPaymentControl.clearValidators();
      this.fixedPaymentControl.addValidators(Validators.min(this.minimumPayment));

      this.fixedPaymentIsMinPayment = false;
      if (!this.fixedPaymentControl.value || this.fixedPaymentControl.value! <= 0 || this.fixedPaymentControl.value < this.minimumPayment) {
        this.fixedPaymentControl.setValue(this.minimumPayment);
      };

      if (this.fixedPaymentControl.value === this.minimumPayment) {
        this.fixedPaymentIsMinPayment = true;
      };

      this.fixedPaymentControl.updateValueAndValidity();

      if (this.fixedPaymentControl.valid) {
        this.schedule2 = this.paymentService.creditCardScheduleZeroPercentOption(balance, interestRate, minimumPaymentType.percentOfBalance!,
          this.fixedPaymentControl.value!, true, minimumPaymentType.useInterest,introRate, introMonths, introPercentFee);
        this.schedule2.paymentType = PaymentType.FixedPayment;
        this.schedule2.title = 'Fixed Monthly Payment';
      };

      this.scheduleCompare = this.paymentService.getScheduleCompare(this.schedule1, this.schedule2);
      this.isSubmitted = true;

      const formOutPut: CreditFormOutput = {
        scheduleCompare: this.scheduleCompare,
        isSubmitted: this.isSubmitted
      };

      this.calculateEvent.emit(formOutPut);
    }
  };

  setFixPayment = () => {
    this.fixedPaymentIsMinPayment = true;
    this.fixedPaymentControl.setValue(this.minimumPayment);
  };

  blur = () => {
    this.submit();
  };

  blurForceZero = (control: AbstractControl) => {
    if (!control.value) {
      control.setValue(0);
    }
    this.submit();
  };

  isInvalid = (control: AbstractControl, showErrors: boolean = false): boolean => {
    return (control.touched && control.invalid) || (control.invalid && showErrors);
  };

  ngOnDestroy(): void {
    this.subList$.forEach((sub$) => {
      sub$.unsubscribe();
    });
  }
}
