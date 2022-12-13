import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import ReloadPage from "./components/ReloadPage";
import { SnackbarProvider } from "notistack";
import LoadingContextProvider from "./Context/LoadingContext";
import CheckOutContextProvider from "./Context/CheckOutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoadingContextProvider>
      <CheckOutContextProvider>
        <ReloadPage>
          <GlobalStyles>
            <SnackbarProvider
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              style={{ fontSize: "1.8rem", zIndex: "99999" }}
            >
              <App />
            </SnackbarProvider>
          </GlobalStyles>
        </ReloadPage>
      </CheckOutContextProvider>
    </LoadingContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
