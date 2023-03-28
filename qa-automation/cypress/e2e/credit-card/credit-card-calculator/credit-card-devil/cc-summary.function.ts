export class SummaryTestInput {
    title:string;
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