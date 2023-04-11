export class SummaryTestInput {
    title: string;
    titleIcon: string;
    paymentTotal: string;
    extraPayment: string;
    yearPayOff: string;
}

export const summaryTest = (parentId: string, input: SummaryTestInput) => {

    beforeEach(() => {
        cy.getDataTestId(parentId)
            .getDataTestId('cc-wizard-summary').as('summary');
    });

    it('the summary min pay should exsist', () => {
        cy.get('@summary').should('exist');
    });

    it('the title should be correct', () => {
        cy.get('@summary').getDataTestId('title').textShouldEqual(input.title);
    });
    it(`the data-icon on the tile should equal ${input.titleIcon}`, () => {
        //cy.get('@summary').find(`[data-icon=${input.titleIcon}]`).should('exist');
        cy.get('@summary').find('svg').invoke('attr', 'data-icon').should('equal', input.titleIcon);
    });

    it('payment-total sentence should be correct', () => {
        cy.get('@summary')
            .getDataTestId('payment-total')
            .textShouldEqual(input.paymentTotal);
    });

    it('extra-pay sentence should be correct', () => {
        cy.get('@summary')
            .getDataTestId('extra-pay')
            .textShouldEqual(input.extraPayment);
    });

    it('year-pay-off sentence should be correct', () => {
        cy.get('@summary')
            .getDataTestId('year-pay-off')
            .textShouldEqual(input.yearPayOff);
    });
};

export const summaryTest_MinimumPayment_Baseline = () => {

    summaryTest('summary-min-pay',
        {
            title: 'Minimum Payment Only Total',
            titleIcon: 'face-frown',
            paymentTotal: '$20,000.00 will turn into $44,700.61.',
            extraPayment: 'You Will Pay An Extra $24,700.61 In Interest.',
            yearPayOff: 'It Will Take You 33 Years, 9 Months To Pay Off The Credit Card.'
        }
    );

};

export const summaryTest_FixedPayment_Baseline = () => {

    summaryTest('summary-fixed-pay',
    {
        title:'Fixed Monthly Payment',
        titleIcon:'face-smile',
        paymentTotal: '$20,000.00 will turn into $29,440.57.',
        extraPayment: 'You Will Pay An Extra $9,440.57 In Interest.',
        yearPayOff: 'It Will Take You 5 Years, 6 Months To Pay Off The Credit Card.'
    }
);
};
