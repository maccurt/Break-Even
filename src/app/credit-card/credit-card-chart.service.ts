import { ProfitDreamerChartService } from 'src/app/chart.service';
import { Injectable } from '@angular/core';
import { Schedule } from '../shared/schedule.type';

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