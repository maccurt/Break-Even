import { minimuPayScheduleTest } from "../../helper/cc-minimuPayScheduleTest";
import { creditCardScheduleExtraPay, creditCardScheduleFixedPay, creditCardScheduleMininumPay } from "../../helper/cc-schedule-test";
import { enterExtraPaymentForCreditCard as enterExtraPaymentForCreditCard, enterFixedPaymentForCreditCard } from "../new/minimum-payment-function";

describe('credit card fixed pay page test', () => {

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });
    enterFixedPaymentForCreditCard();
    creditCardScheduleFixedPay();
    creditCardScheduleMininumPay();

    it('minimum payment trap should NOT exist', () => {
        cy.get('@parent').getDataTestId('min-payment-trap').should('not.exist');
    });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });
});