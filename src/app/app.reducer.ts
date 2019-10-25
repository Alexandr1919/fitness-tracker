import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './shared/auth.reducer';

// with that define how application-wide state is going to look
export interface State {
  ui: fromUi.State; // it says that this slice of state has state structure accordingly to type defined in ui.reducer
  auth: fromAuth.State;
}

// the part below is going to group all reducers. which is a special type ActionReducerMap(Map of all the reducers we have in the end)
// which is a generic type. which is of type of our State
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

// selectors are helper functions which make it easier for us to pull information from the state
// it's a generic function it needs to know which kind of state it works with
// it will allow us to simply call function getUiState to get access to certain slice of state
export const getUiState = createFeatureSelector<fromUi.State>('ui');

// also we can get access to particular state of each slice of global state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
