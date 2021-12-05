import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DataProvider } from "./GlobalState";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <DataProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </DataProvider>,

  document.getElementById("root")
);
