import { creditCardScheduleMinExtraPayBase, creditCardScheduleMinPayBase } from "../../helper/cc-schedule-test";
import { minimumPayment, minimumPaymentPlusExtra } from "../new/minimum-payment-function";

describe('credit card schedule minimum pay + extra', () => {

    minimumPaymentPlusExtra();
    before(() => {
        cy.get('div[role=tab]').eq(0).click();        
    });

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });

    // it('minimum payment trap should exist', () => {
    //     cy.get('@parent').getDataTestId('min-payment-trap').should('exist');
    // });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });
    
    creditCardScheduleMinExtraPayBase();
    creditCardScheduleMinPayBase();
});