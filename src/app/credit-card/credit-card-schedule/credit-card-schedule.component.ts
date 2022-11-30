import { IconService } from 'src/app/icon/icon.service';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { HelpService } from './../../help/help.service';
import { CreditCardChartService } from './../credit-card-chart.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/schedule.class';
import { PaymentType } from '../credit-card-calculator/payment-type.enum';
import { ProfitDreamerChart } from 'src/app/chart/chart-data.class.';

@Component({
  selector: 'app-credit-card-schedule',
  templateUrl: './credit-card-schedule.component.html',
  styleUrls: ['./credit-card-schedule.component.scss']
})
export class CreditCardScheduleComponent implements OnInit, OnChanges {
  paymentTypeIcon!: IconDefinition;
  chart!:ProfitDreamerChart;  
  @Input() schedule!: Schedule;

  constructor(private creditCartChartService: CreditCardChartService,
    public help: HelpService, public icons: IconService) {

  }

  ngOnInit(): void {

    //TODO could this be used else where and could be in the icon service perhaps
    //the icon service probably should not know about payment type?? CONSIDER THAT!
    switch (this.schedule.paymentType) {
      case PaymentType.MinimumPaymentOnly:
        this.paymentTypeIcon = this.icons.minimumPaymentType;
        break;
      case PaymentType.FixedPaymentOfFirstMiniumPayment:
        this.paymentTypeIcon = this.icons.faceMeh;
        break;
      default:
        this.paymentTypeIcon = this.icons.smile;
    }
  }

  ngOnChanges(): void {
    this.chart = this.creditCartChartService.interestPieChart(this.schedule);
  }
}
