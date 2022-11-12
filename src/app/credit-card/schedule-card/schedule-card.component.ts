import { ProfitDreamerChartService } from 'src/app/chart/profit-dreamer-chart.service';
import { PieChartData } from "../../shared/PieChartData";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'highcharts';
import { ScheduleCompare } from '../../shared/schedule-compare.type';
import { Schedule } from '../../shared/schedule.class';
import * as Highcharts from 'highcharts';

//TODO what module should this be in
@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnChanges {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() minimumPaymentMode = false;
  Highcharts: typeof Highcharts = Highcharts;
  chart!: Highcharts.Options;
  schedule!: Schedule;
  constructor(private chartService: ProfitDreamerChartService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.minimumPaymentMode) {
      this.schedule = this.scheduleCompare.schedule1;
    }
    else {
      this.schedule = this.scheduleCompare.schedule2;
      const originalChartData: PieChartData[] = [
        { name: 'Interest', color: 'red', y: this.schedule.interest },
        { name: 'Principal', color: 'green', y: this.schedule.balanceStart }
      ];
      this.chart = this.chartService.pieChartOptions('', originalChartData);
    };
  }
}