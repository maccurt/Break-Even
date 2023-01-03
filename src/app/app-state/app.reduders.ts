import { CreditCardState } from './../credit-card/credit-card-state/credit-card.reducers';
import {
  ActionReducerMap
} from '@ngrx/store';
// import { environment } from '../../environments/environment';

export const appStateKey = 'app';
export interface AppState {
  
};
export const appReducers: ActionReducerMap<AppState> = {};

// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
