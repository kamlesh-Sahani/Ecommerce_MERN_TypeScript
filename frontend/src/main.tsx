import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import  Store from './Redux/Store.js'
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
