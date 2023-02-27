export interface MinPayCalcFields {
    title: string
    monthlyPercentageRate?: string,
    monthlyInterest?: string,
    financeChargePercent: string,
    financeCharge: string,
    minimumPayment: string
}

export function minimumPaymentCalculationTest(fields: MinPayCalcFields, includeInterest = true) {

    it('minimum-payment-calculation should exist', () => {
        cy.getDataTestId('min-pay-calculation').should('exist');
    });

    if (includeInterest) {

        it('monthly percertage rate should be correct', () => {
            cy.getDataTestId('mpc-monthly-percentage-rate')
                .textShouldEqual(fields.monthlyPercentageRate);
        });

        it('monthly interest should be correct', () => {
            cy.getDataTestId('mpc-monthly-interest')
                .textShouldEqual(fields.monthlyInterest);
        });

    }
    else {
        it('finance charge should NOT exist', () => {
            cy.getDataTestId('mpc-include-interest-true').should('not.exist');
        });

        it('dummmy finance charge row SHOULD exist', () => {
            cy.getDataTestId('mpc-include-interest-false').should('exist');
        });
    }

    it('title with balance should be correct', () => {
        cy.getDataTestId('mpc-title')
            .textShouldEqual(fields.title);
    });

    it('% of balance should be correct', () => {
        cy.getDataTestId('mpc-finance-charge-percent')
            .textShouldEqual(fields.financeChargePercent);
    });

    it('finance charge should be correct', () => {
        cy.getDataTestId('mpc-finance-charge')
            .textShouldEqual(fields.financeCharge);
    });

    it('Mininum Payment should be correct', () => {
        cy.getDataTestId('mpc-minimum-payment')
            .textShouldEqual(fields.minimumPayment);
    });
}