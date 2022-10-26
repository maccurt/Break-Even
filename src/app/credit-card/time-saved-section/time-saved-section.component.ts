import { ScheduleCompare } from 'src/app/shared/schedule-compare.type';
import { Component, Input, OnInit } from '@angular/core';
import { Help } from 'src/app/help/Help';

@Component({
  selector: 'app-time-saved-section',
  templateUrl: './time-saved-section.component.html',
  styleUrls: ['./time-saved-section.component.scss']
})
export class TimeSavedSectionComponent {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() help!:Help;
  constructor() { }  
}
