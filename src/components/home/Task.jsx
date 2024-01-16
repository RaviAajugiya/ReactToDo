import React, { useState } from "react";
import {
  WatchLaterOutlined,
  FiberManualRecord,
  Flag,
  CalendarMonth,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setToDoState } from "../Redux/slice/todoSlice";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


function Task(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let date = new Date(props.date);
  let time, meridiemTime, dateDay;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (props.remindMe) {
    time = props.remindMe.split(":");
    meridiemTime =
      (time[0] >= 12 && (time[0] - 12 || 12) + ":" + time[1] + " PM") ||
      (Number(time[0]) || 12) + ":" + time[1] + " AM";
    dateDay =
      date.getDate() + " " + date.toLocaleString("en-US", { month: "short" });
  }

  const getDetail = (e) => {
    if (e.target.nodeName !== "INPUT") {
      navigate(`/edit/${props.id}`, { state: props });
    }
  };

  return (
    <div
      onClick={getDetail}
      className={`${props.completed ? "task  completed-task" : "task"}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
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
            <span>{meridiemTime}</span>
            <FiberManualRecord className="icon dot-icon" />
            <CalendarMonth className="icon calendar-icon" />
            <span>{dateDay}</span>|<span>{props.group}</span>
          </p>
        </div>
      </div>
      <Flag className={`priority-${props.priority}`} />
    </div>
  );
}

export default Task;
