import { statSectionTest } from "../../helper/section-test-helpers";
import { minimumPaymentPlusExtra } from "./minimum-payment-function";
describe('credit card minimum payment extra payment happy path', () => {

    minimumPaymentPlusExtra();

    beforeEach(() => {
        cy.getDataTestId('min-pay-plus-exta-pay-mode').as('mode');
    });

    it('minimum payment mode should not exist', () => {
        cy.getDataTestId('minimum-payment-mode').should('not.exist');
    });

    it('total principal and interest section should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest-by-paying-extra').should('exist');
    });

    statSectionTest('total-principal-interest-by-paying-extra',
        'Total Principal & Interest By Paying Extra',
        '$13,878.30',
        '10,000.00 balance + 3,878.30 interest'
    );

    it('total principal and interest minimum payement section should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest-min-payment').should('exist');
    });
    
    statSectionTest('total-principal-interest-min-payment',
        'Total Principal & Interest Minium Payment Only',
        '$21,979.18',
        '10,000.00 balance + 11,979.18 interest'        
    );

    it('interest saved by paying extra should exist', () => {
        cy.get('@mode').getDataTestId('interest-saved-by-paying-extra').should('exist');
    });
    
    statSectionTest('interest-saved-by-paying-extra',
        'Interest Saved By Paying Extra',
        '$8,100.88',
        '$21,979.18 - $13,878.30',
        'You Will Save 67.62% In Interest.'
    );
});