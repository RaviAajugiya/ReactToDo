import React, { useState } from "react";
import { Checklist, DarkMode, LightMode } from "@mui/icons-material";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, setFilterSearch } from "../Redux/slice/todoSlice";
import { toast } from "react-toastify";
import { InputAdornment } from "@mui/material";
import { useTheme } from "../../Theme/ThemeContext";
import { setTheme } from "../../Theme/Theme";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { id } = useParams();

  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const searchToDo = (e) => {
    if (e.key === "Enter") {
      dispatch(setFilterSearch(e.target.value));
      setSearch("");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTodo(id));
    toast.success(`Task deleted successfully`);
    navigate("/");
  };

  const loadData = (e, status) => {
    document.querySelector(".shadow")?.classList.remove("shadow");
    setStatus(status);
    const container = e.target.closest(".header-btn");
    if (container) {
      container.classList.add("shadow");
    }
    navigate("/");
  };

  return (
    <>
      <header>
        <div>
          <Checklist className="icon checklist-icon" />
          <span className="brand-text">Task Ease</span>
        </div>
        <input
          type="text"
          value={search}
          className="searchBox"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => searchToDo(e)}
        />
        <div onClick={toggleTheme}>
          {theme == "light" ? (
            <LightMode fontSize="medium" />
          ) : (
            <DarkMode fontSize="medium" />
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
