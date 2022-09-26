describe('break-even-happy-path', () => {

    beforeEach(() => {
        cy.visit('break-even');
    });

    it('should calculate units to be 2,000 with comma', () => {
        cy.getDataTestId('revenue-per-unit').clear().type('8').blur();
        cy.getDataTestId('variable-expense').clear().type('3').blur();
        cy.getDataTestId('fixed-expense').clear().type('10000').blur();
        cy.getDataTestId('calculate-break-even').click();
        cy.getDataTestId('units-to-break-even').should('contain.text','Units: 2,000')
    });
});