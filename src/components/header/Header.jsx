import React from "react";
import {
  DeleteForever,
  Checklist,
  Search,
  NotificationsNone,
  West,
  EditOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  if(location.pathname === "/add"){
    const helperId = useSelector((state) => state.helperId);
    console.log(helperId);
  }
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
            <span className="brand-text">Edit Task</span>
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
            <EditOutlined className="icon edit-icon" />
            <DeleteForever className="icon delete-icon" />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
