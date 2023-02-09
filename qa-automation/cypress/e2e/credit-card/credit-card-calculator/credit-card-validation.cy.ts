describe('credit-card-validation.cy.ts', () => {

    before(() => {
        cy.visit('/credit-card');
        cy.getDataTestId('extra-payment-type').click();
    });

    describe('credit card balance', () => {

        beforeEach(() => {
            cy.get('#balance').as("input");
            cy.get('#balance-error-message').as("error");
        });

        it('error should not be visible', () => {
            cy.get('@error').should('not.be.visible');
        });

        it('blur error should be visible', () => {
            cy.get('@input').focus().blur();
            cy.get('@error').should('be.visible');
        });

        it('enter 1 error should not be visible', () => {
            cy.get('@input').type('1');
            cy.get('@error').should('not.be.visible');
        });

        it('enter 0 error should be visible', () => {
            cy.get('@input').clear().type('0');
            cy.get('@error').should('be.visible');
        });
    });

    describe('interest rate', () => {

        beforeEach(() => {
            cy.get('#interestRate').as("input");
            cy.get('#interestRate-error-message').as("error");
        });

        it('error should not be visible', () => {
            cy.get('@error').should('not.be.visible');
        });

        it('blur error should be visible', () => {
            cy.get('@input').focus().clear().blur();
            cy.get('@error').should('be.visible');
        });

        it('enter 1 error should not be visible', () => {
            cy.get('@input').type('1');
            cy.get('@error').should('not.be.visible');
        });

        it('enter 0 error should be visible', () => {
            cy.get('@input').clear().type('0');
            cy.get('@error').should('be.visible');
        });
    });

    describe('extra payment', () => {

        beforeEach(() => {
            cy.getDataTestId('extraPayment').as('input');
        });

        it('error should not exist', () => {
            cy.getDataTestId('extra-payment-error').should('not.exist');
        });

        it('blur error should be visible', () => {
            //cy.getDataTestId('extra-payment-type').focus().blur();
            cy.get('@input').focus().blur();
            cy.getDataTestId('extra-payment-error').should('exist');
        });

        it('enter 1 error should not be visible', () => {
            cy.get('@input').type('1');
            cy.getDataTestId('extra-payment-error').should('not.exist');
        });

        it('enter 0 error should be visible', () => {
            cy.get('@input').clear().type('0');
            cy.getDataTestId('extra-payment-error').should('exist');
        });
    });
});