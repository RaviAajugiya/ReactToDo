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
  const [isSortOrderAsc, setIsSortOrderAsc] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isSortItemsVisible, setSortItemsVisible] = useState(false);
  const [sortLabel, setSortLabel] = useState("");

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 200 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200 },
    })
  );

  const handleSortOrder = () => {
    setIsSortOrderAsc(!isSortOrderAsc);
  };

  const handleSort = (e) => {
    let sortby = e.target.innerText.toLowerCase().split(" ").join("");

    // if (!isSortOrderAsc) {
    //   sortby = sortby + "_dsce";
    // }

    console.log(sortby);

    setSortItemsVisible(false);
    setSortLabel(e.target.innerText);
    setIsSortActive(true);

    dispatch(setSortBy(sortby));
  };

  const toggleSortItems = () => {
    setSortItemsVisible(!isSortItemsVisible);
  };
  const todos = getFilteredToDo(useSelector((state) => state));

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="home">
        <div className="sort-container">
          <span onClick={toggleSortItems}>
            <ImportExport /> Sort
          </span>
          {isSortItemsVisible && (
            <div className="sort-items">
              <ul>
                <li onClick={(e) => handleSort(e)}>
                  <div>
                    <span>Due Date</span>
                  </div>
                </li>
                <hr />
                <li onClick={(e) => handleSort(e)}>
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
                  onClick={() => handleSortOrder()}
                />
              ) : (
                <KeyboardArrowDown
                  className="icon"
                  onClick={() => handleSortOrder()}
                />
              )}
              <p>
                Sorted by <strong>{sortLabel}</strong>{" "}
              </p>
              <Close
                className="icon close-icon"
                onClick={() => setIsSortActive(false)}
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
