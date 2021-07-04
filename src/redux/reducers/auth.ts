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
) => {
  console.log("---- Reducer ----");
  console.log("TYPE: ", type);

  switch (type) {
    case ActionType.LOGIN_FAILED:
    case ActionType.LOGIN_SUCCESS:
      return payload;
    case ActionType.LOGIN_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default reducer;
