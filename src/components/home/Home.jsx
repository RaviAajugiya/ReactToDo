import React, { useEffect, useState } from "react";
import {
  FormatListBulleted,
  PlaylistAddCheckCircle,
} from "@mui/icons-material";
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
import { clearFilters, getFilteredToDo, setFilterSearch, setFilterStatus, swapTask } from "../Redux/slice/todoSlice";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import Button from "../button/Button";

function home() {
  const [status, setStatus] = useState("all");
  const dispatch = useDispatch();
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
  
  // dispatch(setFilterStatus('completed'));
  
  const todos = getFilteredToDo(useSelector((state) => state));
  

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <div className="home">
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
