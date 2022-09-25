describe('break-even-happy-path', () => {

    beforeEach(() => {
        cy.visit('break-even');
    });

    it('should calculate units to be 125', () => {
        cy.getDataTestId('revenue-per-unit').type('100').blur();
        cy.getDataTestId('variable-expense').type('20').blur();
        cy.getDataTestId('fixed-expense').type('10000').blur();
        cy.getDataTestId('calculate-break-even').click();
        cy.getDataTestId('units-to-break-even').should('contain.text','Units: 125')
    });

});