import { creditCardScheduleFixedPayTest, creditCardScheduleMininumPayTest } from "../../helper/cc-schedule-test";
import { InterestSavedByPayingFixedTest } from "../../helper/interest-saved-test";
import { enterFixedPaymentForCreditCard } from "../new/minimum-payment-function";

describe('credit card fixed pay page test', () => {

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });
    enterFixedPaymentForCreditCard();
    creditCardScheduleFixedPayTest();
    creditCardScheduleMininumPayTest();

    it('minimum payment trap should NOT exist', () => {
        cy.get('@parent').getDataTestId('min-payment-trap').should('not.exist');
    });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });

    InterestSavedByPayingFixedTest('cc-compare-tab');
});