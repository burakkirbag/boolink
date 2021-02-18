import { Dispatch } from "redux";
import { LOCAL_STORAGE_CURRENT_USER_DATA } from "../../constants";
import {
  AuthActionType,
  SET_CURRENT_USER,
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from "./auth-action-types";
import {
  IRegister,
  ILogin,
  AuthenticatedUserFactoryFromJs,
  SetCurrentUserPayloadFactory,
  AuthenticatedUserFactory,
} from "../../models/auth";
import AuthService from "../../services/auth-service";

const authService = new AuthService();

export const register = (input: IRegister, history: any) => async (
  dispatch: Dispatch<AuthActionType>
) => {
  history.push("/login?registerSuccess=1");
};

export const autoLogin = () => async (dispatch: Dispatch<AuthActionType>) => {
  const userData = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_DATA);
  if (userData) {
    const currentUser = AuthenticatedUserFactoryFromJs(JSON.parse(userData));
    let payload = SetCurrentUserPayloadFactory();
    payload = payload.set("user", currentUser).set("isAuthenticated", true);

    dispatch({
      type: SET_CURRENT_USER,
      payload: payload,
    });
  }
};

export const login = (input: ILogin) => async (
  dispatch: Dispatch<AuthActionType>
) => {
  try {
    const res = await authService.login(input);
    if (res.success && res.data) {
      localStorage.setItem(
        LOCAL_STORAGE_CURRENT_USER_DATA,
        JSON.stringify(res.data)
      );

      const currentUser = AuthenticatedUserFactoryFromJs(res.data);
      let payload = SetCurrentUserPayloadFactory();
      payload = payload.set("user", currentUser).set("isAuthenticated", true);

      dispatch({
        type: SET_CURRENT_USER,
        payload: payload,
      });
    } else {
      dispatch({ type: SET_ERROR_MESSAGE, payload: res.message });
    }
  } catch (err) {}
};

export const logout = () => async (dispatch: Dispatch<AuthActionType>) => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_DATA);

    let payload = SetCurrentUserPayloadFactory();
    payload = payload
      .set("user", AuthenticatedUserFactory())
      .set("isAuthenticated", false);

    dispatch({
      type: SET_CURRENT_USER,
      payload: payload,
    });
  } catch (err) {}
};

export const setErrorMessage = (message: string) => async (
  dispatch: Dispatch<AuthActionType>
) => {
  dispatch({ type: SET_ERROR_MESSAGE, payload: message });
};

export const setLoading = (status: boolean) => async (
  dispatch: Dispatch<AuthActionType>
) => {
  dispatch({ type: SET_LOADING, payload: status });
};
