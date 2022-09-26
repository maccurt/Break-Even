import { UnitIncomeStatement } from './unit-income-statement.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }

  breakEvenUnitIncomeStatement = (revenuePerUnit: number, variableExpensePerUnit: number, fixedExpense: number): UnitIncomeStatement => {

    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let units = this.breakEvenUnits(revenuePerUnit, variableExpensePerUnit, fixedExpense);

    const statement = new UnitIncomeStatement();
    statement.revenue = units * revenuePerUnit;
    statement.variableExpense = units * variableExpensePerUnit;
    statement.fixedExpense = fixedExpense;
    statement.expenseTotal = statement.variableExpense + statement.fixedExpense;
    statement.grossProfit = statement.revenue - statement.expenseTotal;
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
