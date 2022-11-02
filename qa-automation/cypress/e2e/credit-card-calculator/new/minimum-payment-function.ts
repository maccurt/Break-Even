import { CreditCardScenario1, ICreditCardBase } from "../../helper/credit-card-scenario-1";

export function enterMinimumPaymentForCreditCard() {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.getDataTestId('payment-type').select('Minimum Payment');
        cy.get('#calculate').click();
    });
};

export function enterExtraPaymentForCreditCard(scenario: ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        //cy.get('#payment-type-extra').click();
        cy.getDataTestId('payment-type').select('Minimum Payment + Extra Payment');
        cy.get('#extraPayment').clear().type(scenario.extraPay).blur();
        cy.get('#calculate').click();
    });
};

export function enterFixedPaymentForCreditCard(scenario: ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        //cy.get('#payment-type-fixed').click();
        cy.getDataTestId('payment-type').select('Fixed Payment');
        cy.get('#fixedPayment').clear().type(scenario.fixedPay).blur();
        cy.get('#calculate').click();
    });
};

function enterBaselineCreditCardInfo(scenario: ICreditCardBase = new CreditCardScenario1()) {
    cy.visit('/credit-card');
    cy.get('#balance').type(scenario.balance);
    cy.get('#interestRate').clear().type('15').blur();
}