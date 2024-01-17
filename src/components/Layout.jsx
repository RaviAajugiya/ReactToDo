import React, { useState, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Category from "./category/Category";
import Task from "./home/Task";
import AddTask from "./addTask/AddTask";
import Home from "./home/Home.jsx";

function Layout() {
  const location = useLocation();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 769);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isWideScreen || location.pathname === "/" ? <Header /> : null}
      <div className="main-container">
        {isWideScreen || location.pathname === "/" ? <Category /> : null}

        {isWideScreen ? (
          <>
            {/* {location.pathname === "/" && <Home />} */}
            <Home />
            <AddTask />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Layout;
