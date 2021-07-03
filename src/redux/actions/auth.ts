import { UserInputError } from "apollo-server-errors";
import { User } from "@/generated/client";
import AuthStorage from "@/utils/auth-storage";
import { ActionType, ILogin, TPayload } from "./types";

export const actionGetUserAuth = async (next: () => void) => {
  return {
    type: ActionType.INTERNAL_REQUEST,
    payload: {
      url: "/users/" + AuthStorage.userId,
      successType: "GET_USER_AUTH_SUCCESS",
      next,
    },
  };
};
