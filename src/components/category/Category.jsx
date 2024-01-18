import React, { useState, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import CategoryIteam from "./CategoryIteam";
import {
  FormatListBulleted,
  CheckCircleOutline,
  PendingActions,
  ImportExport,
} from "@mui/icons-material";
import { clearFilters, setFilterStatus } from "../Redux/slice/todoSlice";
import { useDispatch } from "react-redux";

function Category() {
  const dispatch = useDispatch();

  const [activeStatus, setActiveStatus] = useState("all");
  const [isSortItemsVisible, setSortItemsVisible] = useState(false);

  const handleItemClick = (clickedStatus) => {
    dispatch(clearFilters());
    setActiveStatus(() => {
      console.log(clickedStatus);
      dispatch(setFilterStatus(clickedStatus));
      return clickedStatus;
    });
  };

  const toggleSortItems = () => {
    setSortItemsVisible(!isSortItemsVisible);
  };

  return (
    <div className="category-container">
      <div className="category-label task-container-label">
        <span>Categories</span>
        <span onClick={toggleSortItems}>
          <ImportExport /> Sort
        </span>
        {isSortItemsVisible && (
          <div className="sort-items">
            <ul>
              <li>
                <div>
                  <span>Due Date</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Alphabetically</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="categoryIteam-container">
        <CategoryIteam
          text="All"
          setParam={handleItemClick}
          icon={<FormatListBulleted className="icon" />}
          active={activeStatus === "all"}
        />
        <CategoryIteam
          text="Pending"
          setParam={handleItemClick}
          icon={<PendingActions className="icon" />}
          active={activeStatus === "pending"}
        />
        <CategoryIteam
          text="Completed"
          setParam={handleItemClick}
          icon={<CheckCircleOutline className="icon" />}
          active={activeStatus === "completed"}
        />
      </div>
    </div>
  );
}

export default Category;
