// import { useState, useEffect } from "react";
import { Header, Sort, Categories, PizzaList } from "./components";
// import { IPizzaBlock } from "./components/PizzaList";
import "./scss/app.scss";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";

// import pizzas from "./data/pizzas.json";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },

  //   {
  //     path: "/pizzas/:id",
  //     element: <App />,
  //   },
  // ]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            {/* <RouterProvider router={router} /> */}
          </div>
        </div>
      </div>
      {/* <h1>Test</h1> */}
    </>
  );
}

export default App;
