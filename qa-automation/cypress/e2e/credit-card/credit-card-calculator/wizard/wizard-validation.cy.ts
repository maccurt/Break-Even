import { checkValidation } from "./check-validation.function";

describe('credit card devil', () => {

    before(() => {
        cy.visit('/credit-card-devil');
    });

    describe('balance is blank tab/blur off', () => {
        checkValidation('balance');
    });

    describe('enter balance and test interes rate', () => {
        before(() => {
            cy.getDataTestId('balance').clear().type('20000');
            cy.getDataTestId('calculate').click();
        });
        checkValidation('interest-rate');
    });

});