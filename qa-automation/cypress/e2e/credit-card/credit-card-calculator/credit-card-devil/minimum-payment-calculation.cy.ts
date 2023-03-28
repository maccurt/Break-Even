import { minPayType, setMinimumPaymentType } from './set-minimum-payment-type.function';
import { minimumPaymentCalculationTest } from "./minimum-payment-calculation.function";
describe('mininum-payment-calculation', () => {

    before(() => {
        cy.visit('/credit-card-devil');
    });

    describe('baseline', () => {
        it('minimum-payment-calculation should NOT exist', () => {                        
            cy.getDataTestId('min-pay-calculation').should('not.exist');
        });
    });

    describe('20000 balance with defaults', () => {
        before(() => {
            cy.getDataTestId('balance').clear().type('20000').blur();
        });

        minimumPaymentCalculationTest({
            title: 'Minimum Payment Calculation For $20,000.00',
            monthlyPercentageRate: '1.261% Interest For Month',
            monthlyInterest: '252.17',
            financeChargePercent: '1.00% of Balance',
            financeCharge: '200.00',
            minimumPayment: '$452.17'
        });
    });

    describe('change mininum payment calculation to 4% of balance', () => {
        before(() => {
            setMinimumPaymentType(minPayType.FourPercentOfBalance);
        });

        minimumPaymentCalculationTest({
            title: 'Minimum Payment Calculation For $20,000.00',
            financeChargePercent: '4.00% of Balance',
            financeCharge: '800.00',
            minimumPayment: '$800.00'
        }, false);

    });

    describe('change mininum payment calculation to 2.78% of balance', () => {
        before(() => {
            setMinimumPaymentType(minPayType.TwoPoint8PercentOfBalance);
        });

        minimumPaymentCalculationTest({
            title: 'Minimum Payment Calculation For $20,000.00',
            financeChargePercent: '2.08% of Balance',
            financeCharge: '416.00',
            minimumPayment: '$416.00'
        }, false);
    });

    describe('change balance to 10,0000', () => {
        before(() => {
            cy.getDataTestId('balance').clear().type('10000').blur();
        });

        minimumPaymentCalculationTest({
            title: 'Minimum Payment Calculation For $10,000.00',
            financeChargePercent: '2.08% of Balance',
            financeCharge: '208.00',
            minimumPayment: '$208.00'
        }, false);
    });

    describe('interest rate to 10%', () => {
        before(() => {
            cy.getDataTestId('interest-rate').clear().type('10').blur();
        });

        minimumPaymentCalculationTest({
            title: 'Minimum Payment Calculation For $10,000.00',
            financeChargePercent: '2.08% of Balance',
            financeCharge: '208.00',
            minimumPayment: '$208.00'
        }, false);
    });

    describe('changed payment type to ', () => {
        before(() => {
            setMinimumPaymentType(minPayType.InterestPlus1PercentOfBalance);
        });

        minimumPaymentCalculationTest({
            title: 'Minimum Payment Calculation For $10,000.00',
            monthlyPercentageRate: '0.833% Interest For Month',
            monthlyInterest: '83.33',
            financeChargePercent: '1.00% of Balance',
            financeCharge: '100.00',
            minimumPayment: '$183.33'
        }, true);
    });

});