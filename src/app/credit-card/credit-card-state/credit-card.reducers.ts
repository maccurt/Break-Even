// import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CreditCardAction } from "./credit-card.actions.barrel";

export const creditCardFeatureKey = 'creditCard';
// export class CreditCardInput {
//     id!: number;
//     interestRate!: number;
// };

// export interface CreditCardState extends EntityState<CreditCardInput> {    
//     creditCardInput: CreditCardInput
// };

// export const creditCardAdapter = createEntityAdapter<CreditCardInput>({
// });

// export const creditCardInitialState = creditCardAdapter.getInitialState({    
//     creditCardInput: {
//         id: 1,
//         interestRate: 15.13 //This is the average for 2022
//     }
// });

export interface CreditCardState {
    interestRate: number;
};

export const creditCardInitialState = {
    interestRate: 15.3
};

// export const creditCardInitialState = creditCardAdapter.getInitialState({    
//     creditCardInput: {
//         id: 1,
//         interestRate: 15.13 //This is the average for 2022
//     }
// });

export const creditCardReducer = createReducer<CreditCardState>(
    creditCardInitialState,
    on(CreditCardAction.getInterestRateSuccess, (state, action): CreditCardState => {
        return {
            ...state,
            interestRate: state.interestRate
        };
    })
);

// export const {
//     selectIds,
//     selectEntities,
//     selectAll,
//     selectTotal
// } = creditCardAdapter.getSelectors();