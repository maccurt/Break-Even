import { baselineBreakEven, breakEvenTest, ExpectedIncomeStatement } from "./baselineUnitAnalyisInput";

describe('break-even-income-statement', () => {

    before(() => {
        baselineBreakEven(8.5, 3.08, 10000, 0);
    });

    const incomeStatment: ExpectedIncomeStatement = {
        revenue: '$15,691.00',
        variableExpense: '5,685.68',
        fixedExpense: '10,000.00',
        expenseTotal: '$15,685.68',
        grossProfit: '$5.32'
    }

    breakEvenTest(incomeStatment);
});