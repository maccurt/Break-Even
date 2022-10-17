import { Component, Input, OnInit } from '@angular/core';
import { ScheduleItem } from '../shared/schedule-item';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent  {
  @Input() scheduleList: ScheduleItem[] = [];
  constructor() { }  
}
