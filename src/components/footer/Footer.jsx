import React from "react";
import { EmojiObjectsOutlined, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="btn suggestion-btn">
        <EmojiObjectsOutlined className="icon" />
        <p>Suggestion</p>
      </div>
      <Link to='add'>
        <div className="btn add-btn">
          <Add className="icon" />
          <p>Add Task</p>
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
