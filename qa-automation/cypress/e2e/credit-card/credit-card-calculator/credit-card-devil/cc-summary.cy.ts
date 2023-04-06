import { summaryTest } from "./cc-summary.function";

describe('cc-summary.cy.ts', () => {

    before(() => {
        cy.visit('/credit-card-devil');
        cy.getDataTestId('balance').clear().type('20000').blur();
    });

    describe('minimum payment only', () => {
        summaryTest('summary-min-pay',
            {
                title:'Minimum Payment Only Total',
                titleIcon:'face-frown',
                paymentTotal: '$20,000.00 will turn into $44,700.61.',
                extraPayment: 'You Will Pay An Extra $24,700.61 In Interest.',
                yearPayOff: 'It Will Take You 33 Years, 9 Months To Pay Off The Credit Card.'
            }
        );
    });

    describe('fixed payment', () => {        
        summaryTest('summary-fixed-pay',
            {
                title:'Fixed Monthly Payment',
                titleIcon:'face-smile',
                paymentTotal: '$20,000.00 will turn into $29,440.57.',
                extraPayment: 'You Will Pay An Extra $9,440.57 In Interest.',
                yearPayOff: 'It Will Take You 5 Years, 6 Months To Pay Off The Credit Card.'
            }
        );
    });
});