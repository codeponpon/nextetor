import { AnyAction } from "redux";
import { ActionType } from "../actions/types";

export interface AuthState {
  isLoading: boolean;
  accessToken?: string;
  error?: string;
}

export interface State {
  accessToken: string;
}

export const initialState = { isLoading: false };

const reducer = (
  state: AuthState = initialState,
  { type, payload }: AnyAction
): AuthState => {
  console.log("---- Reducer ----");
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
      return payload;
    case ActionType.LOGIN_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
