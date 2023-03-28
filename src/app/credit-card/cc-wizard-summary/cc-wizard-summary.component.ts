import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { IconService } from './../../icon/icon.service';
import { Schedule } from 'src/app/shared/schedule.class';
import { Component, Input, OnInit } from '@angular/core';
import { PaymentType } from '../credit-card-calculator/payment-type.enum';

@Component({
  selector: 'app-cc-wizard-summary',
  templateUrl: './cc-wizard-summary.component.html',
  styleUrls: ['./cc-wizard-summary.component.scss']
})
export class CcWizardSummaryComponent implements OnInit {

  @Input() schedule!: Schedule;

  alertClass: string = 'alert alert-danger';
  titleIcon!:IconDefinition;

  constructor(public icon: IconService) {
  }

  ngOnInit(): void {
    switch (this.schedule.paymentType) {
      case PaymentType.FixedPayment:
      case PaymentType.FixedPaymentOfFirstMiniumPayment:
        this.alertClass = 'alert alert-success';
        this.titleIcon = this.icon.smile;
        break;
      default:
        this.alertClass = 'alert alert-danger';
        this.titleIcon = this.icon.unhappy;
    }
  }

}
