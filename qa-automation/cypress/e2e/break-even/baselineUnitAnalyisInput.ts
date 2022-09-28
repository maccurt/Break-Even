export class ExpectedIncomeStatement {
    revenue: string | number;
    variableExpense: string | number;
    fixedExpense: string | number;
    expenseTotal: string | number;
    grossProfit: string | number;
}

export function baselineBreakEven(revenuPerUnit: number, variableExpense: number,
    fixedExpense: number, grossProfit: number) {
    cy.visit('break-even')
    cy.getDataTestId('break-even-calculator').as('calculator');
    cy.get('@calculator').getDataTestId('revenue-per-unit').clear().type(revenuPerUnit.toString()).blur();
    cy.get('@calculator').getDataTestId('variable-expense').clear().type(variableExpense.toString()).blur();
    cy.get('@calculator').getDataTestId('fixed-expense').clear().type(fixedExpense.toString()).blur();
    cy.get('@calculator').getDataTestId('gross-profit').clear().type(grossProfit.toString()).blur();
    cy.get('@calculator').getDataTestId('calculate-break-even').click();
}

export function breakEvenTest(expectedIncomeStatement: ExpectedIncomeStatement) {

    beforeEach(() => {
        cy.getDataTestId('unit-income-statement').as('income-statement')
    })

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
}