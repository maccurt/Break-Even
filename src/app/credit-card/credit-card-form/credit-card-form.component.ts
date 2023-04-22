import { ScheduleCompare } from './../../shared/schedule-compare.type';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpService } from 'src/app/help/help.service';
import { IconService } from 'src/app/icon/icon.service';
import { MinimumPaymentCalculation } from 'src/app/shared/minimum-payment-calculation.class';
import { PaymentService } from 'src/app/shared/payment.service';
import { ScheduleItem } from 'src/app/shared/schedule-item';
import { Schedule } from 'src/app/shared/schedule.class';
import { PaymentType } from '../credit-card-calculator/payment-type.enum';
import { CreditCardMode } from '../credit-card-wizard/credit-card-wizard.component';
import { CreditCardAbstract } from '../credit-card-abstract.class';

export class CreditFormOutput {
  scheduleCompare!: ScheduleCompare;
  isSubmitted: boolean = false;
}

export class ModeFields{
  balanceText:string = 'What Is The Balance On Your Credit Card?';
}

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent extends CreditCardAbstract implements OnInit, OnDestroy {

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

  modeFields!:ModeFields;
  //form group controls
  balanceControlText = 'What Is The Balance On Your Credit Card?';
  balanceControl = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(999999)]);
  interestRateControl = new FormControl(this.interestRate, [Validators.required, Validators.min(1), Validators.max(99)]);
  minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);
  fixedPaymentControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999999)]);

  //intro rate mode controls    
  hasIntroRate: boolean = false;
  hasIntroRateControl = new FormControl(false);
  introInterestRate = new FormControl(0);
  introRateError: string = '';
  introMonths = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(36)]);

  introTransferCostPercentControl = new FormControl(0);
  costToTransfer: number = 0;

  formGroup = this.fb.group({
    balance: this.balanceControl,
    interestRate: this.interestRateControl,
    hasIntroRate: this.hasIntroRateControl,
    introInterestRate: this.introInterestRate,
    introMonths: this.introMonths,
    introTransferCostPercent: this.introTransferCostPercentControl,
    minimumPaymentType: this.minimumPaymentTypeControl,
    fixedPayment: this.fixedPaymentControl
  });
  fixedPaymentIsMinPayment: boolean = false;

  mode: CreditCardMode = CreditCardMode.default;
  

  constructor(private fb: FormBuilder,
    public help: HelpService,
    public icon: IconService,
    private paymentService: PaymentService,
    private route: ActivatedRoute

  ) {
    super();
  }

  setModeFields = (mode: CreditCardMode):ModeFields =>  {

    const modeFields = new ModeFields();
    switch(mode){
      case CreditCardMode.introductoryRate:
        modeFields.balanceText = "Balance On Current Credit Card?";
        break;
    }

    return modeFields;
  };

  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      this.mode = data['mode'] as CreditCardMode;
      if (!this.mode) {
        this.mode = CreditCardMode.default;
      }
      this.modeFields = this.setModeFields(this.mode);
    });

    this.hasIntroRateControl.valueChanges.subscribe(() => {
      this.hasIntroRate = this.hasIntroRateControl.value!;
      this.submit();
    });

    this.introInterestRate.setValidators(this.validateIntroRate as any);

    this.subList$.push(this.minimumPaymentTypeControl.valueChanges.subscribe(() => {
      this.submit();
    }));

    this.interestRateControl.valueChanges.subscribe(() => {
      this.introInterestRate.updateValueAndValidity();
    });

    this.route.queryParamMap.subscribe((parms) => {
      if (parms.get('demo')) {
        const demo = parms.get('demo');
        let tab = Number(parms.get('tab'));
        if (tab) {
          this.tabIndex = tab;
        }

        this.balanceControl.setValue(20000);

        if (demo === '2') {
          this.balanceControl.setValue(20000);
          this.interestRateControl.setValue(15);
          this.hasIntroRateControl.setValue(true);
          this.introInterestRate.setValue(0);
          this.introMonths.setValue(6);
          this.introTransferCostPercentControl.setValue(3);
          this.fixedPaymentControl.setValue(450);
        }
        this.submit();
      }
    });
  }

  submit = () => {

    let introMonths: number = 0;
    let introRate: number = 0;
    let introPercentFee;

    if (this.formGroup.value.introMonths! > 0 && this.hasIntroRate) {
      introMonths = this.formGroup.value.introMonths!;
      introRate = this.formGroup.value.introInterestRate!;
      introPercentFee = this.formGroup.value.introTransferCostPercent!;

      if (this.balanceControl.valid && introPercentFee > 0) {
        this.costToTransfer = this.paymentService
          .calculateTransferCost(introPercentFee, this.formGroup.value.balance!);
      }
    }

    if (this.formGroup.valid) {
      const minimumPaymentType = this.minimumPaymentTypeControl.value!;
      let balance = this.formGroup.value.balance!;
      let interestRate = this.formGroup.value.interestRate!;

      //Calculate the minimum payment
      this.schedule1 = this.paymentService
        .creditCardScheduleZeroPercentOption(balance, interestRate, minimumPaymentType.percentOfBalance!,
          0, false, minimumPaymentType.useInterest,
          introRate, introMonths, introPercentFee);
      this.schedule1.title = 'Minimum Payment Only Total';
      this.schedule1.paymentType = PaymentType.MinimumPaymentOnly;

      this.minimumPaymentCalculation = this.paymentService.
        minimumPaymentCalculation(minimumPaymentType.percentOfBalance, balance + this.costToTransfer,
          interestRate, minimumPaymentType.useInterest);
      this.minimumPayment = this.minimumPaymentCalculation.minimumPayment;

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
          this.fixedPaymentControl.value!, true, minimumPaymentType.useInterest, introRate, introMonths, introPercentFee);
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
  validateIntroRate = (fg: FormGroup): ValidationErrors | null => {

    const apr = this.interestRateControl.value!;
    const intro = this.introInterestRate.value!;

    let error = null;
    if (intro > 99) {
      this.introRateError = '1 to 99';
      error = { errorMessage: this.introRateError };
      return error;
    }

    if (intro > apr) {
      this.introRateError = 'Must be greater than the APR';
      error = { errorMessage: this.introRateError };
      return error;
    }
    this.introRateError = '';
    return null;
  };

  ngOnDestroy(): void {
    this.subList$.forEach((sub$) => {
      sub$.unsubscribe();
    });
  }
}
