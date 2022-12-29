import { ScheduleItem } from './../../shared/schedule-item';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaymentService } from 'src/app/shared/payment.service';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnChanges {

  @Input() item!: ScheduleItem;
  constructor(private paymentService: PaymentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paymentService.populateScheduleItem(this.item);
  }

}
