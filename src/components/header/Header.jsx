import React, { useState } from "react";
import {
  DeleteForever,
  Checklist,
  Search,
  LightMode,
  West,
  DarkMode,
} from "@mui/icons-material";
import { Link, createSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../Redux/slice/todoSlice";
import { toast } from "react-toastify";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { id } = useParams();

  const searchToDo = (e) => {
    if(e.key === "Enter"){
      navigate({
        pathname: "/",
        search: createSearchParams({
          search: e.target.value,
        }).toString(),
      });
      setSearch('');
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTodo(id));
    toast.success(`Task deleted successfully`);
    navigate("/");
  };

  return (
    <header>
      <div>
        {location.pathname === "/" ? (
          <>
            <Checklist className="icon checklist-icon" />
            <span className="brand-text">Task Ease</span>
          </>
        ) : (
          <>
            <Link to="/">
              <West className="icon arrow-icon" />
            </Link>
            <span className="brand-text">{id ? "Edit" : "Add"} Task</span>
          </>
        )}
      </div>
      <div>
        {location.pathname === "/" ? (
          <>
            {/* <Search className="icon search-icon"  onClick="SearchTodo"/> */}
            <input type="text" value={search} className="searchBox" placeholder="Search" onChange={(e) => setSearch(e.target.value)}  onKeyUp={(e) => searchToDo(e)}/>
            {/* <DarkMode className="icon arrow-icon" /> */}
            {/* <LightMode className="icon arrow-icon" />    */}
          </>
        ) : (
          <>
            {location.pathname === "/add" ? (
              ""
            ) : (
              <DeleteForever
                onClick={handleDelete}
                className="icon delete-icon"
              />
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
