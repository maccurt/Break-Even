import { IconService } from './../icon/icon.service';
import { Injectable } from '@angular/core';
import { Help } from './Help';

const totalPrinicpalAndInterest: string =
  'How much you will pay in principal and interest to pay off the credit card balance.';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  minimumPaymentCalculation = new Help('Minimum Payment Calculation',
    'How is the minimum payment calculated on your credit card?', '');

  creditCardMinimumPayment = new Help('Minimum Payment',
    'Pay the minimum payment calculated by the credit card company', '');

  creditCardMinimumPaymentPlusExtra = new Help('Minimum Payment + Extra',
    'Pay the minimum payment calculated by the credit card company + Extra', '');

  creditCardFixedPayment = new Help('Fixed Payment',
    'Pay the same fixed amount each month', '');

  creditCardBalance = new Help('Balance',
    'The balance you owe on your credit card', '');

  creditCardMinPayInterest = new Help('Minimum Payment Interest',
    'How much interest you will occur', '', 'danger-icon');

  creditCardInterestSavings = new Help('Interest Saved',
    'How much you will save in interest by making more than the minimum payment', '', 'good-icon-1');

  interestSavedByPayingExtra = new Help('Interest Saved By Paying Extra',
    'How much you will save in interest by making more than the minimum payment', '', 'good-icon-1');

  interestSavedByPayingFixedPayment = new Help('Interest Saved By Making Fixed Payment',
    'Put some text here', '', 'good-icon-1');

  creditCardMinimumPaymentInterest = new Help('Minimum Payment Interest',
    'add some text here', '', 'danger-icon');

  creditCardFixedPaymentInterest = new Help('Fixed Payment Interest',
    'add some text here', '', 'good-icon-2');

  creditCardMinPayPlusExtraInterest = new Help('Minimum Payment + Extra Payment Interest',
    'add some text here', '', 'good-icon-2');

  creditTotalPrincipalAndInterestMinimumPayment = new Help('Total Principal & Interest Minium Payment Only',
    totalPrinicpalAndInterest,'', 'danger-icon');

  creditTotalPrincipalAndInterestByPayingExtra = new Help('Total Principal & Interest By Paying Extra',
    totalPrinicpalAndInterest, '', 'icon-color-1');

  creditTotalPrincipalAndInterestFixedPayment = new Help('Total Principal & Interest With Fixed Payment',
    totalPrinicpalAndInterest, '', 'icon-color-1');

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
    
  timeSavedFixedPayment = new Help('Time Saved By Making Fixed Payment',
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
    this.timeSavedFixedPayment.icon = icons.time;
    this.creditCardDevil.icon = icons.creditCardDevil;
    this.minimumPaymentTrap.icon = icons.trap;
    this.creditCardInterestSavings.icon = icons.interestSaved;
    this.interestSavedByPayingExtra.icon = icons.interestSaved;
    this.interestSavedByPayingFixedPayment.icon = icons.interestSaved;
    this.creditTotalPrincipalAndInterestByPayingExtra.icon = icons.creditCard;
    this.creditTotalPrincipalAndInterestFixedPayment.icon = icons.creditCard;
    this.creditTotalPrincipalAndInterestMinimumPayment.icon = icons.creditCard;
    this.creditCardMinimumPaymentInterest.icon = icons.interest;
    this.creditCardMinPayPlusExtraInterest.icon = icons.minPayPlusExtraInterest;
    this.creditCardFixedPaymentInterest.icon = icons.minPayPlusExtraInterest;
    this.creditCardMinPayInterest.icon = icons.interest;
  }
}