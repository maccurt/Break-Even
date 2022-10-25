import { ICreditCardResult } from './input-output-constant';
import { appInfoTest, statSectionTest } from './section-test-helpers';

export function timeToPayOffDebtTest(parentId: string, result: ICreditCardResult) {
    appInfoTest(parentId, 'time-to-pay-debt-section', 'Time To Pay Off Debt', result.timeToPayOfDebt);
}