import { creditCardScheduleItemTest } from "./credit-card-schedule-item-test.function";

describe('intro rate data validation', () => {

    before(() => {
        cy.visit('credit-card-devil');
    });

    describe('1000 balance, 15%, 100 fixed payment, intro rate 3%, transfer fee 3%', () => {

        before(() => {
            cy.getDataTestId('balance').clear().type('1000').blur();
            cy.getDataTestId('interest-rate').clear().type('15').blur();
            cy.getDataTestId('intro-interest-rate').clear().type('3').blur();
            cy.getDataTestId('intro-months').clear().type('6').blur();
            cy.getDataTestId('intro-transfer-cost-percent').clear().type('3').blur();
            cy.getDataTestId('fixed-payment').clear().type('100').blur();            
            cy.get('div[role=tab]').eq(3).click();
        });

        creditCardScheduleItemTest('fixed-pay-schedule-list', {
            period:'1',
            interest: '2.50',
            balance: '902.50',
            principal: '97.50',
            payment: '100.00',
        });        

        creditCardScheduleItemTest('fixed-pay-schedule-list', {
            period:'11',
            interest: '2.50',
            balance: '902.50',
            principal: '97.50',
            payment: '100.00',
        });        


        // summaryTest('summary-min-pay',
        //     {
        //         title:'Minimum Payment Only Total',
        //         titleIcon:'face-frown',
        //         paymentTotal: '$20,000.00 will turn into $44,693.16.',
        //         extraPayment: 'You Will Pay An Extra $24,693.16 In Interest.',
        //         yearPayOff: 'It Will Take You 33 Years, 8 Months To Pay Off The Credit Card.'
        //     }
        // );
    });
});