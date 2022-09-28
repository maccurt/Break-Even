import { baselineBreakEven, breakEvenTest, ExpectedIncomeStatement } from "./baselineUnitAnalyisInput";

describe('break-even-with-desired-gross-profit', () => {

    before(() => {
        baselineBreakEven(400, 325, 45000, 60000);
    });

    const incomeStatment: ExpectedIncomeStatement = {
        revenue: '$560,000.00',
        variableExpense: '455,000',
        fixedExpense: '45,000',
        expenseTotal: '$500,000',
        grossProfit: '$60,000'
    }

    breakEvenTest(incomeStatment);
});