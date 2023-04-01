export class ScheduleTestInput {
    period?:string;
    interest?: string;
    principal?: string;
    payment?: string;
    balance?: string;
}
export const creditCardScheduleItemTest = (parentDataTestId: string, input: ScheduleTestInput) => {

    describe(`schedule period ${input.period}`, () => {

        beforeEach(() => {
            //cy.getDataTestId('fixed-pay-schedule-list').as('scheduleList');
            cy.getDataTestId(parentDataTestId).as('scheduleList');
            cy.get('@scheduleList').getDataTestId(`schedule-${input.period}`).as('s1');
        });

        it('the period should equal ' + input.period, () => {
            cy.get('@s1').getDataTestId('interest').textShouldEqual(input.interest);
        });

        it('interest should equal ' + input.interest, () => {
            cy.get('@s1').getDataTestId('interest').textShouldEqual(input.interest);
        });

        it('princial should equal ' + input.principal, () => {
            cy.get('@s1').getDataTestId('principal').textShouldEqual(input.principal);
        });

        it('payment should equal ' + input.payment, () => {
            cy.get('@s1').getDataTestId('payment').textShouldEqual(input.payment);
        });

        it('balance should equal ' + input.balance, () => {
            cy.get('@s1').getDataTestId('balance').textShouldEqual(input.balance);
        });
    });
};
