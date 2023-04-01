import { MinimumPaymentCalculation } from './minimum-payment-calculation.class';
import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MinimumPaymentType } from '../credit-card/credit-card-calculator/credit-card.types';
import { MathService } from '../math/math.service';
import { ScheduleCompare } from './schedule-compare.type';
import { ScheduleItem } from './schedule-item';
import { Schedule } from './schedule.class';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  populateScheduleItem(item: ScheduleItem) {
    //TODO if you only have this one property move it
    item.interestPercentOfPayment = this.mathService.getPercent(item.interest, item.payment!);
    item.principalPercentOfPayment = this.mathService.getPercent(item.principal, item.payment!);
  }

  constructor(private mathService: MathService, private currency: CurrencyPipe) { }

  creditCardSchedule = (
    balance: number, annualPercentageRate: number,
    financeChargePercent: number, extraPayment?: number,
    isFixedPayment: boolean = false, includeApr: boolean = true): Schedule => {

    return this.creditCardScheduleZeroPercentOption(balance, annualPercentageRate,
      financeChargePercent, extraPayment,
      isFixedPayment, includeApr);
  };

  monthlyPercentRate = (annualPercentRate: number): number => {
    const rate = this.mathService.round(annualPercentRate / 12 / 100, 5);
    return rate;
  };

  creditCardScheduleZeroPercentOption = (
    balance: number, annualPercentageRate: number,
    financeChargePercent: number, extraPayment?: number,
    isFixedPayment: boolean = false, includeApr: boolean = true, introRate: number = 0,
    introMonths: number = 0, introFeePercent: number = 0): Schedule => {

    if (balance <= 0) {
      throw new Error('input error: balance 0');
    }

    if (annualPercentageRate <= 0) {
      throw new Error('input error: annualPercentageRate');
    }

    let chargeForIntroductoryRate = 0;
    if (introMonths > 0 && introFeePercent > 0) {
      const chargeRate = this.mathService.round(introFeePercent / 100, 5);
      chargeForIntroductoryRate = this.mathService.round(chargeRate * balance);
      balance = balance + chargeForIntroductoryRate;
    }

    let monthlyInterest = 0;
    let interestTotal = 0;
    let paymentTotal = balance;
    let paymentCount = 0;
    const scheduleList: ScheduleItem[] = [];
    let monthlyPayment = 0;
    let principalPaid = 0;

    let balanceStart = balance;
    const orginalBalance = balance;
    const monthlyPercentageRate = this.monthlyPercentRate(annualPercentageRate);
    const introMonthlyPercentRate = this.monthlyPercentRate(introRate);

    while (balance > 0) {

      paymentCount++;
      balanceStart = balance;
      const fixedPayment = isFixedPayment ? extraPayment : 0;

      let aprForMonth = annualPercentageRate;
      //If we are in a %month set the apr to zero      
      if (introMonths >= paymentCount) {
        aprForMonth = introRate;
      }

      monthlyPayment = this.determineMonthlyPayment(fixedPayment!, financeChargePercent, balance, aprForMonth, includeApr);

      //If this is not a fixed payment then add the extra payment to the minimum payment
      if (!isFixedPayment) {
        monthlyPayment += extraPayment!;
      }

      //Get the new monthly interest for current balance
      if (introMonths + 1 <= paymentCount) {
        monthlyInterest = this.mathService.round(balance * monthlyPercentageRate, 2);
      }
      else {

        monthlyInterest = introRate === 0 ? 0 :
          monthlyInterest = this.mathService.round(balance * introMonthlyPercentRate, 2);
        
      }
      //add to final interest total
      interestTotal += monthlyInterest;

      //Add the montly interes to the balance
      balance += monthlyInterest;

      //If the balance is less than or equal monthly payment
      //set the minimum payment to the balance
      if (balance <= monthlyPayment) {
        monthlyPayment = this.mathService.round(balance, 2);
      }

      //set the balance to the balance minus the  monthly payment
      balance = this.mathService.round(balance - monthlyPayment, 2);
      principalPaid = this.mathService.round(monthlyPayment - monthlyInterest, 2);

      const scheduleItem: ScheduleItem = {
        payment: monthlyPayment,
        balanceStart,
        balanceEnd: balance,
        interest: monthlyInterest,
        principal: principalPaid,
        extraPrincipal: extraPayment!
      };
      scheduleList.push(scheduleItem);
    } // end of loop

    interestTotal = this.mathService.round(interestTotal, 2);
    paymentTotal = this.mathService.round(paymentTotal + interestTotal, 2);

    const { years, months } = this.mathService.getYearsAndMonths(scheduleList.length);

    const schedule: Schedule = {
      balanceStart: orginalBalance,
      scheduleList,
      payment: isFixedPayment ? extraPayment! : 0,
      isFixedPayment: isFixedPayment,
      interest: interestTotal,
      interestRatePercent: annualPercentageRate,
      principal: principalPaid,
      paymentTotal,
      extraPrincipal: 0,
      periods: scheduleList.length,
      extraPrincipalPayment: extraPayment!,
      years,
      months,
      periodsText: this.getPeriodsText(scheduleList.length),
      interestPercentTotal: this.mathService.round(interestTotal / orginalBalance * 100, 2),
      chargeForIntroductoryRate: chargeForIntroductoryRate
    };

    if (schedule.isFixedPayment && schedule.payment > 0) {
      schedule.title = this.currency.transform(schedule.payment)! + ' Fixed Payment';
    }
    else if (extraPayment && extraPayment > 0) {
      schedule.title = 'Minimum Payment + ' + this.currency.transform(extraPayment);
    }
    else {
      schedule.title = 'Minimum Payment';
    }

    return schedule;
  };

  periodicInterestRate = (ratePercent: number): number => {
    return ratePercent / 12 / 100;
  };

  payment = (loanAmount: number, ratePercent: number, years: number): number => {
    const df = this.discountFactor(ratePercent, years);
    return this.mathService.round(loanAmount / df, 2);
  };

  discountFactor = (ratePercent: number, years: number): number => {
    const periods = years * 12;
    const rateForPeriod = this.periodicInterestRate(ratePercent);
    const a = Math.pow(1 + rateForPeriod, periods) - 1;
    const b = rateForPeriod * Math.pow(1 + rateForPeriod, periods);
    return this.mathService.round(a / b, 4);
  };

  getScheduleCompare = (s1: Schedule, s2: Schedule): ScheduleCompare => {
    const sc = new ScheduleCompare();
    sc.schedule1 = s1;
    sc.schedule2 = s2;
    sc.interestDifference = this.mathService.round(s1.interest - s2.interest, 2);
    sc.interestDifferencePercent = this.mathService.round(
      sc.interestDifference / s1.interest * 100, 2);
    sc.monthsSaved = s1.scheduleList.length - s2.scheduleList.length;
    sc.periodsSavedText = this.getPeriodsText(sc.monthsSaved);
    return sc;
  };

  getPeriodsText = (periodsInMonth: number): string => {
    // 3 Years,6 Months
    let text = '';
    const { years, months } = this.mathService.getYearsAndMonths(periodsInMonth);

    if (years === 0 && periodsInMonth > 0) {
      text = months + ' Months';
    }
    if (years > 1) {
      text = years.toString() + ' Years, ' + months + ' Months';
    }

    if (years === 1) {
      text = years.toString() + ' Year, ' + months + ' Months';
    }

    return text;
  };

  minimumPaymentCalculation = (financeChargePercent: number, balance: number,
    annualPercentageRate: number, includeInterest: boolean = true): MinimumPaymentCalculation => {

    let minPayCalc = new MinimumPaymentCalculation();
    let financeCharge = 0;
    const financeChargeFactor = financeChargePercent / 100;

    minPayCalc.financeChargePercent = financeChargePercent;
    minPayCalc.financeChargeFactor = financeChargeFactor;
    minPayCalc.balance = balance;
    minPayCalc.includeInterest = includeInterest;
    minPayCalc.annualPercentageRate = annualPercentageRate;
    minPayCalc.monthlyInterest = 0;

    financeCharge = (balance * financeChargeFactor);
    minPayCalc.financeCharge = financeCharge;

    const interestRateMonthly = annualPercentageRate / 100 / 12;
    minPayCalc.monthlyPercentageRate = annualPercentageRate / 12;

    minPayCalc.interestRateMonthly = interestRateMonthly;
    if (includeInterest) {

      let monthlyInterest = (balance * interestRateMonthly);
      minPayCalc.minimumPayment = financeCharge + monthlyInterest;
      minPayCalc.monthlyInterest = monthlyInterest;
    }
    else {
      minPayCalc.minimumPayment = financeCharge;
    }

    minPayCalc.minimumPayment = this.mathService.round(minPayCalc.minimumPayment, 2);
    return minPayCalc;
  };

  /**
 * @deprecated use method above
 */
  minimumPayment = (

    financeChargePercent: number, balance: number,
    annualPercentageRate: number, includeInterest: boolean = true): number => {

    let minimumPayment = 0;
    const financeChargeFactor = financeChargePercent / 100;

    minimumPayment = (balance * financeChargeFactor);

    if (includeInterest) {
      const rate = annualPercentageRate / 100 / 12;
      minimumPayment += (balance * rate);
    }

    return this.mathService.round(minimumPayment, 2);
  };

  determineMonthlyPayment = (
    fixedPayment: number, financeChargePercent: number,
    balance: number, annualPercentageRate: number, includeApr = true) => {

    if (!balance || balance === 0) {
      return 0;
    }
    let monthlyPayment = 0;

    if (fixedPayment > 0) {
      monthlyPayment = fixedPayment;
    } else {
      monthlyPayment = this.minimumPayment(financeChargePercent, balance, annualPercentageRate, includeApr);
    }
    //TODO in the future consider adding an option for this
    //maybe it will be $25 in future, etc.
    //https://wallethub.com/answers/cc/minimum-payment-on-0-apr-credit-card-2140670532/#:~:text=The%20minimum%20payment%20on%20a%200%25%20APR%20credit%20card%20is,percent%20of%20the%20total%20balance.
    if (monthlyPayment < 15) {
      monthlyPayment = 15;
    }
    return monthlyPayment;
  };

  getScheduleLoan = (currentBalance: number, ratePercent: number, payment: number, extraPrincipal: number): Schedule => {

    const periodicInterestRate = this.periodicInterestRate(ratePercent);
    const s = new Schedule();
    let balance = currentBalance;
    s.payment = payment;
    s.extraPrincipalPayment = extraPrincipal;
    s.interestRatePercent = ratePercent;
    let index = 0;

    while (balance > 0) {
      const interest = this.mathService.round(balance * periodicInterestRate, 2);
      index++;

      const si = new ScheduleItem();
      si.balanceStart = balance;
      si.interest = interest;
      si.extraPrincipal = extraPrincipal;
      si.principal = this.mathService.round(payment - interest, 2);
      si.balanceEnd = this.mathService.round(balance - si.principal - si.extraPrincipal, 2);
      this.adjustScheduleItem(payment, si, false);
      // Add Totals
      s.interest += interest;
      s.principal += si.principal;
      s.extraPrincipal += si.extraPrincipal;
      balance = si.balanceEnd;
      s.scheduleList.push(si);
    }

    s.interest = this.mathService.round(s.interest, 2);
    s.principal = this.mathService.round(s.principal, 2);

    s.paymentTotal = s.interest + s.principal + s.extraPrincipal;
    s.periods = s.scheduleList.length;
    return s;
  };

  getScheduleAdvanced = (
    loanAmount: number, ratePercent: number, loanLengthYears: number,
    periodsMonthsLeftOnLoan: number, extraPrincipal: number = 0): Schedule => {

    const periodicInterestRate = this.periodicInterestRate(ratePercent);
    const payment = this.payment(loanAmount, ratePercent, loanLengthYears);
    const s = new Schedule();
    const orginalMonth = loanLengthYears * 12;
    const startExtraPaymentMonth = orginalMonth - periodsMonthsLeftOnLoan + 1;

    let balance = loanAmount;
    s.payment = payment;
    s.extraPrincipalPayment = extraPrincipal;
    s.interestRatePercent = ratePercent;

    let index = 0;
    while (balance > 0) {
      const interest = this.mathService.round(balance * periodicInterestRate, 2);
      index++;

      const si = new ScheduleItem();

      if (index >= startExtraPaymentMonth) {
        si.extraPrincipal = extraPrincipal;
      }
      else {
        si.extraPrincipal = 0;
      }

      si.balanceStart = balance;
      si.interest = interest;
      si.principal = this.mathService.round(payment - interest, 2);
      si.balanceEnd = this.mathService.round(balance - si.principal - si.extraPrincipal, 2);

      // TOD FIGURE THIS OUT
      this.adjustScheduleItem(payment, si, orginalMonth === index);

      // Add Totals
      s.interest += interest;
      s.principal += si.principal;
      s.extraPrincipal += si.extraPrincipal;
      balance = si.balanceEnd;
      s.scheduleList.push(si);
    }

    s.interest = this.mathService.round(s.interest, 2);
    s.principal = this.mathService.round(s.principal, 2);

    s.paymentTotal = s.interest + s.principal + s.extraPrincipal;
    s.periods = s.scheduleList.length;
    return s;
  };

  getScheduleYears = (loanAmount: number, ratePercent: number, years: number, extraPrincipal: number = 0): Schedule => {

    return this.getScheduleAdvanced(loanAmount, ratePercent, years, years * 12, extraPrincipal);
  };

  adjustScheduleItem = (payment: number, si: ScheduleItem, isLastPeriod = false) => {

    // To simplify this the end balance can not fall below 0
    // so we should should just adjust any payment
    // that will end up with a negative balance
    if (isLastPeriod) {
      si.principal = si.balanceStart;
      si.balanceEnd = 0;
      return;
    }

    if (payment > si.balanceStart + si.interest) {
      si.extraPrincipal = 0;
      si.principal = si.balanceStart;
      si.balanceEnd = 0;
      return;
    }

    if (si.interest + si.principal + si.extraPrincipal > si.balanceStart) {
      if (si.extraPrincipal > 0) {
        si.extraPrincipal = this.mathService.round(si.balanceStart + si.interest - payment, 2);
        si.balanceEnd = 0;
        return;
      }
    }
  };

  getMinimumPaymentTypeList = (): MinimumPaymentType[] => {

    const minimumPaymentTypeList: MinimumPaymentType[] = [];
    minimumPaymentTypeList.push({ useInterest: true, percentOfBalance: 1, text: 'Interest + 1% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2, text: '2% of balance' });
    //minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2.08, text: '2.08% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2.5, text: '2.5% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2.08, text: '2.08% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2.5, text: '2.5% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2.78, text: '2.78% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 3, text: '3% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 3.5, text: '3.5% of balance' });
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 4, text: '4% of balance' });
    return minimumPaymentTypeList;
  };
}
