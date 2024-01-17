import { EmojiObjectsOutlined } from "@mui/icons-material";
import React from "react";

function Button({icon, text, btnClass}) {
  return (
    <div className={`btn ${btnClass}`}>
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default Button;
