import { creditCardScheduleMinPayBase } from "../../helper/cc-schedule-test";
import { minimumPayment } from "../new/minimum-payment-function";

describe('credit card schedule minimum pay', () => {

    minimumPayment();
    before(() => {
        cy.get('div[role=tab]').eq(0).click();
        //TODO fix this or figure it out
        //https://stackoverflow.com/questions/62775815/changing-tabs-in-angular-material-using-cypress
    });

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });

    it('minimum payment trap should exist', () => {
        cy.get('@parent').getDataTestId('min-payment-trap').should('exist');
    });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });

    creditCardScheduleMinPayBase();
});