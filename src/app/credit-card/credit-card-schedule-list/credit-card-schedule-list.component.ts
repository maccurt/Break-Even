import { Component, Input, OnInit } from '@angular/core';
import { ScheduleItem } from '../../shared/schedule-item';

@Component({
  selector: 'app-credit-card-schedule-list',
  templateUrl: './credit-card-schedule-list.component.html',
  styleUrls: ['./credit-card-schedule-list.component.scss']
})
export class CreditCardScheduleListComponent {
  @Input() scheduleList: ScheduleItem[] = [];
  constructor() { }
}
