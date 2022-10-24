import { minimumPayment } from "./minimum-payment-function";

describe('credit card min pay compare tab', () => {

    minimumPayment();
    before(() => {
        //TODO fix this or figure it out
        //https://stackoverflow.com/questions/62775815/changing-tabs-in-angular-material-using-cypress
        cy.get('div[role=tab]').eq(0).click();

    });

    it('should behave...', () => {
        cy.getDataTestId('min-payment-trap').should('exist');
    });    
});