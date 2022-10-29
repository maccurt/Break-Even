import { ICreditCardResult, CreditCardScenario1 } from './credit-card-scenario-1';
import { appInfoTest } from './section-test-helpers';

export function timeSavedExtraPayment(parentId: string, result: ICreditCardResult = new CreditCardScenario1().extraPayResult) {
    describe('Time saved by paying extra payment', () => {
        appInfoTest(parentId, 'time-saved-extra-payment',
            'Time Saved By Paying Extra',
            result.timeSaved
        );
    });
}

export function timeSavedFixedPay(parentId: string, result: ICreditCardResult = new CreditCardScenario1().fixedPayResult) {
    describe('Time saved by paying fixed payment section', () => {
        appInfoTest(parentId, 'time-saved-fixed-payment',
            'Time Saved By Making Fixed Payment',
            result.timeSaved,
        );
    });
}