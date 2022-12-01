import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer } from "@ngrx/store";

export const creditCardFeatureKey = 'creditCard';
export class CreditCardInput {
    id!: number;
    interesRate!: number;
};

export interface CreditCardState extends EntityState<CreditCardInput> {
    creditCardInput: CreditCardInput
};

export const creditCardAdapter = createEntityAdapter<CreditCardInput>({
});

export const creditCardInitialState = creditCardAdapter.getInitialState({
    creditCardInput: {
        id: 1,
        interesRate: 19.34 
    }
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