import { ScheduleCompare } from 'src/app/shared/schedule-compare.type';
import { IconService } from 'src/app/icon/icon.service';
import { Schedule } from './../../shared/schedule.class';
import { HelpService } from './../../help/help.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MetaService } from 'src/app/shared/meta.service';
import { CreditFormOutput } from '../credit-card-form/credit-card-form.component';
import { ActivatedRoute } from '@angular/router';

export enum CreditCardMode {
  default = 0,
  introductoryRate = 1
}

@Component({
  selector: 'app-credit-card-wizard',
  templateUrl: './credit-card-wizard.component.html',
  styleUrls: ['./credit-card-wizard.component.scss']
})
export class CreditCardWizardComponent implements OnInit {

  tabIndex: number = 0;
  subList$: Subscription[] = [];  
  isSubmitted: boolean = false;
  schedule1!: Schedule;
  schedule2!: Schedule;
  scheduleCompare!: ScheduleCompare;  

  constructor(
    private title: Title,
    private metaService: MetaService,
    public help: HelpService,
    public icon: IconService,
    private route: ActivatedRoute,
  ) {

    this.title.setTitle('Credit Card Calculator');
    this.metaService.addTitle('Credit Card Calculator');
    this.metaService.addDescription('Calculates your credit card interest and how many years it will take to pay off');
  }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((parms) => {
      if (parms.get('tab')) {        
        let tab = Number(parms.get('tab'));
        if (tab) {
          this.tabIndex = tab;          
        }
      }
    });
  }

  calculateEvent(output: CreditFormOutput): void {
    this.scheduleCompare = output.scheduleCompare;
    this.schedule1 = this.scheduleCompare.schedule1;
    this.schedule2 = this.scheduleCompare.schedule2;
    this.isSubmitted = output.isSubmitted;
  }
}
