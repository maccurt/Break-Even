import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { IconService } from './../icon/icon.service';
import { Injectable } from '@angular/core';
import { Help } from './Help';
import { icon } from '@fortawesome/fontawesome-svg-core';

const loremIpsum = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero consequuntur esse animi tenetur, iure voluptates.  ';
const totalPrinicpalAndInterest: string =
  'How much you will pay in principal and interest to pay off the credit card balance.';

export function HelpWithHtmlInParagraph(title: string, routeLink: string, icon: IconDefinition, iconClass: string, html: string,
): Help {
  const help = new Help(title, '', '', '');
  help.html = `<p>${html}<p>`;
  help.icon = icon;
  help.iconClass = iconClass;
  if (routeLink && routeLink !== '') {
    help.routeLink = routeLink;
  }

  return help;
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  static helpDefault = HelpWithHtmlInParagraph('The Section Title', '', IconService.creditCardInstruction1, 'help-default', loremIpsum);

  //Calculators
  financialCalculators = HelpWithHtmlInParagraph('Financial Calculators', '', IconService.creditCardInstruction1, 'credit-card', loremIpsum);
  creditCardCalculator = HelpWithHtmlInParagraph('Credit Card Pay Off Calculator', 'credit-card', IconService.creditCardInstruction1, 'credit-card', loremIpsum);
  unitProfitAnalysisCalculaotr = HelpWithHtmlInParagraph('Unit Profit Calculator', 'unit-profit', IconService.sackDollar, 'unit', loremIpsum);
  calculatorList: Help[] = [this.creditCardCalculator, this.unitProfitAnalysisCalculaotr];

  //Press Toward The Mark Ideas
  financialEmanicipation = HelpWithHtmlInParagraph('Financial Emancipation', '', IconService.sackDollar, 'financial-emanicipation',
    'The rich rule over the poor, and the borrower is slave to the lender. Our goal is to help individuals break the manacles of debt with online financial calculators designed to educate, equip and encourage.We want to help you achieve financial emancipation');
  motivation = HelpWithHtmlInParagraph('Motivation', '', IconService.motivation, 'motivation',
    'Our passion is educating, equipping and encouraging others to chase down their dreams. “Press Toward The Mark” is our motivational battle cry when we charge into the fray. Arise, users of Profit Dreamer. Fell tasks awake, fire and slaughter.');
  taskBasedGoals = HelpWithHtmlInParagraph('Task Based Goals', '', IconService.taskBasedGoals, 'task-based-goals',
    'We are very task oriented and have an insatiable need to make incremental progress that leads to the completion of a bigger goal. Expect a lot of ideas around finding ways to get stuff done and released for feedback. Warts and all.');
  technology = HelpWithHtmlInParagraph('Technology', '', IconService.technology, 'technology',
    'Technology is how we communicate and deliver our products. Educating others in its use is a priority for us. We will be transparent about our technology stack and will share our process from design to implementation, Warts and all.');

  pressTowardTheMarkList: Help[] = [this.financialEmanicipation, this.motivation, this.taskBasedGoals, this.technology];

  //The Seven Habits
  sevenHabits = HelpWithHtmlInParagraph("The Seven Habits", 'the-7-habits', IconService.cog, 'seven-habits',
    "The Seven Habits are rules and constraints that keep us pressing toward the mark to complete our tasks, goals and ultimately the dream.");
  twentyMinuteRule = HelpWithHtmlInParagraph("The 20 Minute Rule.", '', IconService.clock, 'twenty-minute-rule',
    'Is a framework designed to help you make the time to  <u>execute</u> the tasks that will complete your goal.');
  doesItHaveValue = HelpWithHtmlInParagraph('Does It Have Value?', '', IconService.doesItHaveValue, 'does-it-have-value',
    'Is the practice of prioritizing your tasks by value so you stay focused on completing the goal.');
  wartsAndAll = HelpWithHtmlInParagraph('Warts & All!', '', IconService.wartsAndAllIcon, 'warts-and-all',
    'Is a constraint to schedule a release of your product frequently so you can gain valuable customer feedback.');
  whatDidYouLearn = HelpWithHtmlInParagraph('What Did You Learn?', '', IconService.whatDidYouLearn, 'what-did-you-learn',
    'Is introspection into your processes and product so you can make valuable adjustments.');
  useWhatYouGout = HelpWithHtmlInParagraph('Use What You Got.', '', IconService.useWhatYouGot, 'use-what-you-got',
    'Is maximizing and finding new ways to use what you already possess in order to increase your productivity.');
  noTimeWasting = HelpWithHtmlInParagraph('No Time Wasting.', '', IconService.noTimeWasting, 'no-time-wasting',
    'Is organizing your time so you can increase the velocity of reaching your goal.');
  restAndCelebrate = HelpWithHtmlInParagraph('Rest & Celebrate.', '', IconService.restAndCelebrate, 'rest-and-celebrate',
    'Is motivation to convince you that it is profitable to rest and celebrate .');
  sevenHabitList: Help[] = [this.twentyMinuteRule,

  this.doesItHaveValue, this.wartsAndAll,
  this.whatDidYouLearn, this.useWhatYouGout,
  this.noTimeWasting, this.restAndCelebrate];

  creditCardLinkButton = new Help('Credit Card Pay Off Calculator',
    '', '', 'good-icon-1');

  creditCreditDevilButton = new Help('Credit Card Devil',
    '', '', 'good-icon-1');
    
  creditCardCalculatorInstruction1 = new Help('Pay Off Debt Faster To Save Money',
    '', '', 'good-icon-1');

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

  creditCardBalance1 = new Help('What Is The Balance On Your Credit Card?',
    'What Is The Balance On Your Credit Card?','', 'cc-balance');
    
  fixedPayment = new Help('What Fixed Payment Can You Make Monthly?',
    'What Fixed Payment Can You Make Monthly?','', 'cc-fixed-payment');
    
  interestRate = new Help('What Is Your Interest Rate % (APR)?',
    'What Is Your Interest Rate % (APR)?','', 'cc-interest-rate');
    
  minPaymentCalculation = new Help('How Is Your Minimum Payment Calculated?',
    'How Is Your Minimum Payment Calculated?','', 'cc-min-pay-calc');    

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
    totalPrinicpalAndInterest, '', 'danger-icon');

  creditTotalPrincipalAndInterestByPayingExtra = new Help('Total Principal & Interest By Paying Extra',
    totalPrinicpalAndInterest, '', 'icon-color-1');

  creditTotalPrincipalAndInterestFixedPayment = new Help('Total Principal & Interest With Fixed Payment',
    totalPrinicpalAndInterest, '', 'icon-color-1');

  creditCardInterestRate = new Help('Interes Rate',
    'The annual interest rate (APR) you are charged on your credit card. you can find it on your credit card bill statement.', '');

  minimumPaymentTrap = new Help('Minimum Payment Trap',
    'put some sort of text here', '', 'danger-icon');

  creditCardDevil = new Help('Credit Card Devil',
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

    this.creditCardInterestRate.hint = "Find your interest rate on your credit card bill.";
    this.creditCardCalculatorInstruction1.icon = IconService.creditCardInstruction1;
    this.creditCardLinkButton.icon = icons.creditCard;

    this.creditCardBalance1.icon = icons.creditCard;
    this.creditCardDevil.icon = icons.sackDollar;
    this.interestRate.icon = icons.interestRate;
    this.fixedPayment.icon = icons.commentDollar;

    this.minPaymentCalculation.icon = icons.calculator;

  }
}