import { Action } from "./base";
import { Bookmark } from "../../models/bookmark";

export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";
export const SET_LOADING = "SET_LOADING";

interface AddBookmarkAction extends Action<typeof ADD_BOOKMARK, Bookmark> {}

interface RemoveBookmarkAction
  extends Action<typeof REMOVE_BOOKMARK, Bookmark> {}

interface SetLoadingAction extends Action<typeof SET_LOADING, boolean> {}

export type BookmarkActionType =
  | AddBookmarkAction
  | RemoveBookmarkAction
  | SetLoadingAction;
