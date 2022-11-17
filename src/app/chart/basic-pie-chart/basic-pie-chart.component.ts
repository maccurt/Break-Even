
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProfitDreamerChart } from '../chart-data.class.';
import { PieChartData } from '../pie-chart-data.class';
import { ProfitDreamerChartService } from '../profit-dreamer-chart.service';

@Component({
  selector: 'app-basic-pie-chart',
  templateUrl: './basic-pie-chart.component.html',
  styleUrls: ['./basic-pie-chart.component.scss']
})
export class BasicPieChartComponent implements OnChanges {

  @Input() chart!: ProfitDreamerChart;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  constructor(private chartService: ProfitDreamerChartService) {

   }
  ngOnChanges(changes: SimpleChanges): void {
    
    this.chartOptions = this.chartService.pieChartOptions(this.chart.title,this.chart.data);
  }
  
}
