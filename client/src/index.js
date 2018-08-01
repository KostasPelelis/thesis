/*
* @flow
*/

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./state/EditorReducer";
import App from "./components/App";

import "./index.css";
import "./vendor/semantic.min.css";

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

let mountElement = document.getElementById("root");
if (mountElement == null) {
  mountElement = document.createElement("div");
  mountElement.id = "root";
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountElement
);
