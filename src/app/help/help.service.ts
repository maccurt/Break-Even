import { IconService } from './../icon/icon.service';
import { Injectable } from '@angular/core';
import { Help } from './Help';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  creditCardBalance = new Help('Balance',
    'The balance you owe on your credit card', '');

  creditCardInterestRate = new Help('Interes Rate',
    'The interest rate you are charged on your credit card.', '');

  minimumPaymentTrap = new Help('Minimum Payment Trap',
    'put some sort of text here', '', 'danger-icon');

  creditCardDevil = new Help('Credit Cards Are The Devil',
    'put some sort of text here', '', 'danger-icon');

  totalTimeSavings = new Help('Total Time Savings',
    'put some sort of text here', '', 'icon-color-1');

  timeSavedByPayingExtra = new Help('Time Saved By Paying Extra',
    'put some sort of text here', '', 'icon-color-1');

  timeToPayOfDebt = new Help('Time To Pay Off Debt',
    'put some sort of text here', '', 'icon-color-2');

  grossProfitPercent = new Help('Gross Profit Percent',
    'Indicates amount of revenue left after subtracting variable expense. expressed as a percentage of total revenue.',
    '(revenue - expense) / revenue');

  breakEvenUnits = new Help('Break Even Units',
    'The break-even point is the point at which total cost and total revenue are equal, meaning there is no loss or gain for your business.',
    'fixed expense / (revenue per Unit - variable Expense)');

  constructor(icons: IconService) {
    //set the icons
    this.grossProfitPercent.icon = icons.grossProfitPercent;
    this.grossProfitPercent.showPercent = true;
    this.breakEvenUnits.icon = icons.breakEvenUnits;
    this.totalTimeSavings.icon = icons.time;
    this.timeToPayOfDebt.icon = icons.time;
    this.timeSavedByPayingExtra.icon = icons.time;
    this.creditCardDevil.icon = icons.creditCardDevil;
    this.minimumPaymentTrap.icon = icons.trap;
  }
}
