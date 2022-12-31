describe('credit-card-validation.cy.ts', () => {

    before(() => {        
        cy.visit('/credit-card');
        cy.get('#payment-type-extra').click();
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

    describe('extra payment', () => {

        beforeEach(() => {
            cy.get('#extra-payment').as("input");
            cy.get('#extra-payment-error').as("error");
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
});