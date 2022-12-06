import { ScheduleItem } from './../../shared/schedule-item';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent {
  @Input() item!: ScheduleItem;

}
