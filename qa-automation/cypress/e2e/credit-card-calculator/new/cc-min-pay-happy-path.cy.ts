import { minimumPayment } from "./minimum-payment-function";

describe('minimum payment happy path', () => {

    minimumPayment();

    beforeEach(() => {
        cy.getDataTestId('minimum-payment-mode').as('mode');
    });

    it('minimum payment mode should exist', () => {
        cy.get('@mode').should('exist');
    });

    it('total principal and interest should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest').should('exist');
    });

    it('minimum payment interest should exist', () => {
        cy.get('@mode').getDataTestId('minimum-payment-interest').should('exist');
    });
});