describe('credit-card-validation-calculate.cy.ts', () => {

    //All you are doing here is clicking calculate to make sure the error message shows up
    before(() => {
        cy.visit('/credit-card');
        cy.get('#payment-type-extra').click();
        cy.wait(1000);
        cy.get('#calculate').click();
    });

    it('balance error should be visible', () => {
        cy.get('#balance-error-message').should('be.visible');
    });

    it('balance text should be', () => {
        cy.get('#balance-error-message').invoke('text').then((text) => {
            expect(text.trim()).to.equal('1 to 999999');
        });
    });

    it('interest rate error should be visible', () => {
        cy.get('#interestRate-error-message').should('be.visible');
    });

    it('extra payment error should be visible', () => {
        cy.get('#extra-payment-error').should('be.visible');
    });
});