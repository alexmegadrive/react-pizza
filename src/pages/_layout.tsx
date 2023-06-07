import React, { FC } from "react";
import { Header } from "../components";

interface ILayoutProps {
  children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
