describe('cc-intro-rate-baseline', () => {

    before(() => {
        cy.visit('credit-card-introductory-rate');
    });

    it('component should exist', () => {
        cy.getDataTestId('credit-card-intro-rate-component').should('exist');
    });
    
});