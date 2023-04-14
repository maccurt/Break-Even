import { summaryTest, summaryTest_FixedPayment_Baseline, summaryTest_MinimumPayment_Baseline } from "./cc-summary.function";

describe('cc-summary.cy.ts', () => {

    before(() => {
        cy.visit('/credit-card-devil');
        cy.getDataTestId('balance').clear().type('20000').blur();
    });

    describe('minimum payment only', () => {
        summaryTest_MinimumPayment_Baseline();        
    });

    describe('fixed payment', () => {         
        summaryTest_FixedPayment_Baseline();        
    });
});