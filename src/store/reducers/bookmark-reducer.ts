import {
  BookmarkActionType,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  SET_LOADING,
} from "../actions/bookmark-action-types";

import { BookmarkState, BookmarkStateFactoryFromJs } from "../../models/state";

const initialState: BookmarkState = BookmarkStateFactoryFromJs({
  items: [],
  loading: false,
});

export default (
  state = initialState,
  action: BookmarkActionType
): BookmarkState => {
  switch (action.type) {
    case ADD_BOOKMARK: {
      let items = state.items;
      let newItems = items.push(action.payload);
      return state.set("items", newItems).set("loading", false);
    }
    case REMOVE_BOOKMARK: {
      let items = state.items.filter((item) => item.id !== action.payload.id);
      return state.set("items", items).set("loading", false);
    }
    case SET_LOADING:
      return state.set("loading", action.payload);
    default:
      return state;
  }
};
