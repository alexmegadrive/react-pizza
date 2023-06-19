import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import FullPizza from "./pages/FullPizza.tsx";
import "./scss/app.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
      {
        path: "/pizzas/:id",
        element: <Home />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/pizza/:id",
        element: <FullPizza />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
