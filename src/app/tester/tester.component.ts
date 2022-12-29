import { HelpService } from './../help/help.service';
import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import * as Highcharts from 'highcharts';
import { ProfitDreamerChartService } from '../chart/profit-dreamer-chart.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {
  scheduleCompare = true;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  constructor(public help: HelpService,
    private $gaService: GoogleAnalyticsService,
    private chartService: ProfitDreamerChartService) {
  }

  ngOnInit(): void {
    this.chartOptions = this.chartService.pieChartOptions('Center Test',
      [{ name: 'apple', y: 25, color: 'red' },
      { name: 'orange', y: 50, color: 'orange' }]);
  }

  sendGaEvent = () => {
    //this.$gaService.gtag('create', 'G-NPS0X71K2S', 'auto');

    this.$gaService.gtag('event', 'experiment_impression', {
      experiment_id: 'zgjyPob-Qp2xt8gS8UMdwQ',
      variant_id: 'zgjyPob-Qp2xt8gS8UMdwQ.0',
      send_to: 'G-NPS0X71K2S',
    });

    // this.$gaService.appView('create', 'G-NPS0X71K2S', 'auto');
    // this.$gaService.set('exp','zgjyPob-Qp2xt8gS8UMdwQ.0');
    // this.$gaService.pageView('not-sure');
  };
}
