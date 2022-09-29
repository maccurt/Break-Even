import { UnitIncomeStatement } from './unit-income-statement.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }

  //TODO move to math service
  round = (value: number, precision: number = 2): number => {
    const decimals = Math.pow(10, precision);
    return Math.round(value * decimals) / decimals;
  }

  unitsIncomeStatement = (revenuePerUnit: number, variableExpensePerUnit: number,
    fixedExpense: number, grossProfitDesired: number = 0): UnitIncomeStatement => {

    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let units = this.breakEvenUnits(revenuePerUnit, variableExpensePerUnit, fixedExpense, grossProfitDesired);
    const statement = new UnitIncomeStatement();
    statement.revenue = this.round(units * revenuePerUnit);
    statement.variableExpense = this.round(units * variableExpensePerUnit);
    statement.fixedExpense = fixedExpense;
    statement.expenseTotal = this.round(statement.variableExpense + statement.fixedExpense, 2)
    statement.grossProfitDesired = grossProfitDesired;
    statement.grossProfit = this.round(statement.revenue - statement.expenseTotal);
    statement.grossProfitPercent = this.grofitPercent(statement.revenue, statement.expenseTotal);
    statement.contributionMargin = contributionMargin;
    statement.units = units;
    return statement;
  };

  breakEvenUnits = (revenuePerUnit: number, variableExpensePerUnit: number, fixedCost: number, grossProfitDesired: number = 0): number => {
    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let unitsToBreakEven = (fixedCost + grossProfitDesired) / contributionMargin;
    return Math.ceil(unitsToBreakEven);
  };

  contributionMargin = (revenuePerUnit: number, variableExpensePerUnit: number): number => {
    let cm = revenuePerUnit - variableExpensePerUnit;
    return cm;
  };

  grofitPercent = (revenue: number, costOfGoodSold: number): number => {
    let gp = this.round(((revenue - costOfGoodSold) / revenue) * 100);
    return gp;
  }

}
