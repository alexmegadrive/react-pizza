import "./scss/app.scss";
import { Header } from "@/components";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
