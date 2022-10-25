import { ICreditCardResult, Scenario1 } from './input-output-constant';
import { timeToPayOffDebtTest } from './time-to-pay-off-debt-test';
export function creditCardScheduleMininumPay(result: ICreditCardResult = new Scenario1().miniumPayResult) {
    creditCardScheduleTest('min-pay-schedule', result);
}

export function creditCardScheduleExtraPay(result: ICreditCardResult = new Scenario1().extraPayResult) {
    creditCardScheduleTest('extra-pay-schedule', result);
}

export function creditCardScheduleFixedPay(result: ICreditCardResult = new Scenario1().fixedPayResult) {
    creditCardScheduleTest('fixed-pay-schedule', result);
}

export function creditCardScheduleTest(parentId: string, result: ICreditCardResult) {

    describe('creditCardScheduleTest: ' + parentId, () => {

        beforeEach(() => {
            cy.getDataTestId(parentId).getDataTestId('credit-card-table').as('table');
        });

        it('title should be ' + result.title, () => {
            cy.getDataTestId(parentId).getDataTestId('schedule-title').textShouldEqual(result.title);
        });

        it('principal should equal ' + result.principal, () => {
            cy.get('@table').getDataTestId('principal').textShouldEqual(result.principal);
        });

        it('interest should equal ' + result.interest, () => {
            cy.get('@table').getDataTestId('interest').textShouldEqual(result.interest);
        });

        it('total should equal ' + result.total, () => {
            cy.get('@table').getDataTestId('total').textShouldEqual('$' + result.total);
        });

        timeToPayOffDebtTest(parentId, result);
    });
}