import { Schedule } from './../../shared/schedule.class';
import { HelpService } from './../../help/help.service';
import { AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/shared/payment.service';
import { Subscription } from 'rxjs';
import { MinimumPaymentType } from '../credit-card-calculator/credit-card.types';

@Component({
  selector: 'app-credit-card-wizard',
  templateUrl: './credit-card-wizard.component.html',
  styleUrls: ['./credit-card-wizard.component.scss']
})
export class CreditCardWizardComponent implements OnInit, OnDestroy {

  subList$: Subscription[] = [];
  interestRate: number = 15.13;
  isSubmitted: boolean = false;
  schedule1!: Schedule;
  minimumPaymentTypeList = this.paymentService.getMinimumPaymentTypeList();

  //form group controls
  balanceControl = new FormControl(0);
  interestRateControl = new FormControl(this.interestRate);
  minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);
  formGroup = this.fb.group({
    balance: this.balanceControl,
    interestRate: this.interestRateControl,
    minimumPaymentType: this.minimumPaymentTypeControl
  });

  constructor(private fb: FormBuilder,
    public help: HelpService,
    private paymentService: PaymentService,) {
  }
  ngOnInit(): void {

    this.subList$.push(this.minimumPaymentTypeControl.valueChanges.subscribe(() => {
      this.submit();
    }));
  }

  submit = () => {
    if (this.formGroup.valid) {

      const minimumPaymentType = this.minimumPaymentTypeControl.value!;

      let balance = this.formGroup.value.balance!;
      let interestRate = this.formGroup.value.interestRate!;
      this.schedule1 = this.paymentService
        .creditCardSchedule(balance, interestRate, minimumPaymentType.percentOfBalance!,
          0, false, minimumPaymentType.useInterest);
      this.isSubmitted = true;
    }
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
