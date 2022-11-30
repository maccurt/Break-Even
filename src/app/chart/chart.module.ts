import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { BasicPieChartComponent } from './basic-pie-chart/basic-pie-chart.component';
@NgModule({
  declarations: [
    BasicPieChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
  ],
  exports: [
    BasicPieChartComponent
  ]

})
export class ChartModule { }
