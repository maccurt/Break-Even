describe('cc-calculate-monthly-payment.cy.ts', () => {

    describe('$10,000 15% interest rate', () => {

        before(() => {
            cy.visit('/credit-card');
            cy.get('#payment-type-extra').click();
            cy.get('#balance').type('10000');
            cy.get('#interestRate').clear().type('15').blur();
        });

        beforeEach(() => {
            cy.getDataTestId('monthly-payment-section').getDataTestId('monthly-payment').as('monthlyPay');
        });

        it('payment should be $225.00', () => {
            cy.get('@monthlyPay').textShouldEqual('$225.00');
            // cy.get('#payment').invoke('text').then((text) => {
            //     expect(text.trim()).to.eq('$225.00');
            // });
        });

        describe('change balance to $20,000', () => {
            it('payment should be $450.00', () => {
                cy.get('#balance').clear().type('20000').blur();
                cy.get('@monthlyPay').textShouldEqual('$450.00');
            });
        });

        describe('change extra payment to 100', () => {
            it('payment should be $450.00', () => {
                cy.get('#extra-payment').clear().type('100').blur();
                cy.get('@monthlyPay').textShouldEqual('$550.00');
            });
        });

        describe('click fixed payment radio', () => {
            it('payment should be $0.00', () => {
                cy.get("#payment-type-fixed").click();
                cy.get('@monthlyPay').textShouldEqual('$0.00');
            });
        });

        describe('set fixed payment to 500', () => {
            it('payment should be $0.00', () => {
                cy.get("#fixed-payment").type('500').blur();
                cy.get('@monthlyPay').textShouldEqual('$500.00');
            });
        });

        describe('click Minimum Payment + Extra Payment radio', () => {
            it('payment should be $550.00', () => {
                cy.get("#payment-type-extra").click();
                cy.get('@monthlyPay').textShouldEqual('$550.00');
            });
        });

        describe('balance 10,000 interest rate 10%', () => {
            it('payment should be $550.00', () => {
                cy.get("#balance").clear().type('10000').blur();
                cy.get('#interestRate').clear().type('10');
                cy.get('@monthlyPay').textShouldEqual('$325.00');
            });
        });

        describe('$10,000 balance 10 interest rate', () => {
            it('payment should be $366.67', () => {
                cy.get('#interestRate').clear().type('20').blur();
                cy.get('@monthlyPay').textShouldEqual('$366.67');
            });
        });

        describe('set mininimp payment calculation to 2% of balance ', () => {
            it('payment should be $300.00', () => {
                cy.get('#minimum-payment-type').select('2% of balance');
                cy.get('@monthlyPay').textShouldEqual('$300.00');
            });
        });

        describe('set mininimp payment calculation to 2% of balance ', () => {
            it('payment should be $378.00', () => {
                cy.get('#minimum-payment-type').select('2.78% of balance');
                cy.get('@monthlyPay').textShouldEqual('$378.00');
            });
        });

        describe('Set extra payment to 200 ', () => {
            it('payment should be $378.00', () => {
                cy.get('#extra-payment').clear().type('200').blur();
                cy.get('@monthlyPay').textShouldEqual('$478.00');
            });
        });

        describe('Click Minimum Payment Only', () => {

            it('payment should be $278.00', () => {
                cy.get('#payment-type-minimum').click();
                cy.get('@monthlyPay').textShouldEqual('$278.00');
            });
        });
    });
});