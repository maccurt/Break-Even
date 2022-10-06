import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { IconService } from './../icon/icon.service';
import { BreakEvenComponent } from './../break-even/break-even.component';
import { Injectable } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
export class Help {
  constructor(public name: string, public defintion: string, public formula: string = '', icon: any = null) {
  }

  icon!:IconDefinition;
  showPercent:boolean = false;
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  grossProfitPercent = new Help('Gross Profit Percent',
    'Indicates amount of revenue left after subtracting variable expense. expressed as a percentage of total revenue.',
    '(revenue - expense) / revenue');

  breakEvenUnits  = new Help('Break Even Units',
    'The break-even point is the point at which total cost and total revenue are equal, meaning there is no loss or gain for your business.',
    'fixed expense / (revenue per Unit - variable Expense)');

  constructor(icons:IconService) {     
    //set the icons
    this.grossProfitPercent.icon = icons.grossProfitPercent;
    this.grossProfitPercent.showPercent = true;

    this.breakEvenUnits.icon  = icons.breakEvenUnits;
  }
}
