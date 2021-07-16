import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

import auth, { initialState as authInitial } from "./auth";
import loader, { initialState as initialLoader } from "./loader";
import { ActionType } from "../actions/types";

export interface InitState {
  auth: { isLoading: boolean };
  loader: { sending: boolean };
}

export const initialState: InitState = {
  auth: authInitial,
  loader: initialLoader,
};

const appReducer = combineReducers<InitState>({
  auth,
  loader,
});

const reducers = (
  state: InitState = initialState,
  action: AnyAction
): InitState => {
  const { type, payload } = action;
  if (type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...payload, // apply delta from hydration
    };
    return nextState;
  }

  return appReducer(
    type == ActionType.LOGOUT_SUCCESS ? initialState : state,
    action
  );
};

export default reducers;
