import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editToDo, removeTodo } from "../Redux/slice/todoSlice";

import { useLocation } from "react-router-dom";

function AddTask() {
  const [group, setGroup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");

  const location = useLocation();
  const editData = location.state;
  useEffect(() => {
    console.log(editData);
    setGroup(editData?.group);
    setTitle(editData?.title);
    setDescription(editData?.description);
    setPriority(editData?.priority);
  }, []);

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTodo(editData.id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      group,
      title,
      description,
      date,
      priority,
    };

    editData
      ? dispatch(editToDo({ ...todo, id: editData.id }))
      : dispatch(addTodo(todo));
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
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="General">General</option>
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
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <button onClick={(e) => handleSubmit(e)} className="btn add-btn">
          <Add className="icon" />
          <p>Save</p>
        </button>
        <button onClick={(e) => handleDelete(e)} className="btn add-btn">
          Delete
        </button>
      </form>
    </div>
  );
}

export default AddTask;
