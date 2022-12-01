import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer } from "@ngrx/store";

export const creditCardFeatureKey = 'creditCard';
export class CreditCardInput {
    id!: string;
}
export interface CreditCardState extends EntityState<CreditCardInput> {
}

export const creditCardAdapter = createEntityAdapter<CreditCardInput>({
});

export const creditCardInitialState = creditCardAdapter.getInitialState({
});

export const creditCardReducer = createReducer<CreditCardState>(
    creditCardInitialState
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = creditCardAdapter.getSelectors();