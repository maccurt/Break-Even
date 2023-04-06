import { minMonthlyPaySectionTest } from "../../../helper/cc-monthly-payment-test";
import { creditCardScheduleMininumPayTest } from "../../../helper/cc-schedule-test";
import { CreditCardScenario1 } from "../../../helper/credit-card-scenario-1";
import { interestSavedByPayingFixedTest } from "../../../helper/interest-saved-test";
import { timeSavedFixedPay } from "../../../helper/time-saved-test";
import { enterMinimumPaymentForCreditCard } from "../new/minimum-payment-function";

describe('credit card min pay page test', () => {

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });        
    enterMinimumPaymentForCreditCard();    
    creditCardScheduleMininumPayTest();
    minMonthlyPaySectionTest();
    it('minimum payment trap should exist', () => {
        cy.get('@parent').getDataTestId('min-payment-trap').should('exist');
    });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });

    interestSavedByPayingFixedTest('cc-compare-tab',new CreditCardScenario1().miniumPayResult);
    timeSavedFixedPay('cc-compare-tab',new CreditCardScenario1().miniumPayResult);
});