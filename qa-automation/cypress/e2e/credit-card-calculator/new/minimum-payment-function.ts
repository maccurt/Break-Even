import { CreditCardScenario1, ICreditCardBase } from "../../helper/credit-card-scenario-1";

export enum PaymentTypeForTest {
    minimum = 'mininum-payment-type',
    extra = 'extra-payment-type',
    fixed = 'fixed-payment-type'
}

export function setPaymentType(paymentType:PaymentTypeForTest) {
    cy.getDataTestId(paymentType.toString()).click();
}

export function enterMinimumPaymentForCreditCard(scenario: ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.getDataTestId('mininum-payment-type').click();
        //cy.getDataTestId('payment-type').select('Minimum Payment');
        cy.get('#calculate').click();
    });
};

export function enterExtraPaymentForCreditCard(scenario: ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.getDataTestId('extra-payment-type').click();
        //cy.getDataTestId('payment-type').select('Minimum Payment + Extra Payment');
        cy.get('#extraPayment').clear().type(scenario.extraPay).blur();
        cy.get('#calculate').click();
    });
};

export function enterFixedPaymentForCreditCard(scenario: ICreditCardBase = new CreditCardScenario1()) {
    before(() => {
        enterBaselineCreditCardInfo();
        cy.getDataTestId('fixed-payment-type').click();
        //cy.getDataTestId('payment-type').select('Fixed Payment');
        cy.get('#fixedPayment').clear().type(scenario.fixedPay).blur();
        cy.get('#calculate').click();
    });
};

function enterBaselineCreditCardInfo(scenario: ICreditCardBase = new CreditCardScenario1()) {
    cy.visit('/credit-card');
    cy.get('#balance').type(scenario.balance);
    cy.get('#interestRate').clear().type('15').blur();
}