import { ICreditCardResult, Scenario1 } from './input-output-constant';
export function creditCardScheduleMinPayBase(result: ICreditCardResult = new Scenario1().miniumPayResult) {
    creditCardScheduleTest('min-pay-schedule', result);
}

export function creditCardScheduleMinExtraPayBase(result: ICreditCardResult = new Scenario1().extraPayResult) {
    creditCardScheduleTest('min-pay-extra-schedule', result);
}

export function creditCardScheduleFixedPayBase(result: ICreditCardResult = new Scenario1().fixedPayResult) {
    creditCardScheduleTest('fixed-pay-schedule', result);
}

export function creditCardScheduleTest(parentId: string, result: ICreditCardResult) {

    describe('creditCardScheduleTest: ' + parentId, () => {

        beforeEach(() => {
            cy.getDataTestId(parentId).getDataTestId('credit-card-table').as('table');
        });

        it('title should be', () => {

        });

        it('principal should equal ' + result.principal, () => {
            cy.get('@table').getDataTestId('principal').textShouldEqual(result.principal);
        });

        it('interest should equal ' + result.interest, () => {
            cy.get('@table').getDataTestId('interest').textShouldEqual(result.interest);
        });

        it('total should equal ' + result.total, () => {
            cy.get('@table').getDataTestId('total').textShouldEqual('$'+result.total);
        });
    });
}