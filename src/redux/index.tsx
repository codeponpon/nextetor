import { createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

import reducer, { initialState } from "@/redux/reducers";
import apiMiddleware from "@/redux/thunk/middleware";

const DEV = process.browser && process.env.NODE_ENV === "development";

const bindMiddleware = (middleware: Middleware[]) => {
  return applyMiddleware(...middleware);
};

const makeStore = () => {
  const store = createStore(
    reducer,
    initialState,
    bindMiddleware([apiMiddleware, thunk])
  );
  return store;
};

export default createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
