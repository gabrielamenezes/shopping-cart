import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A9F85",
    },
    secondary: {
      main: "#FF7070",
    },
  },
});
const router =  createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/feira",
    element: <Feira/>
  },
  {
    path: "/carrinho",
    element: <Carrinho/>
  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
