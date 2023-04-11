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
        // summaryTest('summary-fixed-pay',
        //     {
        //         title:'Fixed Monthly Payment',
        //         titleIcon:'face-smile',
        //         paymentTotal: '$20,000.00 will turn into $29,440.57.',
        //         extraPayment: 'You Will Pay An Extra $9,440.57 In Interest.',
        //         yearPayOff: 'It Will Take You 5 Years, 6 Months To Pay Off The Credit Card.'
        //     }
        // );
    });
});