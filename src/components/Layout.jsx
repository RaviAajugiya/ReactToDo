import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Category from "./category/Category";
import Task from "./home/Task";
import AddTask from "./addTask/AddTask";
import Home from './home/Home.jsx';


function Layout() {
  const location = useLocation();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 769);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="main-container">
        <Category />
        {isWideScreen ? (
          <>
            {location.pathname === "/" && < Home/>}
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
