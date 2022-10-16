import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ScheduleCompare } from '../../shared/schedule-compare.type';

@Component({
  selector: 'app-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.scss']
})
export class TimeCardComponent implements OnChanges {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() minimumPaymentMode: boolean = false;
  showResults = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scheduleCompare) {
      this.showResults = true;
    }
    else {
      this.showResults = false;
    }
  }
}
