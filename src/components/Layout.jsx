import React, { useState, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Category from "./category/Category";
import Task from "./home/Task";
import AddTask from "./addTask/AddTask";
import Home from "./home/Home.jsx";
import { useSelector } from "react-redux";
import { useTheme } from "../Theme/ThemeContext.jsx";
import { setTheme } from "../Theme/Theme.jsx";

function Layout() {
  const location = useLocation();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 769);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    setTheme(theme);
  }, [theme]);
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
      <div>
        <div>fdsh df</div>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      {isWideScreen || location.pathname === "/" ? <Header /> : null}
      <div className="main-container">
        {isWideScreen || location.pathname === "/" ? <Category /> : null}

        {isWideScreen ? (
          <>
            {/* {location.pathname === "/" && <Home />} */}
            <Home />
            {location.pathname !== "/" && <AddTask />}
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Layout;
