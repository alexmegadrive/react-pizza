import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Cart from "./pages/Cart.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import FullPizza from "./pages/FullPizza.tsx";
import "./scss/app.scss";

const router = createBrowserRouter([
  {
    path: "/react-pizza/",
    element: <App />,
    children: [
      {
        path: "/react-pizza/",
        element: <Home />,
      },
      {
        path: "/react-pizza/*",
        element: <NotFound />,
      },
      {
        path: "/react-pizza/pizzas/:id",
        element: <Home />,
      },

      {
        path: "/react-pizza/cart",
        element: <Cart />,
      },
      {
        path: "/react-pizza/pizza/:id",
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
