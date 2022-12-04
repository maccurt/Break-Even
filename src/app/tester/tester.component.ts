import { HelpService } from './../help/help.service';
import { Component } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent {
  scheduleCompare = true;
  constructor(public help: HelpService, private $gaService: GoogleAnalyticsService) {
  }

  sendGaEvent = () => {
    //this.$gaService.gtag('create', 'G-NPS0X71K2S', 'auto');

    // this.$gaService.gtag('event', 'experiment_impression', {
    //   experiment_id: 'zgjyPob-Qp2xt8gS8UMdwQ',
    //   variant_id: 'zgjyPob-Qp2xt8gS8UMdwQ.0',
    //   send_to: 'G-NPS0X71K2S',
    // });

    // this.$gaService.appView('create', 'G-NPS0X71K2S', 'auto');
    // this.$gaService.set('exp','zgjyPob-Qp2xt8gS8UMdwQ.0');
    // this.$gaService.pageView('not-sure');
  };
}
