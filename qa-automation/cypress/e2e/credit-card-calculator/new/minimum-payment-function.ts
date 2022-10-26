import { CreditCardScenario1, ICreditCardBase } from "../../helper/credit-card-scenario-1";

export function enterMinimumPaymentForCreditCard() {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#calculate').click();
    });
};

export function enterExtraPaymentForCreditCard(scenario:ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#payment-type-extra').click();
        cy.get('#extra-payment').clear().type(scenario.extraPay).blur();
        cy.get('#calculate').click();
    });
};

export function enterFixedPaymentForCreditCard(scenario:ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.get('#payment-type-fixed').click();
        cy.get('#fixed-payment').clear().type(scenario.fixedPay).blur();
        cy.get('#calculate').click();
    });
};

function enterBaselineCreditCardInfo(scenario:ICreditCardBase = new CreditCardScenario1()) {
    
    cy.visit('/credit-card');
    cy.get('#balance').type(scenario.balance);
    cy.get('#interestRate').type('15').blur();
}