import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './reducers/ui-reducer/ui.reducer';
import * as fromAuth from './reducers/auth-reducer/auth.reducer';

// application wide state interface
export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

// application wide state
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
};

// selector - helper feature that makes easier to pull information from the state
// it will allow us to call this function and get quick access to certain state returnedx from reducer on global app state
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getAuthState = createFeatureSelector<fromAuth.State>('ui');
// createFeatureSelector is used if you targeting the state or the values returned by sub reducer, ui reducer, for example
// createSelector behind the scenes triggers function and returns object as returned by the ui state
// eventually it get us uiState and get isLoading property
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

