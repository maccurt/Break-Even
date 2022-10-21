import { statSectionTest } from "../../helper/section-test-helpers";
import { fixPayment } from "./minimum-payment-function";
describe('credit card minimum payment extra payment happy path', () => {

    fixPayment();

    beforeEach(() => {
        cy.getDataTestId('fix-pay-mode').as('mode');
    });
    
    it('total principal and interest section should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest-fixed-payment').should('exist');
    });

    statSectionTest('total-principal-interest-fixed-payment',
        'Total Principal & Interest With Fixed Payment',
        '$11,579.48',
        '10,000.00 balance + 1,579.48 interest'
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
        cy.get('@mode').getDataTestId('interest-saved-by-paying-fixed').should('exist');
    });
    
    statSectionTest('interest-saved-by-paying-fixed',
        'Interest Saved By Making Fixed Payment',
        '$10,399.70',
        '$21,979.18 - $11,579.48',
        'You Will Save 86.81% In Interest.'
    );
});