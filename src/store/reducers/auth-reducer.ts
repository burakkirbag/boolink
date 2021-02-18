import {
  AuthActionType,
  SET_CURRENT_USER,
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from "../actions/auth-action-types";

import { AuthState, AuthStateFactoryFromJs } from "../../models/state";
import { AuthenticatedUserFactory } from "../../models/auth";

const initialState: AuthState = AuthStateFactoryFromJs({
  authenticatedUser: AuthenticatedUserFactory(),
  errorMessage: "",
  loading: false,
  isAuthenticated: false,
});

export default (state = initialState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state
        .set("authenticatedUser", action.payload.user)
        .set("isAuthenticated", action.payload.isAuthenticated)
        .set("errorMessage", null)
        .set("loading", false);
    case SET_ERROR_MESSAGE:
      return state.set("errorMessage", action.payload).set("loading", false);
    case SET_LOADING:
      return state.set("loading", action.payload);
    default:
      return state;
  }
};
