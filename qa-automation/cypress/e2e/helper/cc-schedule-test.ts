export function creditCardScheduleMinPayBase() {
    creditCardScheduleTest('min-pay-schedule', '10,000.00', '11,979.18', '$21,979.18');
}

export function creditCardScheduleMinExtraPayBase() {
    creditCardScheduleTest('min-pay-extra-schedule', '10,000.00', '3,878.30', '$13,878.30');
}

export function creditCardScheduleFixedPayBase() {
    creditCardScheduleTest('fixed-pay-schedule', '10,000.00', '1,579.48', '$11,579.48');
}

export function creditCardScheduleTest(parentId: string, principal: string, interest: string, total: string) {

    describe('creditCardScheduleTest: ' + parentId, () => {

        beforeEach(() => {
            cy.getDataTestId(parentId).getDataTestId('credit-card-table').as('table');
        });

        it('principal should equal ' + principal, () => {
            cy.get('@table').getDataTestId('principal').textShouldEqual(principal);
        });

        it('interest should equal ' + interest, () => {
            cy.get('@table').getDataTestId('interest').textShouldEqual(interest);
        });

        it('total should equal ' + total, () => {
            cy.get('@table').getDataTestId('total').textShouldEqual(total);
        });
    });
}