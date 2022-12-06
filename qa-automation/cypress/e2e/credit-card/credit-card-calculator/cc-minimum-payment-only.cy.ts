// describe('cc-minimum-payment-only.cy.ts', () => {
//     before(() => {
//         cy.visit('/credit-card');
//         cy.get('#balance').type('10000');
//         cy.get('#interestRate').type('15');
//         cy.get('#payment-type-minimum').click();
//         cy.get('#calculate').click();
//     });

//     it('should behave correctly', () => {
//         cy.get('#minimup-payment-card').should('exist');
//         cy.get('#total-interest-card card').should('not.exist');
//     });
// });