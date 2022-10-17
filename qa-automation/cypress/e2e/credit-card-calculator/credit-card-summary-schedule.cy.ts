describe('credit-card-summary-schedule.cy.ts', () => {

    describe('fill out the form completely and calculate', () => {

        before(() => {
            cy.visit('/credit-card');
            cy.get('#payment-type-extra').click();
            cy.get('#balance').type('1000');
            cy.get('#interestRate').type('15');
            cy.get('#extra-payment').type('100');
            cy.get('#calculate').click();
        });

        it('summary container should exist', () => {
            cy.getDataTestId('summary-container').should('exist');
        });

        it('schedule list container should NOT exist', () => {
            cy.get('#schedule-list-container').should('not.exist');
        });

        describe('Click view full payment schedule', () => {

            before(() => {
                cy.get('#set-show-summary').click();
            });

            it('summary container should NOT exist', () => {
                cy.get('#summary-container').should('not.exist');
            });

            it('schedule list container should exist', () => {
                cy.get('#schedule-list-container').should('exist');
            });
        });

        describe('Click view summmary', () => {

            before(() => {
                cy.get('#set-show-summary').click();
            });

            it('summary container should exist', () => {
                cy.getDataTestId('summary-container').should('exist');
            });

            it('schedule list container should NOT exist', () => {
                cy.get('#schedule-list-container').should('not.exist');
            });
        });

        describe('Click view full payment schedule then click calculate', () => {

            before(() => {
                cy.get('#set-show-summary').click();
                cy.get('#calculate').click();
            });

            it('summary container should exist', () => {
                cy.getDataTestId('summary-container').should('exist');
            });

            it('schedule list container should NOT exist', () => {
                cy.get('#schedule-list-container').should('not.exist');
            });
        });
    });
});