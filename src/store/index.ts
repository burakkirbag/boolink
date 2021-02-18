import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import bookmarkReducer from "./reducers/bookmark-reducer";
import authReducer from "./reducers/auth-reducer";

const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
