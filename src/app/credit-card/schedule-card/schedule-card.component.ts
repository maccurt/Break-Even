import { ChartServiceDeprecated } from '../../shared/chart.service.deprecated';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'highcharts';
import { ScheduleCompare } from '../../shared/schedule-compare.type';
import { Schedule } from '../../shared/schedule.type';

//TODO what module should this be in
@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnChanges {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() minimumPaymentMode = false;
  chart!: Chart;
  schedule!: Schedule;
  constructor(private chartService: ChartServiceDeprecated) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.minimumPaymentMode) {
      this.schedule = this.scheduleCompare.schedule1;
    }
    else {
      this.schedule = this.scheduleCompare.schedule2;
    }
    this.chart = this.chartService
      .getPrincipalInterestChart(this.schedule.balanceStart, this.schedule.interest);

  }
}