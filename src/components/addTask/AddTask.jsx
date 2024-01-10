import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../Redux/slice/todoSlice";

import { useLocation } from "react-router-dom";

function AddTask() {
  const [group, setGroup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");

  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    if (
      data &&
      (data.group !== group ||
        data.title !== title ||
        data.description !== description ||
        data.priority !== priority)
    ) {
      setGroup(data.group);
      setTitle(data.title);
      setDescription(data.description);
      setPriority(data.priority);
    }
  }, [data, setGroup, setTitle, setDescription, setPriority]);


  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      group,
      title,
      description,
      date,
      priority,
    };

    dispatch(addTodo(todo));
  };

  return (
    <div className="addTask">
      <form>
        <select
          name="group"
          id=""
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option>Select Group</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="general">General</option>
        </select>
        <br />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <input
          type="datetime-local"
          name="date"
          id="date"
          placeholder="Due date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Set Priority</option>
          <option value="work">High</option>
          <option value="personal">Medium</option>
          <option value="general">Low</option>
        </select>
        <button onClick={(e) => handleSubmit(e)} className="btn add-btn">
          <Add className="icon" />
          <p>Save</p>
        </button>
      </form>
    </div>
  );
}

export default AddTask;
