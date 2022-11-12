import { HelpService } from './../../help/help.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seven-habits',
  templateUrl: './seven-habits.component.html',
  styleUrls: ['./seven-habits.component.scss']
})
export class SevenHabitsComponent {

  constructor(public help: HelpService) { }
}
