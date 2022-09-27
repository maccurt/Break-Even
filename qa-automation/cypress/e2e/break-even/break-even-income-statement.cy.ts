describe('break-even-income-statement', () => {

    before(() => {
        baselineBreakEven();
    });

    beforeEach(() => {
        cy.getDataTestId('unit-income-statement').as('income-statement')
    })

    it('revenue', () => {
        cy.get('@income-statement').getDataTestId('revenue').should('contain.text', '$15,691.00');
    });

    it('variable', () => {
        cy.get('@income-statement').getDataTestId('variable-expense').should('contain.text', '5,685.68');
    });

    it('fixed expense', () => {
        cy.get('@income-statement').getDataTestId('fixed-expense').should('contain.text', '10,000.00');
    });

    it('expense total', () => {
        cy.get('@income-statement').getDataTestId('expense-total').should('contain.text', '$15,685.68');
    });

    it('gross profit', () => {
        cy.get('@income-statement').getDataTestId('gross-profit').should('contain.text', '$5.32');
    });
});

export function baselineBreakEven() {

    cy.visit('break-even')
    cy.getDataTestId('break-even-calculator').as('calculator');
    cy.get('@calculator').getDataTestId('revenue-per-unit').clear().type('8.5').blur();
    cy.get('@calculator').getDataTestId('variable-expense').clear().type('3.08').blur();
    cy.get('@calculator').getDataTestId('fixed-expense').clear().type('10000').blur();
    cy.get('@calculator').getDataTestId('calculate-break-even').click();
}