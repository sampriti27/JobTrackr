import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider autoHideDuration={2000}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);
