describe('credit-card-baseline.cy.ts', () => {

    before(() => {
        cy.visit('/credit-card');
    });

    it('title should be correct', () => {
        cy.title().should('equal', 'Credit Card Calculator');
    });

    it('balance input should have no value', () => {
        cy.get('#balance').should('have.value', '');
    });

    it('interest rate should the default value 16.4', () => {
        cy.get('#interestRate').should('have.value', '16.4');
    });

    it('minimum payment type should be the first item', () => {
        cy.get('#minimum-payment-type').find(':selected').contains('Interest + 1% of balance');
    });

    it('minimum payment type should be selected to Interest + 1% of balance', () => {
        cy.get('#minimum-payment-type').find(':selected').invoke('text').then((text) => {
            expect(text).to.eq('Interest + 1% of balance');
        });
    });    
});