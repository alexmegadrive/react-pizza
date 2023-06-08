import React, { FC } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";

// interface ILayoutProps {
//   children: JSX.Element;
// }

const Root = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            {" "}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
