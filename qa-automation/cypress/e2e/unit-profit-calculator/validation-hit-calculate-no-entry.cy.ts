describe('break-even validation', () => {

    before(() => {
        cy.visit('/unit-profit');        
        cy.getDataTestId('calculate-unit-profit').click();
        cy.wait(1000);
    });

    describe('should have error', () => {

        it('revenue per unit', () => {            
            cy.getDataTestId('revenue-per-unit').parent().should('have.class', 'has-error');
        });

        it('variable expense', () => {
            cy.getDataTestId('variable-expense').parent().should('have.class', 'has-error');
        });

        it('fixed expense', () => {
            cy.getDataTestId('fixed-expense').parent().should('have.class', 'has-error');
        });

        it('net income', () => {
            cy.getDataTestId('net-income').parent().should('have.class', 'has-error');
        });
        
    });   

});