import { UnitIncomeStatement } from './unit-income-statement.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfitAnalysisService {

  constructor() { }

  //TODO move to math service
  round = (value: number, precision: number = 2): number => {
    const decimals = Math.pow(10, precision);
    return Math.round(value * decimals) / decimals;
  };

  unitsIncomeStatementNetIcome = (revenuePerUnit: number, variableExpensePerUnit: number,
    fixedExpense: number, netIncome: number, taxRatePercent: number = 35): UnitIncomeStatement => {

    const grossProfit = this.grossProfitByNetIncome(taxRatePercent, netIncome);
    let is = this.unitsIncomeStatement(revenuePerUnit, variableExpensePerUnit, fixedExpense, grossProfit, taxRatePercent);
    is.netIncomeDesired = netIncome;
    return is;
  };

  unitsIncomeStatement = (revenuePerUnit: number, variableExpensePerUnit: number,
    fixedExpense: number, grossProfitDesired: number = 0, taxRatePercent: number = 35): UnitIncomeStatement => {

    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let units = this.unitsForGrossProfit(revenuePerUnit, variableExpensePerUnit, fixedExpense, grossProfitDesired);
    let breakEvenUnits = this.unitsForGrossProfit(revenuePerUnit, variableExpensePerUnit, fixedExpense, 0);
    const statement = new UnitIncomeStatement();
    statement.breakEvenUnits = breakEvenUnits;
    statement.revenuePerUnit = revenuePerUnit;
    statement.variableExpensePerUnit = variableExpensePerUnit;
    statement.revenue = this.round(units * revenuePerUnit);
    statement.variableExpense = this.round(units * variableExpensePerUnit);
    statement.fixedExpense = fixedExpense;
    statement.expenseTotal = this.round(statement.variableExpense + statement.fixedExpense, 2);

    statement.grossProfit = this.round(statement.revenue - statement.expenseTotal);
    statement.grossProfitPercent = this.grofitPercent(statement.revenue, statement.expenseTotal);
    statement.contributionMargin = contributionMargin;

    statement.incomeTax = this.round(statement.grossProfit * (taxRatePercent / 100));
    statement.taxRatePercent = taxRatePercent;

    statement.netIncome = this.round(statement.grossProfit - statement.incomeTax);

    statement.units = units;
    return statement;
  };

  unitsForGrossProfit = (revenuePerUnit: number, variableExpensePerUnit: number, fixedCost: number, grossProfitDesired: number = 0): number => {
    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let unitsToBreakEven = (fixedCost + grossProfitDesired) / contributionMargin;
    return Math.ceil(unitsToBreakEven);
  };

  grossProfitByNetIncome = (taxRate: number, netIncome: number): number => {
    const grossProfit = netIncome / (1 - (taxRate / 100));
    return grossProfit;
  };

  contributionMargin = (revenuePerUnit: number, variableExpensePerUnit: number): number => {
    let cm = revenuePerUnit - variableExpensePerUnit;
    return cm;
  };

  grofitPercent = (revenue: number, costOfGoodSold: number): number => {
    let gp = this.round(((revenue - costOfGoodSold) / revenue) * 100);
    return gp;
  };

}
