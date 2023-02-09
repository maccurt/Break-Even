
import { creditCardScheduleFixedPayTest, creditCardScheduleMininumPayTest } from "../../../helper/cc-schedule-test";
import { enterFixedPaymentForCreditCard } from "../new/minimum-payment-function";

describe('credit card schedule minimum pay + extra', () => {

    enterFixedPaymentForCreditCard();
    before(() => {
        //cy.get('div[role=tab]').eq(0).click();        
    });

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });   

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });

    creditCardScheduleFixedPayTest();
    creditCardScheduleMininumPayTest();
});