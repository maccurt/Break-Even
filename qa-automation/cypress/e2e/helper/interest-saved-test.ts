import { ICreditCardResult, CreditCardScenario1 } from './credit-card-scenario-1';
import { statSectionTest } from "./section-test-helpers";

export function interestSavedByPayingFixedTest(parentId: string, result: ICreditCardResult = new CreditCardScenario1().fixedPayResult) {

    describe('Interest Saved By Making Fixed Payment', () => {

        statSectionTest(parentId, 'interest-saved-by-paying-fixed',
            'Interest Saved By Making Fixed Payment',
            result.interestSaved,
            result.interestSavedFormula,
            result.interestSavedPercent
        );
    });
}

export function InterestSavedByPayingExtraTest(parentId: string, result: ICreditCardResult = new CreditCardScenario1().extraPayResult) {

    describe('Interest Saved By Paying Extra', () => {
        statSectionTest(parentId, 'interest-saved-by-paying-extra',
            'Interest Saved By Paying Extra',
            result.interestSaved,
            result.interestSavedFormula,
            result.interestSavedPercent
        );
    });
}