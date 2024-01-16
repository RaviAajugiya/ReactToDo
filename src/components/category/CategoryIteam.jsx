import React from "react";

function CategoryIteam({ text, icon , classProps }) {
  return (
    <div className={`categoryIteam ${classProps}`}>
      <div>
        {icon}
        <span>{text}</span>
      </div>
      {/* <div>10</div> */}
    </div>
  );
}

export default CategoryIteam;
