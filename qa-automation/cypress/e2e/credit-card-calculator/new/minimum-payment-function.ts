import { Scenario1, ICreditCardBase } from "../../helper/input-output-constant";

export function minimumPayment() {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#calculate').click();
    });
};

export function minimumPaymentPlusExtra(scenario:ICreditCardBase = new Scenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#payment-type-extra').click();
        cy.get('#extra-payment').clear().type(scenario.extraPay).blur();
        cy.get('#calculate').click();
    });
};

export function fixPayment(scenario:ICreditCardBase = new Scenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#payment-type-fixed').click();
        cy.get('#fixed-payment').clear().type(scenario.fixedPay).blur();
        cy.get('#calculate').click();
    });
};

function enterBaselineCreditCardInfo(scenario:ICreditCardBase = new Scenario1()) {
    
    cy.visit('/credit-card');
    cy.get('#balance').type(scenario.balance);
    cy.get('#interestRate').type('15').blur();
}