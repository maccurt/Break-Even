import { HelpService } from './../../help/help.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-card-devil-section',
  templateUrl: './credit-card-devil-section.component.html',
  styleUrls: ['./credit-card-devil-section.component.scss']
})
export class CreditCardDevilSectionComponent {
  constructor(public help: HelpService) { }
}
