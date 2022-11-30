import { ProfitDreamerChart } from 'src/app/chart/chart-data.class.';
import { Injectable } from '@angular/core';
import { Schedule } from '../shared/schedule.class';

@Injectable({
  providedIn: 'root'
})
export class CreditCardChartService {

  constructor() { }

  interestPieChart(schedule: Schedule): ProfitDreamerChart {

    const chart = new ProfitDreamerChart();
    // chart.title = 'Principal & Interest';
    chart.data.push({ name: 'Interest', color: 'red', y: schedule.interest });
    chart.data.push({ name: 'Principal', color: 'green', y: schedule.balanceStart });
    return chart;
  }
}