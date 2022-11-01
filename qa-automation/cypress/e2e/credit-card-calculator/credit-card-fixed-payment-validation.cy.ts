describe('credit-card-fixed-payment-validation.cy.ts', () => {

    const requiredMessage = '1 to 9999';
    const greaterThanMinPaymentMessage = 'Must be greater than minimum payment.';

    describe('10,000 15% payment fixed', () => {

        before(() => {
            cy.visit('/credit-card');
            cy.get('#balance').type('10000');
            cy.get('#interestRate').clear().type('15').blur();
            cy.get('#payment-type-fixed').click();
        });

        describe('focus on fixed payment and blur off', () => {

            it('required error message should be visibile and shown', () => {

                cy.get('#fixed-payment').focus().blur();
                cy.get('#fixed-payment-error').should('be.visible');
                cy.get('#fixed-payment-error').invoke('text').then((text) => {
                    expect(text.trim()).to.eq(requiredMessage);
                });
            });
        });

        describe('set fixed payment to 224', () => {

            it('must be greater than min payment should visibile and shown', () => {

                cy.get('#fixed-payment').clear().type('224').blur();
                cy.get('#fixed-payment-error').should('be.visible');
                cy.get('#fixed-payment-error').invoke('text').then((text) => {
                    expect(text.trim()).to.eq(greaterThanMinPaymentMessage);
                });
            });
        });

        describe('set fixed payment to 225', () => {

            it('must be greater than min payment should visibile and shown', () => {
                cy.get('#fixed-payment').clear().type('225').blur();
                cy.get('#fixed-payment-error').should('not.be.visible');
            });
        });

        describe('set balance to 11000', () => {

            it('must be greater than min payment should visibile and shown', () => {

                cy.get('#balance').clear().type('11000').blur();
                cy.get('#fixed-payment-error').should('be.visible');
                cy.get('#fixed-payment-error').invoke('text').then((text) => {
                    expect(text.trim()).to.eq(greaterThanMinPaymentMessage);
                });
            });
        });

        describe('set interest rate to 10', () => {

            it('must be greater than min payment should visibile and shown', () => {
                cy.get('#interestRate').clear().type('10').blur();
                cy.get('#fixed-payment').clear().type('225').blur();
                cy.get('#fixed-payment-error').should('not.be.visible');
            });
        });

        describe('change minimum payment to 4%', () => {

            it('must be greater than min payment should visibile and shown', () => {
                cy.get('#minimum-payment-type').select('4% of balance');
                cy.get('#fixed-payment-error').should('be.visible');
                cy.get('#fixed-payment-error').invoke('text').then((text) => {
                    expect(text.trim()).to.eq(greaterThanMinPaymentMessage);
                });
            });
        });
    });
});