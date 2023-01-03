import { ActivatedRoute } from '@angular/router';
import { ScheduleCompare } from 'src/app/shared/schedule-compare.type';
import { IconService } from 'src/app/icon/icon.service';
import { Schedule } from './../../shared/schedule.class';
import { HelpService } from './../../help/help.service';
import { AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/shared/payment.service';
import { Subscription } from 'rxjs';
import { PaymentType } from '../credit-card-calculator/payment-type.enum';
import { ScheduleItem } from 'src/app/shared/schedule-item';
import { Title } from '@angular/platform-browser';
import { MetaService } from 'src/app/shared/meta.service';
import { Store } from '@ngrx/store';
import { CreditCardState } from '../credit-card-state/credit-card.reducers';
import { CreditCardAction } from '../credit-card-state/credit-card.actions.barrel';

@Component({
  selector: 'app-credit-card-wizard',
  templateUrl: './credit-card-wizard.component.html',
  styleUrls: ['./credit-card-wizard.component.scss']
})
export class CreditCardWizardComponent implements OnInit, OnDestroy {

  tabIndex: number = 0;
  subList$: Subscription[] = [];
  interestRate: number = 15.13;
  minimumPayment: number = 0;
  isSubmitted: boolean = false;
  schedule1!: Schedule;
  schedule2!: Schedule;
  scheduleCompare!: ScheduleCompare;
  scheduleListForMinPayment!: ScheduleItem[];
  minimumPaymentTypeList = this.paymentService.getMinimumPaymentTypeList();

  //form group controls
  balanceControl = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(999999)]);
  interestRateControl = new FormControl(this.interestRate, [Validators.required, Validators.min(1), Validators.max(99)]);
  minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);
  fixedPaymentControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999999)]);

  formGroup = this.fb.group({
    balance: this.balanceControl,
    interestRate: this.interestRateControl,
    minimumPaymentType: this.minimumPaymentTypeControl,
    fixedPayment: this.fixedPaymentControl
  });
  fixedPaymentIsMinPayment: boolean = false;

  constructor(private fb: FormBuilder,
    private title: Title,
    private metaService: MetaService,
    public help: HelpService,
    public icon: IconService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private store:Store<CreditCardState>) {

    this.title.setTitle('Credit Card Calculator');
    this.metaService.addTitle('Credit Card Calculator');
    this.metaService.addDescription('Calculates your credit card interest and how many years it will take to pay off');
  }
  ngOnInit(): void {
     this.store.dispatch(CreditCardAction.getInterestRate());

    this.subList$.push(this.minimumPaymentTypeControl.valueChanges.subscribe(() => {
      this.submit();
    }));

    this.route.queryParamMap.subscribe((parms) => {
      if (parms.get('demo')) {

        let tab = Number(parms.get('tab'));

        if (tab) {
          this.tabIndex = tab;
        }

        this.balanceControl.setValue(20000);
        this.submit();
      }
    });

  }

  submit = () => {

    if (this.balanceControl.valid && this.interestRateControl.valid) {

      const minimumPaymentType = this.minimumPaymentTypeControl.value!;
      let balance = this.formGroup.value.balance!;
      let interestRate = this.formGroup.value.interestRate!;

      this.schedule1 = this.paymentService
        .creditCardSchedule(balance, interestRate, minimumPaymentType.percentOfBalance!,
          0, false, minimumPaymentType.useInterest);
      this.schedule1.title = 'Minium Payment Only Total';
      this.schedule1.paymentType = PaymentType.MinimumPaymentOnly;

      this.minimumPayment = this.paymentService.determineMinimumPayment(
        0, minimumPaymentType.percentOfBalance, balance!, interestRate!, minimumPaymentType.useInterest);

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
        this.schedule2 = this.paymentService.creditCardSchedule(balance, interestRate, minimumPaymentType.percentOfBalance!,
          this.fixedPaymentControl.value!, true, minimumPaymentType.useInterest);
      };

      this.scheduleCompare = this.paymentService.getScheduleCompare(this.schedule1, this.schedule2);
      this.isSubmitted = true;
    }
  };

  setFixPayment = () => {
    this.fixedPaymentIsMinPayment = true;
    this.fixedPaymentControl.setValue(this.minimumPayment);
  };

  blur = () => {
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
