import { minimuPayScheduleTest } from "../../helper/cc-minimuPayScheduleTest";
import { enterMinimumPaymentForCreditCard } from "../new/minimum-payment-function";

describe('credit card min pay page test', () => {

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });        
    enterMinimumPaymentForCreditCard();
    minimuPayScheduleTest();
    it('minimum payment trap should exist', () => {
        cy.get('@parent').getDataTestId('min-payment-trap').should('exist');
    });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });

});