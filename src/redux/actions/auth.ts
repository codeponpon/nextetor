import { UserInputError } from "apollo-server-errors";
import { User } from "@/generated/client";
import AuthStorage from "@/utils/auth-storage";
import { ActionType, ILogin, TPayload } from "./types";

export const initLogin: ILogin = { username: "", password: "" };

export const actionLogin = async (
  payload: ILogin = initLogin,
  next?: (err: UserInputError, response: User) => void
): Promise<TPayload> => {
  return {
    type: ActionType.INTERNAL_REQUEST,
    payload: {
      action: "login",
      payload: payload,
      successType: ActionType.LOGIN_SUCCESS,
      next: async (err: UserInputError, response: User) => {
        if (!err) {
          AuthStorage.value = {
            token: response.token,
            userId: response.id,
          };
        }
        if (next) next(err, response);
      },
    },
  };
};
