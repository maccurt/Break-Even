import { PaymentTypeForTest, setPaymentType } from "./new/minimum-payment-function";

describe('cc-payment-input-visibility.cy.ts', () => {

    before(() => {
        cy.visit('/credit-card');
    });

    describe('extra payment clicked', () => {
        it('extra enabled, fix payment not enabled ', () => {
            setPaymentType(PaymentTypeForTest.extra);
            cy.get('#fixedPayment').should('not.be.enabled');
            cy.get('#extraPayment').should('be.enabled');
        });
    });

    describe('click Fixed Payment', () => {
        it('extra not enabled, fix payment enabled ', () => {
            setPaymentType(PaymentTypeForTest.fixed);
            cy.get('#fixedPayment').should('be.enabled');
            cy.get('#extraPayment').should('not.be.enabled');
        });
    });

    describe('click Minium Payment Only', () => {
        it('extra not enabled, fix payment not enabled ', () => {
            setPaymentType(PaymentTypeForTest.minimum);
            cy.get('#fixedPayment').should('not.be.enabled');
            cy.get('#extraPayment').should('not.be.enabled');
        });
    });  

});