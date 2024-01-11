import React, { useEffect, useState } from "react";
import { FormatListBulleted } from "@mui/icons-material";
import Task from "./Task";
import {
  WatchLaterOutlined,
  FiberManualRecord,
  Flag,
  CalendarMonth,
  PendingActions,
  CheckCircleOutline,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getFilteredToDo } from "../Redux/slice/todoSlice";

function home() {
  const [status, setStatus] = useState('all');

  
  const activeTodos = getFilteredToDo(
    useSelector((state) => state.todos),
    "completed"
  );

  const completeTodos = getFilteredToDo(
    useSelector((state) => state.todos),
    "active"
  );

  return (
    <div className="home">
      <div className="category-label task-container-label">
        <span className="">Categories</span>
        <span>View all</span>
      </div>

      <div className="category-container">
        <div className="all-btn">
          <FormatListBulleted className="icon" />
          <span>All</span>
        </div>
        <div className="pending-btn">
          <PendingActions className="icon" />
          <span>Pending</span>
        </div>
        <div className="complete-btn">
          <CheckCircleOutline className="icon" />
          <span>Completed</span>
        </div>
      </div>



      <div className="">
        <p className="task-container-label">Pending</p>

        {activeTodos.map((todo) => (
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
        
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default home;
