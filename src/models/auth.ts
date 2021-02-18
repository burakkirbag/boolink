import { ReadonlyRecord } from "./base";
import { Record } from "immutable";

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  name: string;
  username: string;
  password: string;
}

export interface IUser {
  name: string;
  username: string;
  password: string;
}

export interface IBaseAuthenticationUser {
  name: string;
  username: string;
  token: string;
}

export interface IAuthenticatedUser extends IBaseAuthenticationUser {}

export interface ReadonlyAuthenticatedUser extends IBaseAuthenticationUser {}

export type AuthenticatedUser = ReadonlyRecord<ReadonlyAuthenticatedUser>;

export const AuthenticatedUserFactory = Record<ReadonlyAuthenticatedUser>({
  name: "",
  username: "",
  token: "",
});

export const AuthenticatedUserFactoryFromJs = (data: IAuthenticatedUser) => {
  return AuthenticatedUserFactory({
    name: data.name,
    username: data.username,
    token: data.username,
  });
};

export interface IBaseSetCurrentUserPayload {
  isAuthenticated: boolean;
}

export interface ISetCurrentUserPayload extends IBaseSetCurrentUserPayload {
  user: IAuthenticatedUser;
}

export interface ReadonlySetCurrentUserPayload
  extends IBaseSetCurrentUserPayload {
  user: AuthenticatedUser;
}

export type SetCurrentUserPayload = ReadonlyRecord<ReadonlySetCurrentUserPayload>;

export const SetCurrentUserPayloadFactory = Record<ReadonlySetCurrentUserPayload>(
  {
    isAuthenticated: false,
    user: AuthenticatedUserFactory(),
  }
);

export const SetCurrentUserPayloadFactoryFromJs = (
  data: ISetCurrentUserPayload
) => {
  return SetCurrentUserPayloadFactory({
    isAuthenticated: data.isAuthenticated,
    user: AuthenticatedUserFactoryFromJs(data.user),
  });
};
