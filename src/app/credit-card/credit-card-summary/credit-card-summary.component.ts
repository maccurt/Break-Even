import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/schedule.type';

@Component({
  selector: 'app-credit-card-summary',
  templateUrl: './credit-card-summary.component.html',
  styleUrls: ['./credit-card-summary.component.scss']
})
export class CreditCardSummaryComponent implements OnInit {

  @Input() schedule!: Schedule;
  constructor() { }

  ngOnInit(): void {
  }

}
