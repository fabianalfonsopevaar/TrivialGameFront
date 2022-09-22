import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { SocketContextProvider } from "./context/SocketContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </BrowserRouter>
);
