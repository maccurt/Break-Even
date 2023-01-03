import { creditCardFeatureKey, CreditCardState } from './credit-card.reducers';
import { createSelector,createFeatureSelector } from "@ngrx/store";

export const selectCreditCardState = createFeatureSelector<CreditCardState>(creditCardFeatureKey);

export const selectInterestRate = createSelector(
    selectCreditCardState,
    (state: CreditCardState) => state.interestRate
);