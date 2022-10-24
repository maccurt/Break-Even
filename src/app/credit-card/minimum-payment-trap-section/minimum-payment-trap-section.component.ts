import { HelpService } from './../../help/help.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-minimum-payment-trap-section',
  templateUrl: './minimum-payment-trap-section.component.html',
  styleUrls: ['./minimum-payment-trap-section.component.scss']
})
export class MinimumPaymentTrapSectionComponent {
  constructor(public help: HelpService) { }
}
