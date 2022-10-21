export function minimumPayment() {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#calculate').click();
    });
};

export function minimumPaymentPlusExtra() {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#payment-type-extra').click();
        cy.get('#extra-payment').clear().type('100').blur();
        cy.get('#calculate').click();
    });
};

export function fixPayment() {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#payment-type-fixed').click();
        cy.get('#fixed-payment').clear().type('500').blur();
        cy.get('#calculate').click();
    });
};

function enterBaselineCreditCardInfo() {
    cy.visit('/credit-card');
    cy.get('#balance').type('10000');
    cy.get('#interestRate').type('15').blur();
}