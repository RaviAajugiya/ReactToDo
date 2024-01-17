import React from "react";

function CategoryIteam({ text, icon, setParam, active }) {
  const handleClick = () => {
    setParam(text.toLowerCase());
  };

  return (
    <div
      onClick={handleClick}
      className={`categoryIteam ${active ? "active-iteam" : ""}`}
    >
      <div>
        {icon}
        <span>{text}</span>
      </div>
    </div>
  );
}

export default CategoryIteam;
