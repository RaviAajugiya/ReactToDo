import React from "react";
import { FormatListBulleted } from "@mui/icons-material";
import Task from "./Task";
import {
  WatchLaterOutlined,
  FiberManualRecord,
  Flag,
  CalendarMonth,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

function home() {
  const todos = useSelector((state) => state.todos);

  return (
    <div className="home">
      <div className="category-label task-container-label">
        <span className="">Categories</span>
        <span>View all</span>
      </div>

      <div className="category-container">
        <div>
          <FormatListBulleted className="icon" />
          <span>All</span>
        </div>
        <div>
          <FormatListBulleted className="icon" />
          <span>Completed</span>
        </div>
        <div>
          <FormatListBulleted className="icon" />
          <span>Active</span>
        </div>
      </div>

      <p className="task-container-label">Today</p>

      {todos.map((todo) => (
        <Task
          id={todo.id}
          title={todo.title}
          date={todo.date}
          group={todo.group}
          priority={todo.priority}
        />
      ))}

      <p className="task-container-label">Completed</p>

      <div className="task completed-task">
        <div className="task-iteam">
          <input type="checkbox" name="" id="" />
          <div>
            <p>Complete ToDo Design</p>
            <p>
              <WatchLaterOutlined className="icon watch-icon" />
              <span>07:00 PM</span>
              <FiberManualRecord className="icon dot-icon" />
              <CalendarMonth className="icon calendar-icon" />
              <span>1 Jan</span>|<span>work</span>
            </p>
          </div>
        </div>
        <Flag className="priority-flag" />
      </div>
    </div>
  );
}

export default home;
