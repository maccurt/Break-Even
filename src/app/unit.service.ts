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

  breakEvenUnitIncomeStatement = (revenuePerUnit: number, variableExpensePerUnit: number,
    fixedExpense: number): UnitIncomeStatement => {

    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let units = this.breakEvenUnits(revenuePerUnit, variableExpensePerUnit, fixedExpense);
    const statement = new UnitIncomeStatement();
    statement.revenue = this.round(units * revenuePerUnit);
    statement.variableExpense = this.round(units * variableExpensePerUnit);
    statement.fixedExpense = fixedExpense;
    statement.expenseTotal = this.round(statement.variableExpense + statement.fixedExpense, 2)
    statement.grossProfit = this.round(statement.revenue - statement.expenseTotal);    
    statement.contributionMargin = contributionMargin;
    statement.units = units;
    return statement;
  };

  breakEvenUnits = (revenuePerUnit: number, variableExpensePerUnit: number, fixedCost: number): number => {
    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let unitsToBreakEven = fixedCost / contributionMargin;
    return Math.ceil(unitsToBreakEven);
  };

  contributionMargin = (revenuePerUnit: number, variableExpensePerUnit: number): number => {
    let cm = revenuePerUnit - variableExpensePerUnit;
    return cm;
  };
}
