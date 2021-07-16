import { UserInputError } from "apollo-server-errors";
import { User } from "@/generated/client";

export enum ActionType {
  INTERNAL_REQUEST,
  REQUEST_ERROR,
  TOGGLE_LOADING,
  START_LOADING,
  STOP_LOADING,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_USER_AUTH_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  CREATE_USER_SUCCESS,
}

export interface ILogin {
  username: string;
  password: string;
}

export type TPayload = {
  type: number;
  payload: {
    action: string;
    payload: ILogin;
    successType?: number;
    errorType?: number;
    next: (err: UserInputError, response: User) => void;
  };
};
