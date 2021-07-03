import { ActionType } from "./types";

interface ShareType {
  data?: any;
  payload?: any;
  error?: any;
}

export interface RequestError extends ShareType {
  type: ActionType.REQUEST_ERROR;
}

export interface LoginSuccess extends ShareType {
  type: ActionType.LOGIN_SUCCESS;
}

export interface LoginFailed extends ShareType {
  type: ActionType.LOGIN_FAILED;
}
