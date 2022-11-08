import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
// eslint-disable-next-line
import "swiper/css/bundle";
import { ThemeProvider } from "@material-tailwind/react";
import { NativeBaseProvider } from "native-base";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ContextProvider>
        <BrowserRouter>
          <NativeBaseProvider>
            <App />
          </NativeBaseProvider>
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
