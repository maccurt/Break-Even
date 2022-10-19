import { minimumPaymentPlusExtra } from "./minimum-payment-function";
describe('Name of the group', () => {

    minimumPaymentPlusExtra();

    beforeEach(() => {
        cy.getDataTestId('min-pay-plus-exta-pay-mode').as('mode');
    });

    it('minimum payment mode should not exist', () => {
        cy.getDataTestId('minimum-payment-mode').should('not.exist');
    });

    it('total principal and interest section should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest').should('exist');
    });


    it('total principal and interest minimum payement section should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest-min-payment').should('exist');
    });


    it('interest saved by paying extra should exist', () => {
        cy.get('@mode').getDataTestId('interest-saved-by-paying-extra').should('exist');
    });

});