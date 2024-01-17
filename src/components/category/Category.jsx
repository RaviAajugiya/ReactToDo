import React, { useState, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import CategoryIteam from "./CategoryIteam";
import { DeleteForever, Checklist, PendingActions } from "@mui/icons-material";
import { clearFilters, setFilterStatus } from "../Redux/slice/todoSlice";
import { useDispatch } from "react-redux";

function Category() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStatus, setActiveStatus] = useState("all");

  const handleItemClick = (clickedStatus) => {
    dispatch(clearFilters());
    setActiveStatus(() => {
      console.log(clickedStatus);
      dispatch(setFilterStatus(clickedStatus));
      return clickedStatus;
    });
  };

  return (
    <div className="category-container">
      <div className="category-label task-container-label">
        <span className="">Categories</span>
        <span>View all</span>
      </div>
      <div className="categoryIteam-container">
        <CategoryIteam
          text="All"
          setParam={handleItemClick}
          icon={<DeleteForever className="icon" />}
          active={activeStatus === "all"}
        />
        <CategoryIteam
          text="Pending"
          setParam={handleItemClick}
          icon={<Checklist className="icon" />}
          active={activeStatus === "pending"}
        />
        <CategoryIteam
          text="Completed"
          setParam={handleItemClick}
          icon={<PendingActions className="icon" />}
          active={activeStatus === "completed"}
        />
        <CategoryIteam
          text="Date"
          setParam={handleItemClick}
          icon={<PendingActions className="icon" />}
          active={activeStatus === "completed"}
        />
      </div>
    </div>
  );
}

export default Category;
