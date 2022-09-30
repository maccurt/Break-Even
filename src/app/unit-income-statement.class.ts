export class UnitIncomeStatement {
  revenue!: number;
  variableExpense!: number;
  fixedExpense!: number;
  expenseTotal!: number;
  contributionMargin!: number;
  units!: number;
  grossProfit!: number;
  grossProfitPercent!: number;
  grossProfitDesired:number = 0;
  taxRatePercent!: number;
  incomeTax!: number;  
  netIncome!: number;
}