import { minPayType, setMinimumPaymentType } from "./credit-card-devil/set-minimum-payment-type.function";
import { enterMinimumPaymentForCreditCard } from "./new/minimum-payment-function";

describe('cc-calculate-minimum-payment.cy.ts', () => {

    describe('$10,000 15% Interest + 1% of balance', () => {

        enterMinimumPaymentForCreditCard();

        it('Minimum Payment should be $225.00', () => {
            cy.get('#minimum-payment').invoke('text').then((text) => {
                expect(text.trim()).to.eq('$225.00');
            });
        });

        describe('change balance to 20000 and tab/blur off', () => {

            it('Minimum Payment should be $450.00', () => {
                cy.get('#balance').clear().type('20000').blur();
                cy.get('#minimum-payment').invoke('text').then((text) => {
                    expect(text.trim()).to.eq('$450.00');
                });
            });
        });

        describe('change interest rate to 10% and tab/blur off', () => {

            it('Minimum Payment should be $366.67', () => {
                cy.get('#interestRate').clear().type('10').blur();
                cy.get('#minimum-payment').invoke('text').then((text) => {
                    expect(text.trim()).to.eq('$366.67');
                });
            });
        });

        describe('change balance to $10,000 and change minimum payment type ', () => {

            before(() => {
                cy.get('#balance').clear().type('10000').blur();
            });

            it('2% of balance should be $200.00', () => {
                setMinimumPaymentType(minPayType.TwoPercentOfBalance);                
                cy.get('#minimum-payment').invoke('text').then((text) => {
                    expect(text.trim()).to.eq('$200.00');
                });
            });

            it('2.78% of balance should be $278.00', () => {
                setMinimumPaymentType(minPayType.TwoPoint78PercentOfBalance);                                
                cy.get('#minimum-payment').invoke('text').then((text) => {
                    expect(text.trim()).to.eq('$278.00');
                });
            });
        });
    });
});