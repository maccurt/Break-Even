import { summaryTest, summaryTest_FixedPayment_Baseline } from "./cc-summary.function";

describe('has intro rate data validation v2', () => {

    before(() => {
        cy.visit('credit-card-devil');
        cy.getDataTestId('balance').clear().type('20000').blur();
    });

    describe.only('has intro rate not checked baseline', () => {

        describe('minimum payment only', () => {
            summaryTest_FixedPayment_Baseline();            
        });
    
        describe('fixed payment', () => {       
            summaryTest_FixedPayment_Baseline();            
        });        
    });   

    describe('has intro rate CHECKED', () => {

        before(() => {
            cy.getDataTestId('has-intro-rate').check();
            cy.getDataTestId('intro-months').clear().type('12').blur();
            cy.getDataTestId('intro-transfer-cost-percent').clear().type('3').blur();
        });
        describe('minimum payment only', () => {
            summaryTest('summary-min-pay',
                {
                    title:'Minimum Payment Only Total',
                    titleIcon:'face-frown',
                    paymentTotal: '$20,600.00 will turn into $43,105.51.',
                    extraPayment: 'You Will Pay An Extra $22,505.51 In Interest.',
                    yearPayOff: 'It Will Take You 34 Years, 0 Months To Pay Off The Credit Card.'
                }
            );
        });
    
        describe('fixed payment', () => {        
            summaryTest('summary-fixed-pay',
                {
                    title:'Fixed Monthly Payment',
                    titleIcon:'face-smile',
                    paymentTotal: '$20,600.00 will turn into $25,279.64.',
                    extraPayment: 'You Will Pay An Extra $4,679.64 In Interest.',
                    yearPayOff: 'It Will Take You 4 Years, 8 Months To Pay Off The Credit Card.'
                }
            );
        });        
    });   

    describe('UNCHECK has intro rate', () => {

        before(() => {
            cy.getDataTestId('has-intro-rate').uncheck();
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

});