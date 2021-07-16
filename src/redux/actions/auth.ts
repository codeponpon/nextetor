import { UserInputError } from "apollo-server-errors";
import { User } from "@/generated/client";
import AuthStorage from "@/utils/auth-storage";
import { ActionType, ILogin, TPayload } from "./types";

export const actionGetUserAuth = async (next: () => void) => {
  return {
    type: ActionType.INTERNAL_REQUEST,
    payload: {
      action: ActionType.LOGIN,
      successType: ActionType.GET_USER_AUTH_SUCCESS,
      next,
    },
  };
};

export const actionLogout = async (next: () => void) => {
  return {
    type: ActionType.INTERNAL_REQUEST,
    payload: {
      successType: ActionType.LOGOUT_SUCCESS,
      next: async () => {
        AuthStorage.destroy();
        next();
      },
    },
  };
};
