import { HelpService } from './../../help/help.service';
import { IconService } from 'src/app/icon/icon.service';
import { ProfitDreamerChartService } from './../../chart.service';
import { ChartServiceDeprecated } from '../../shared/chart.service.deprecated';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ScheduleCompare } from 'src/app/shared/schedule-compare.type';
import * as Highcharts from 'highcharts';

//TODO can this be moved to it's own module
@Component({
  selector: 'app-interest-savings',
  templateUrl: './interest-savings.component.html',
  styleUrls: ['./interest-savings.component.scss']
})
export class InterestSavingsComponent implements OnChanges {
  @Input() scheduleCompare!: ScheduleCompare;
  @Input() minimumPaymentMode!: boolean;
  @Input() isFixedPayment: boolean = false;
  showResults = false;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  constructor(private chartService: ProfitDreamerChartService,
    private currency: CurrencyPipe,
    public icons: IconService,
    public help: HelpService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.scheduleCompare) {
      this.showResults = true;

      if (this.minimumPaymentMode) {
        const originalChartData: any[] = [
          { name: 'Interest', color: 'red', y: this.scheduleCompare.schedule1.interest },
          { name: 'Principal', color: 'green', y: this.scheduleCompare.schedule1.balanceStart }
        ];
        this.chartOptions = this.chartService.pieChartOptions('Principal & Interest', originalChartData);
      }
      else {

        const interestTypeLabel = this.isFixedPayment ? 'Fixed Payment' : 'Extra Payment';
        const original =
          '<div class="chart-label-container"><span class="chart-label">Original Total Interest:</span><span class="chart-value">' +
          this.currency.transform(this.scheduleCompare.schedule1.interest) + '</span></div>';
        const extraPayment =
          '<div class="chart-label-container"><span class="chart-label">New Total Interest:</span><span class="chart-value">' +
          this.currency.transform(this.scheduleCompare.schedule2.interest) + '</span></div>';
        const originalChartData: any[] = [
          { name: 'Minimum Payment', color: '#FF0000', y: this.scheduleCompare.schedule1.interest },
          { name: interestTypeLabel, color: '#00FF00', y: this.scheduleCompare.schedule2.interest }
        ];

        this.chartOptions = this.chartService.getBarChart('Interest', originalChartData, ['Minimum Payment', interestTypeLabel]);
      }
    }
    else {
      this.showResults = false;
    }
  }
}