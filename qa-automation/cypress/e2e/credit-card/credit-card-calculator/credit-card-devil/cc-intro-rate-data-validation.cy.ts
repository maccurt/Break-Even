import { creditCardScheduleItemTest } from "./credit-card-schedule-item-test.function";

describe('intro rate data validation', () => {

    before(() => {
        cy.visit('credit-card-devil');
    });
    
    describe('1000 balance, 15%, 100 fixed payment, intro rate 3%, transfer fee 3%', () => {
    //https://docs.google.com/spreadsheets/d/1S5a72NtOl2jxLVFZ_u_6v0TANPPqAH4EhCC7-Ic0mow/edit#gid=1206324584

        before(() => {
            cy.getDataTestId('balance').clear().type('1000').blur();
            cy.getDataTestId('interest-rate').clear().type('15').blur();
            cy.getDataTestId('has-intro-rate').check();
            cy.getDataTestId('intro-interest-rate').clear().type('3').blur();
            cy.getDataTestId('intro-months').clear().type('6').blur();
            cy.getDataTestId('intro-transfer-cost-percent').clear().type('3').blur();
            cy.getDataTestId('fixed-payment').clear().type('100').blur();            
            cy.get('div[role=tab]').eq(3).click();
        });

        creditCardScheduleItemTest('fixed-pay-schedule-list', {
            period:'1',
            interest: '2.58',
            balance: '932.58',
            principal: '97.42',
            payment: '100.00',
        });        
 
        creditCardScheduleItemTest('fixed-pay-schedule-list', {
            period:'11',
            interest: '0.71',
            balance: '0.00',
            principal: '56.74',
            payment: '57.45',
        });           
    });
});