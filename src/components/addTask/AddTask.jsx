import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editToDo, removeTodo, setHelperId } from "../Redux/slice/todoSlice";
import {
  ArrowDropDown,
  NotificationsNone,
  CalendarMonth,
  FlagOutlined,
  Flag,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { showNotification } from "../../services/notification";

function AddTask() {

  const [group, setGroup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [remindMe, setRemindMe] = useState("");
  const [priority, setPriority] = useState("");
  
  const dispatch = useDispatch();
  const location = useLocation();
  const editData = location.state;
  
  if(editData){
    dispatch(setHelperId(editData.id));
  }
  

  useEffect(() => {
    console.log(editData);
    setGroup(editData?.group);
    setTitle(editData?.title);
    setDescription(editData?.description);
    setDate(editData?.date);
    setRemindMe(editData?.remindMe);
    setPriority(editData?.priority);
  }, []);


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTodo(editData.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      group,
      title,
      description,
      date,
      priority,
      remindMe
    };
    console.log(todo);

    editData
      ? dispatch(editToDo({ ...todo, id: editData.id }))
      : dispatch(addTodo(todo));
  };

  return (
    <div className="addTask">
      <form>
        <select
          className="group customArrow"
          name="group"
          id=""
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option selected>Group</option>
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
          cols="40"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />

        <div>
          <label htmlFor="dueDate">
            <CalendarMonth className="icon" /> Add due date
          </label>
          <input
            type="date"
            className="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="remind">
            <NotificationsNone className="icon" /> Remind me at
          </label>
          <input
            type="time"
            className="time"
            value={remindMe}
            onChange={(e) => setRemindMe(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="priority">
            <FlagOutlined className="icon" />
            Priority
          </label>
          <select
            name=""
            id=""
            className="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option selected>Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </form>
      <div className="footer">
        <div className="btn save-btn" onClick={handleSubmit}>
          <p>Save</p>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
