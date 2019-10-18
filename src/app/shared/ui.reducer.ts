// component is intended to split state logic in logical project parts
// this one is designed to handle the ui part of state

import { UiActions, START_LOADING, STOP_LOADING } from './ui.actions';

// interface to indicate the structure of current slice of state
export interface State {
  isLoading: boolean;
}

// initial state to indicate the state of current slice by default
const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
    // checking different cases as a sting is error prone, that's why it's more handy to store actions in the constants
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

// the string below is used when you need to get access to particular state in the slice so you can just call this function and it will
// return you the state you need
export const getIsLoading = (state: State) => state.isLoading;
