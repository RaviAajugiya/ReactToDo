import React, { useEffect, useState } from "react";
import { FormatListBulleted } from "@mui/icons-material";
import Task from "./Task";
import {
  WatchLaterOutlined,
  FiberManualRecord,
  Flag,
  Add,
  EmojiObjectsOutlined,
  PendingActions,
  CheckCircleOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredToDo, swapTask } from "../Redux/slice/todoSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 200 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200 },
    })
  );

  const searchVal = searchParams.get("search");

  useEffect(() => {
    setSearch(searchParams.get("search"));
  }, [searchVal]);

  const todos = getFilteredToDo(
    useSelector((state) => state.todos),
    status,
    search
  );

  const loadData = (e, status) => {
    document.querySelector(".shadow")?.classList.remove("shadow");
    setStatus(status);
    const container = e.target.closest(".header-btn");
    if (container) {
      container.classList.add("shadow");
    }
    navigate('/')
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="home">
        <div className="category-label task-container-label">
          <span className="">Categories</span>
          <span>View all</span>
        </div>

        <div className="category-container">
          <div
            className="shadow header-btn all-btn"
            onClick={(e) => {
              loadData(e, "all");
            }}
          >
            <FormatListBulleted className="icon" />
            <span>All</span>
          </div>
          <div
            className="header-btn pending-btn"
            onClick={(e) => {
              loadData(e, "active");
            }}
          >
            <PendingActions className="icon" />
            <span>Pending</span>
          </div>
          <div
            className="header-btn complete-btn"
            onClick={(e) => {
              loadData(e, "completed");
            }}
          >
            <CheckCircleOutline className="icon" />
            <span>Completed</span>
          </div>
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

        <div className="footer">
          <div className="btn suggestion-btn">
            <EmojiObjectsOutlined className="icon" />
            <p>Suggestion</p>
          </div>
          <div className="btn add-btn" onClick={() => navigate("/add")}>
            <Add className="icon" />
            <p>Add Task</p>
          </div>
        </div>
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
