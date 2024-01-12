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
import { useSelector } from "react-redux";
import { getFilteredToDo } from "../Redux/slice/todoSlice";
import { useLocation, useNavigate } from "react-router-dom";

function home() {
  const [status, setStatus] = useState("active");
  const location = useLocation();
  const navigate = useNavigate();

  const todos = getFilteredToDo(
    useSelector((state) => state.todos),
    status
  );

  const completeTodos = getFilteredToDo(
    useSelector((state) => state.todos),
    "completed"
  );

  return (
    <div className="home">
      <div className="category-label task-container-label">
        <span className="">Categories</span>
        <span>View all</span>
      </div>

      <div className="category-container">
        <div className="all-btn" onClick={() => setStatus("all")}>
          <FormatListBulleted className="icon" />
          <span>All</span>
        </div>
        <div className="pending-btn" onClick={() => setStatus("active")}>
          <PendingActions className="icon" />
          <span>Pending</span>
        </div>
        <div className="complete-btn" onClick={() => setStatus("completed")}>
          <CheckCircleOutline className="icon" />
          <span>Completed</span>
        </div>
      </div>

      <div className="todo-container">
        {/* {status === "all" ? (
          <p className="task-container-label">Pending</p>
        ) : (
          ""
        )} */}

        {/* {status === "all" ? setStatus("active") : ""} */}
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
      </div>

      {/* <div>
        {status === "all" ? (
          <>
            <p className="task-container-label">Completed</p>
            {completeTodos.map((todo) => (
              <Task
                key={todo.id}
                id={todo.id}
                title={todo.title}
                date={todo.date}
                group={todo.group}
                priority={todo.priority}
                description={todo.description}
                completed={todo.completed}
              />
            ))}
          </>
        ) : (
          ""
        )}
      </div> */}

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
  );
}

export default home;
