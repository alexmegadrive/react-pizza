import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Layout from "./pages/_layout.tsx";
import "./scss/app.scss";

// import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },

  {
    path: "/pizzas/:id",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
    {/* <App /> */}
    <RouterProvider router={router} />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
