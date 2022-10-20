describe('cc-payment-input-visibility.cy.ts', () => {

    before(() => {
        cy.visit('/credit-card');
        cy.get('#payment-type-extra').click();
    });

    describe('Default baseline', () => {
        it('payment input container should be visible', () => {
            cy.get('#fixed-payment').should('not.exist');
            cy.get('#extra-payment').should('be.enabled');
            cy.get("#payment-input-container").should('be.visible');
        });
    });

    describe('click Fixed Payment', () => {
        it('payment input container should be visible', () => {
            cy.get('#payment-type-fixed').click();
            cy.get('#fixed-payment').should('exist');
            cy.get('#extra-payment').should('not.exist');
            cy.get("#payment-input-container").should('be.visible');
        });
    });

    describe('click Minium Payment Only', () => {

        it('payment input container should NOT be visible', () => {
            cy.get('#payment-type-minimum').click();
            cy.get("#payment-input-container").should('not.be.visible');
        });
    });

    describe('click Fixed payment', () => {
        it('payment input container should be visible', () => {
            cy.get('#payment-type-fixed').click();
            cy.get("#payment-input-container").should('be.visible');
        });
    });

    describe('click Minium Payment Only', () => {

        it('payment input container should NOT be visible', () => {
            cy.get('#payment-type-minimum').click();
            cy.get("#payment-input-container").should('not.be.visible');
        });
    });

    describe('click Minimum Payment + Extra', () => {
        it('payment input container should be visible', () => {
            cy.get('#payment-type-extra').click();
            cy.get("#payment-input-container").should('be.visible');
        });
    });

});