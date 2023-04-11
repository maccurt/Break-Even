import { hasIntroRateInputs, hasNoIntroRateInputs } from "./cc-intro-rate-input-test.function";

describe('has intro rate', () => {

    before(() => {
        cy.visit('/credit-card-devil');
    });

    describe('baseline', () => {
      hasNoIntroRateInputs();
    });

    describe('enter 20,000 balance', () => {

        before(() => {
            cy.getDataTestId('balance').type('20000').blur();
        });

        hasNoIntroRateInputs();
    });

    describe('check has has-intro-rate', () => {
        before(() => {
            cy.getDataTestId('has-intro-rate').check();
        });

        hasIntroRateInputs();
    });

    describe('UN-CHECK has has-intro-rate', () => {
        before(() => {
            cy.getDataTestId('has-intro-rate').uncheck();
        });

        hasNoIntroRateInputs();
    });
});