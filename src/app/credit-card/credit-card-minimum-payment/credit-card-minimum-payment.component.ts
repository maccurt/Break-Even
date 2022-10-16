import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';

import { MinimumPaymentType } from '../credit-card-calculator/credit-card.types';
import { PaymentService } from '../../shared/payment.service';

@Component({
  selector: 'app-credit-card-minimum-payment',
  templateUrl: './credit-card-minimum-payment.component.html',
  styleUrls: ['./credit-card-minimum-payment.component.scss'], viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class CreditCardMinimumPaymentComponent implements OnInit {
  @Output() minimumPaymentTypeChange = new EventEmitter<MinimumPaymentType>();

  minimumPaymentTypeList: MinimumPaymentType[] = [];
  minimumPaymentTypeControl!: FormControl;

  constructor(private paymentService: PaymentService, private formGroup: FormGroupDirective) {
    this.minimumPaymentTypeList = this.paymentService.getMinimumPaymentTypeList();

  }

  ngOnInit(): void {

    this.minimumPaymentTypeControl = new FormControl(this.minimumPaymentTypeList[0], [Validators.required]);

    this.formGroup.control.addControl('minimumPaymentType', this.minimumPaymentTypeControl);

    this.minimumPaymentTypeControl.valueChanges.subscribe((minimumPaymentType: MinimumPaymentType) => {
      this.minimumPaymentTypeChange.emit(minimumPaymentType);
    });

    // Emit the default
    this.minimumPaymentTypeChange.emit(this.minimumPaymentTypeList[0]);
  }

}
