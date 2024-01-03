import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextAuth } from "./context/context";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
    <Provider store={store}>
    <ContextAuth />
    </Provider>
    </ChakraProvider>
  </BrowserRouter>
);

reportWebVitals();
