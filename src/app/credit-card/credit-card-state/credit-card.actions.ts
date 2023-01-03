import { createAction, props } from "@ngrx/store";

export enum WizardStep {
    enterBalance
}

const wizardStep = createAction('[credit-card-wizard] step', props<{ step: WizardStep }>);

export const getInterestRate = createAction('[credit-card-wizard] get interest rate');
export const getInterestRateSuccess = createAction('[credit-card-wizard] get interest rate success', props<{ interestRate: number}>());

