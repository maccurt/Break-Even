import { Injectable } from '@angular/core';
import { MinimumPaymentType } from '../credit-card/credit-card-calculator/credit-card.types';
import { MathService } from '../math/math.service';
// import { MinimumPaymentType } from '../credit-card-calculator/credit-card.types';

import { ScheduleCompare } from './schedule-compare.type';
import { ScheduleItem } from './schedule-item';
import { Schedule } from './schedule.type';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private mathService: MathService) { }

  creditCardSchedule = (
    balance: number, annualPercentageRate: number,
    financeChargePercent: number, extraPayment?: number,
    isFixedPayment: boolean = false, includeApr: boolean = true): Schedule => {

    const monthlyPercentageRate = annualPercentageRate / 100 / 12;
    let monthlyInterest = 0;
    let interestTotal = 0;
    let paymentTotal = balance;
    let paymentCount = 0;
    const scheduleList: ScheduleItem[] = [];
    let monthlyPayment = 0;
    let principalPaid = 0;
    let balanceStart = balance;
    const orginalBalance = balance;

    while (balance > 0) {

      balanceStart = balance;
      const fixePayment = isFixedPayment ? extraPayment : 0;
      monthlyPayment = this.determineMinimumPayment(fixePayment!, financeChargePercent, balance, annualPercentageRate, includeApr);
      if (!isFixedPayment) {
        monthlyPayment += extraPayment!;
      }

      // Get the new monthly interest
      monthlyInterest = this.mathService.round(balance * monthlyPercentageRate, 2);
      interestTotal += monthlyInterest;
      balance += monthlyInterest;

      if (balance <= monthlyPayment) {
        monthlyPayment = this.mathService.round(balance, 2);
      }

      balance = this.mathService.round(balance - monthlyPayment, 2);
      paymentCount++;
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
    }

    interestTotal = this.mathService.round(interestTotal, 2);
    paymentTotal = this.mathService.round(paymentTotal + interestTotal, 2);

    const { years, months } = this.mathService.getYearsAndMonths(scheduleList.length);

    const schedule: Schedule = {
      balanceStart: orginalBalance,
      scheduleList,
      payment: 0,
      interest: interestTotal,
      interestRatePercent: annualPercentageRate,
      principal: principalPaid,
      paymentTotal,
      extraPrincipal: 0,
      periods: scheduleList.length,
      extraPrincipalPayment: 0,
      years,
      months,
      periodsText: this.getPeriodsText(scheduleList.length),
      interestPercentTotal: this.mathService.round(interestTotal / orginalBalance * 100, 2)
    };

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

  determineMinimumPayment = (
    fixedPayment: number, financeChargePercent: number,
    balance: number, annualPercentageRate: number, includeApr = true) => {

    let monthlyPayment = 0;

    if (fixedPayment > 0) {
      monthlyPayment = fixedPayment;
    } else {
      monthlyPayment = this.minimumPayment(financeChargePercent, balance, annualPercentageRate, includeApr);
    }
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
    minimumPaymentTypeList.push({ useInterest: false, percentOfBalance: 2.08, text: '2.08% of balance' });
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
