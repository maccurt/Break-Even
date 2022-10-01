export class ExpectedIncomeStatement {
    revenue: string | number;
    variableExpense: string | number;
    fixedExpense: string | number;
    expenseTotal: string | number;
    grossProfit: string | number;
    netIncome:string;
    incomeTax:string;
    taxRate:string;
}

export function baselineBreakEven(revenuPerUnit: number, variableExpense: number,
    fixedExpense: number, netIncome: number, taxRate: number) {
    cy.visit('break-even');
    cy.getDataTestId('unit-analysis-calculator').as('calculator');
    cy.get('@calculator').getDataTestId('revenue-per-unit').clear().type(revenuPerUnit.toString()).blur();
    cy.get('@calculator').getDataTestId('variable-expense').clear().type(variableExpense.toString()).blur();
    cy.get('@calculator').getDataTestId('fixed-expense').clear().type(fixedExpense.toString()).blur();
    cy.get('@calculator').getDataTestId('net-income').clear().type(netIncome.toString()).blur();
    cy.get('@calculator').getDataTestId('tax-rate').clear().type(taxRate.toString()).blur();
    cy.get('@calculator').getDataTestId('calculate-break-even').click();
}

export function breakEvenTest(expectedIncomeStatement: ExpectedIncomeStatement) {

    beforeEach(() => {
        cy.getDataTestId('unit-income-statement').as('income-statement');
    });

    it('revenue', () => {
        cy.get('@income-statement').getDataTestId('revenue')
            .should('contain.text', expectedIncomeStatement.revenue);
    });

    it('variable expense', () => {
        cy.get('@income-statement').getDataTestId('variable-expense')
            .should('contain.text', expectedIncomeStatement.variableExpense);
    });

    it('fixed expense', () => {
        cy.get('@income-statement').getDataTestId('fixed-expense')
            .should('contain.text', expectedIncomeStatement.fixedExpense);
    });

    it('expense total', () => {
        cy.get('@income-statement').getDataTestId('expense-total')
            .should('contain.text', expectedIncomeStatement.expenseTotal);
    });

    it('gross profit', () => {
        cy.get('@income-statement').getDataTestId('gross-profit')
            .should('contain.text', expectedIncomeStatement.grossProfit);
    });

    it('tax rate', () => {
        cy.get('@income-statement').getDataTestId('tax-rate-percent')
            .should('contain.text', expectedIncomeStatement.taxRate);
    });

    it('income tax', () => {
        cy.get('@income-statement').getDataTestId('income-tax')
            .should('contain.text', expectedIncomeStatement.incomeTax);
    });

    it('net income', () => {
        cy.get('@income-statement').getDataTestId('net-income')
            .should('contain.text', expectedIncomeStatement.netIncome);
    });
}