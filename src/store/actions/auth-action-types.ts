import { Action } from "./base";
import { SetCurrentUserPayload } from "../../models/auth";

export const SET_CURRENT_USER = "AUTH_SET_CURRENT_USER";
export const SET_ERROR_MESSAGE = "AUTH_SET_ERROR_MESSAGE";
export const SET_LOADING = "AUTH_SET_LOADING";

interface SetCurrentUserAction
  extends Action<typeof SET_CURRENT_USER, SetCurrentUserPayload> {}

interface SetErrorMessageAction
  extends Action<typeof SET_ERROR_MESSAGE, string> {}

interface SetLoadingAction extends Action<typeof SET_LOADING, boolean> {}

export type AuthActionType =
  | SetCurrentUserAction
  | SetErrorMessageAction
  | SetLoadingAction;
