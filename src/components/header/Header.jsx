import React from "react";
import {
  DeleteForever,
  Checklist,
  Search,
  NotificationsNone,
  West,
  EditOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeTodo } from "../Redux/slice/todoSlice";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  if (location.pathname === "/add") {
    const helperId = useSelector((state) => state.helperId);
    console.log(helperId);
  }

  

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTodo(id));
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
            <span className="brand-text">{id ? 'Edit' : 'Add'} Task</span>
          </>
        )}
      </div>
      <div>
        {location.pathname === "/" ? (
          <>
            <Search className="icon search-icon" />
            <NotificationsNone className="icon notification-icon" />
          </>
        ) : (
          <>
            {/* <EditOutlined className="icon edit-icon" sx={{}} /> */}
            <DeleteForever
              onClick={handleDelete}
              className="icon delete-icon"
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
