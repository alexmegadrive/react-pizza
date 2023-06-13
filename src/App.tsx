import "./scss/app.scss";
import React, { FC, createContext, useState } from "react";
import { Header } from "@/components";
import { Outlet } from "react-router-dom";

// interface ISearchContext {
//   searchValue: string;
//   setSearchValue?: (value: string) => void;
// }
// export const SearchContext = createContext<ISearchContext>({
//   searchValue: "",
// });

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    // <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
    // </SearchContext.Provider>
  );
};

export default App;
