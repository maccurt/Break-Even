import { HelpService } from './../help/help.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent {
  scheduleCompare = true;
  constructor(public help: HelpService) {

  }

}
