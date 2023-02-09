import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";

import { concatMap, map, Observable, of, tap } from "rxjs";
import { CreditCardAction } from "./credit-card.actions.barrel";

const getInterestRate = (): Observable<number> => {
    return of(15.3);
};

@Injectable()
export class CreditCardEffects {
    //TODO implement this or remove. It shouldget the default interest rate, etc
    getInterestRate = createEffect(() => {
        return this.actions$.pipe(
            ofType(CreditCardAction.getInterestRate),
            concatMap(action => getInterestRate()),
            map(interestRate => CreditCardAction.getInterestRateSuccess({ interestRate }))
        );
    });

    constructor(private actions$: Actions) {
    }
}