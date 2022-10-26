import { ICreditCardResult, Scenario1 } from './input-output-constant';
import { statSectionTest } from "./section-test-helpers";

export function InterestSavedByPayingFixedTest(parentId: string, result: ICreditCardResult = new Scenario1().fixedPayResult) {

    describe('Interest Saved By Making Fixed Payment', () => {

        statSectionTest(parentId, 'interest-saved-by-paying-fixed',
            'Interest Saved By Making Fixed Payment',
            result.interestSaved,
            result.interestSavedFormula,
            result.interestSavedPercent
        );
    });
}

export function InterestSavedByPayingExtraTest(parentId: string, result: ICreditCardResult = new Scenario1().extraPayResult) {

    describe('Interest Saved By Paying Extra', () => {

        statSectionTest(parentId, 'interest-saved-by-paying-extra',
            'Interest Saved By Paying Extra',
            result.interestSaved,
            result.interestSavedFormula,
            result.interestSavedPercent
        );
    });
}