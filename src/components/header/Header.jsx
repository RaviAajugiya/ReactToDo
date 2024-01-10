import React from "react";
import {
  Menu,
  Checklist,
  Search,
  NotificationsNone,
  West,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link to="menu">
          <Menu className="icon menu-icon" />
        </Link>
        <Checklist className="icon checklist-icon" />
        <span className="brand-text">Task Ease</span>

        <Link to="/">
          <West className="icon arrow-icon" />
        </Link>
        <span className="brand-text">Edit Task</span>
      </div>
      <div>
        <Search className="icon search-icon" />
        <NotificationsNone className="icon notification-icon" />

        <AccountCircle className="icon user-icon" />
      </div>
    </header>
  );
}

export default Header;
