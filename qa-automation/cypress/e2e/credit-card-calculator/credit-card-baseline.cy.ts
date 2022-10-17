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

    it('interest rate should have no value', () => {
        cy.get('#interestRate').should('have.value', '');
    });

    it('minimum payment type should be the first item', () => {
        cy.get('#minimum-payment-type').find(':selected').contains('Interest + 1% of balance');
    });

    it('minimum payment type shold be selected to Interest + 1% of balance', () => {
        cy.get('#minimum-payment-type').find(':selected').invoke('text').then((text) => {
            expect(text).to.eq('Interest + 1% of balance');
        });
    });

    it('fixed payment input should NOT be visible', () => {
        cy.get('#payment-input-container').should('exist');
        cy.get('#payment-input-container').should('not.be.visible');
    });
});