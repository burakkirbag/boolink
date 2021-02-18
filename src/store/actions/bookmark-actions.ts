import { Dispatch } from "redux";
import {
  BookmarkActionType,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  SET_LOADING,
} from "./bookmark-action-types";

import { IBookmark, BookmarkFactoryFromJs } from "../../models/bookmark";

export const addBookmark = (bookmark: IBookmark) => async (
  dispatch: Dispatch<BookmarkActionType>
) => {
  try {
    dispatch({ type: ADD_BOOKMARK, payload: BookmarkFactoryFromJs(bookmark) });
  } catch (err) {}
};

export const removeBookmark = (bookmark: IBookmark) => async (
  dispatch: Dispatch<BookmarkActionType>
) => {
  try {
    dispatch({
      type: REMOVE_BOOKMARK,
      payload: BookmarkFactoryFromJs(bookmark),
    });
  } catch (err) {}
};

export const setLoading = (status: boolean) => async (
  dispatch: Dispatch<BookmarkActionType>
) => {
  dispatch({ type: SET_LOADING, payload: status });
};
