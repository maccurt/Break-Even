import { CreditCardScenario1, IMonthlyPaymentSection } from './credit-card-scenario-1';

function baselineMonthlyPaymentSectionTest(result: IMonthlyPaymentSection) {
    describe('monthly payment section', () => {

        beforeEach(() => {
            cy.getDataTestId('monthly-payment-section').as('section');
        });

        it('minimum payment should equal ' + result.minimumPayment, () => {
            cy.get('@section').getDataTestId('minimum-payment').textShouldEqual(result.minimumPayment);
        });

        it('monthly payment should equal ' + result.monthlyPayment, () => {
            cy.get('@section').getDataTestId('monthly-payment').textShouldEqual(result.monthlyPayment);
        });
    });
}

export function minMonthlyPaySectionTest(result: IMonthlyPaymentSection = new CreditCardScenario1().miniumPayResult.monthlyPaymentSection) {
    describe('minimumMontlypPaySectionTest', () => {

        beforeEach(() => {
            cy.getDataTestId('monthly-payment-section').as('section');
        });

        baselineMonthlyPaymentSectionTest(result);

        it('extra payment should equal ' + result.extraPayment, () => {
            cy.get('@section').getDataTestId('extra-payment').textShouldEqual(result.extraPayment);
        });
    });
}

export function extraMonthlyPaySectionTest(result: IMonthlyPaymentSection = new CreditCardScenario1().extraPayResult.monthlyPaymentSection) {
    describe('Extra Monthly Pay Section Test', () => {
        beforeEach(() => {
            cy.getDataTestId('monthly-payment-section').as('section');
        });
        baselineMonthlyPaymentSectionTest(result);
        it('extra payment should equal ' + result.extraPayment, () => {
            cy.get('@section').getDataTestId('extra-payment').textShouldEqual(result.extraPayment);
        });

    });
}

export function fixedMonthlyPaySectionTest(result: IMonthlyPaymentSection = new CreditCardScenario1().fixedPayResult.monthlyPaymentSection) {
    describe('Fixed Monthly Pay Section Test', () => {
        beforeEach(() => {
            cy.getDataTestId('monthly-payment-section').as('section');
        });
        baselineMonthlyPaymentSectionTest(result);

        it('extra payment  should not exist', () => {
            cy.get('@section').getDataTestId('extra-payment').should('not.exist');
        });

        it('fixed pay' + result.fixedPayment, () => {
            cy.get('@section').getDataTestId('fixed-payment').textShouldEqual(result.fixedPayment);
        });

        // it('fix pay hint should equal', () => {
        //     cy.get('@section').getDataTestId('fix-pay-hint').textShouldEqual('not in monthly payment');
        // });
    });
}