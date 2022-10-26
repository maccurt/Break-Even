import { ScheduleCompare } from 'src/app/shared/schedule-compare.type';
import { Component, Input, OnInit } from '@angular/core';
import { Help } from 'src/app/help/Help';

@Component({
  selector: 'app-interest-saved-section',
  templateUrl: './interest-saved-section.component.html',
  styleUrls: ['./interest-saved-section.component.scss']
})
export class InterestSavedSectionComponent {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() help!:Help;
  constructor() { }
}
