import React from "react";
import CategoryIteam from "./CategoryIteam";
import {
  DeleteForever,
  Checklist,
  AccountCircle,
  West,
  FormatListBulleted,
  PendingActions,
  CheckCircleOutline,
} from "@mui/icons-material";

function Category() {
  return (
    <div className="category-container">
      <div className="category-label task-container-label">
        <span className="">Categories</span>
        <span>View all</span>
      </div>
      <div className="categoryIteam-container">
        <CategoryIteam
          classProps="active-iteam"
          text="All"
          icon={<DeleteForever className="icon" />}
        />
        <CategoryIteam text="Pending" icon={<Checklist className="icon" />} />
        <CategoryIteam
          text="Completed"
          icon={<PendingActions className="icon" />}
        />
      </div>
    </div>
  );
}

export default Category;
