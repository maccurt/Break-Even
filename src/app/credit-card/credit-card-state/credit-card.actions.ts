import { createAction, props } from "@ngrx/store";

export enum WizardStep {
    enterBalance
}

const wizardStep = createAction('[credit-card-wizard] step', props<{ step: WizardStep }>);