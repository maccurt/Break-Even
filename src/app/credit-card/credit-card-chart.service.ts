import { Injectable } from '@angular/core';
import { ProfitDreamerChartService } from '../chart/profit-dreamer-chart.service';
import { Schedule } from '../shared/schedule.class';

@Injectable({
  providedIn: 'root'
})
export class CreditCardChartService {

  constructor(private chartService: ProfitDreamerChartService) { }

  interestPieChart(schedule: Schedule): Highcharts.Options {
    const originalChartData: any[] = [
      { name: 'Interest', color: 'red', y: schedule.interest },
      { name: 'Principal', color: 'green', y: schedule.balanceStart }
    ];
    return this.chartService.pieChartOptions('Principal & Interest', originalChartData);
  }
}