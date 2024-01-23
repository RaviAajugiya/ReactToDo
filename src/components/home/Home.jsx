import React, { useEffect, useState } from "react";
import Task from "./Task";
import {
  Add,
  KeyboardArrowUp,
  KeyboardArrowDown,
  ImportExport,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  getFilteredToDo,
  setFilterSearch,
  setFilterStatus,
  setSortBy,
  swapTask,
} from "../Redux/slice/todoSlice";
import { Link, useSearchParams } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function home() {
  const [status, setStatus] = useState("all");
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [isSortOrderAsc, setIsSortOrderAsc] = useState();
  const [isSortActive, setIsSortActive] = useState(false);
  const [isSortItemsVisible, setSortItemsVisible] = useState(false);
  const [sortLabel, setSortLabel] = useState("");
  const [sort, setSort] = useState("duedate");

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 200 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200 },
    })
  );

  useEffect(() => {
    handleSort(sort);
  }, [sort, isSortOrderAsc, setIsSortOrderAsc]);

  const handleSort = (sortType) => {
    const sortOrder = isSortOrderAsc ? "asc" : "desc";
    const sortBy = sortType + "_" + sortOrder;

    console.log(sortBy);

    setSortItemsVisible(false);
    setSortLabel(sortType);
    setIsSortActive(true);

    dispatch(setSortBy(sortBy));
  };

  const toggleSortItems = () => {
    setSortItemsVisible(!isSortItemsVisible);
  };
  const todos = getFilteredToDo(useSelector((state) => state));

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <div className="home">
        <div className="sort-container">
          <span onClick={toggleSortItems}>
            <ImportExport /> Sort
          </span>
          {isSortItemsVisible && (
            <div className="sort-items">
              <ul>
                <li onClick={(e) => setSort("duedate")}>
                  <div>
                    <span>Due Date</span>
                  </div>
                </li>
                <hr />
                <li onClick={(e) => setSort("alphabetically")}>
                  <div>
                    <span>Alphabetically</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {isSortActive ? (
            <div className="sort-label">
              {isSortOrderAsc ? (
                <KeyboardArrowUp
                  className="icon"
                  onClick={() => setIsSortOrderAsc(false)}
                />
              ) : (
                <KeyboardArrowDown
                  className="icon"
                  onClick={() => setIsSortOrderAsc(true)}
                />
              )}
              <p>
                Sorted by <strong>{sortLabel}</strong>{" "}
              </p>
              <Close
                className="icon close-icon"
                onClick={() => {
                  dispatch(setSortBy(""));
                  setIsSortActive(false);
                }}
              />
            </div>
          ) : null}
        </div>

        <div className="todo-container">
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
              <Task
                key={todo.id}
                id={todo.id}
                title={todo.title}
                date={todo.date}
                group={todo.group}
                priority={todo.priority}
                description={todo.description}
                completed={todo.completed}
                remindMe={todo.remindMe}
              />
            ))}
          </SortableContext>
        </div>
        <Link to="/add">
          <div className="add-btn">
            <Add className="icon" />
          </div>
        </Link>
        <Link to="/add">
          <div className="add-btn">
            <Add className="icon" />
          </div>
        </Link>
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(active, over);
    if (active.id !== over.id) {
      dispatch(swapTask({ active: active.id, over: over.id }));
    }
  }
}

export default home;
