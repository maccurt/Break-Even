import { baselineBreakEven, breakEvenTest, ExpectedIncomeStatement } from "./baselineUnitAnalyisInput";

describe('unit-analysis-income-statenent', () => {

    before(() => {
        baselineBreakEven(400, 325, 45000, 60000, 35);
    });

    const incomeStatment: ExpectedIncomeStatement = {
        revenue: '$732,400.00',
        variableExpense: '595,075.00',
        fixedExpense: '45,000',
        expenseTotal: '640,075.00',
        grossProfit: '$92,325.00',
        incomeTax:'32,313.75',
        taxRate:'35%',
        netIncome:'$60,011.25'
        
    };

    breakEvenTest(incomeStatment);
});