import React, { useState } from "react";
import {
  WatchLaterOutlined,
  FiberManualRecord,
  Flag,
  CalendarMonth,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToDoState } from "../Redux/slice/todoSlice";

function Task(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDetail = (e) => {
    if (e.target.nodeName !== "INPUT") {
      console.log("props", props);
      navigate("/add", { state: props });
    }
  };

  return (
    <div
      onClick={getDetail}
      className={`${props.completed ? "task  completed-task" : "task"}`}
    >
      <div className="task-item">
        <input
          type="checkbox"
          name=""
          id={props.id}
          checked={props.completed}
          onChange={(e) => {
            dispatch(
              setToDoState({ completed: !props.completed, id: e.target.id })
            );
          }}
        />
        <div>
          <p>{props.title}</p>
          <p>
            <WatchLaterOutlined className="icon watch-icon" />
            <span>07:00</span>
            <FiberManualRecord className="icon dot-icon" />
            <CalendarMonth className="icon calendar-icon" />
            <span>{props.date}</span>|<span>{props.group}</span>
          </p>
        </div>
      </div>
      <Flag className="priority-flag" />
    </div>
  );
}

export default Task;
