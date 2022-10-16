import { ChartServiceDeprecated } from '../../shared/chart.service.deprecated';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ScheduleCompare } from 'src/app/shared/schedule-compare.type';
import * as Highcharts from 'highcharts';
import { Chart } from 'highcharts';
//TODO can this be moved to it's own module
@Component({
  selector: 'app-interest-savings',
  templateUrl: './interest-savings.component.html',
  styleUrls: ['./interest-savings.component.scss']
})
export class InterestSavingsComponent implements  OnChanges {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() minimumPaymentMode!: boolean;
  showResults = false;

  originalLoanChart!: Chart;
  constructor(private chartService: ChartServiceDeprecated, private currency: CurrencyPipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.scheduleCompare) {
      this.showResults = true;

      if (this.minimumPaymentMode) {

        const original =
          '<div class="chart-label-container"><span class="chart-label">Total Interest:</span><span class="chart-value">' +
          this.currency.transform(this.scheduleCompare.schedule1.interest) + '</span></div>';
        const originalChartData: any[] = [
          { name: 'Interest', color: 'red', y: this.scheduleCompare.schedule1.interest },
          { name: 'Principal', color: 'green', y: this.scheduleCompare.schedule1.balanceStart }
        ];
        this.originalLoanChart = this.chartService.getPieChart('', originalChartData);

      }
      else {
        // TODO move this to the chart service
        const original =
          '<div class="chart-label-container"><span class="chart-label">Original Total Interest:</span><span class="chart-value">' +
          this.currency.transform(this.scheduleCompare.schedule1.interest) + '</span></div>';
        const extraPayment =
          '<div class="chart-label-container"><span class="chart-label">New Total Interest:</span><span class="chart-value">' +
          this.currency.transform(this.scheduleCompare.schedule2.interest) + '</span></div>';
        const originalChartData: any[] = [
          { name: 'Original Total Interest', color: '#cccccc', y: this.scheduleCompare.schedule1.interest },
          { name: 'New Total Interest', color: '#85996A', y: this.scheduleCompare.schedule2.interest } // 33ff33
        ];

        this.originalLoanChart = this.chartService.getBarChart('', originalChartData, [original, extraPayment]);
      }
    }
    else {
      this.showResults = false;
    }
  }  
}