import { ReadonlyRecord } from "./base";
import { Record, List } from "immutable";
import { IBookmark, Bookmark, BookmarkFactoryFromJs } from "./bookmark";
import {
  IAuthenticatedUser,
  AuthenticatedUser,
  AuthenticatedUserFactory,
  AuthenticatedUserFactoryFromJs,
} from "./auth";

export interface IBaseBookmarkState {
  loading: boolean;
}

export interface IBookmarkState extends IBaseBookmarkState {
  items: Array<IBookmark>;
}

export interface ReadonlyBookmarkState extends IBaseBookmarkState {
  items: List<Bookmark>;
}

export type BookmarkState = ReadonlyRecord<ReadonlyBookmarkState>;

export const BookmarkStateFactory = Record<ReadonlyBookmarkState>({
  loading: false,
  items: List<Bookmark>(),
});

export const BookmarkStateFactoryFromJs = (data: IBookmarkState) => {
  let items: Bookmark[] =
    data.items && data.items.length > 0
      ? data.items.map((item) => {
          return BookmarkFactoryFromJs(item);
        })
      : [];

  return BookmarkStateFactory({
    loading: data.loading,
    items: List(items),
  });
};

export interface IBaseAuthState {
  isAuthenticated: boolean;
  errorMessage: string | null;
  loading: boolean;
}

export interface IAuthState extends IBaseAuthState {
  authenticatedUser: IAuthenticatedUser;
}

export interface ReadonlyAuthState extends IBaseAuthState {
  authenticatedUser: AuthenticatedUser;
}

export type AuthState = ReadonlyRecord<ReadonlyAuthState>;

export const AuthStateFactory = Record<ReadonlyAuthState>({
  isAuthenticated: false,
  errorMessage: "",
  loading: false,
  authenticatedUser: AuthenticatedUserFactory(),
});

export const AuthStateFactoryFromJs = (data: IAuthState) => {
  return AuthStateFactory({
    isAuthenticated: false,
    errorMessage: "",
    loading: data.loading,
    authenticatedUser: AuthenticatedUserFactoryFromJs(data.authenticatedUser),
  });
};
