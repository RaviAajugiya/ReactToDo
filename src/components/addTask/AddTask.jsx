import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Add, Delete, West } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editToDo, removeTodo, setAddTaskState } from "../Redux/slice/todoSlice";
import {
  NotificationsNone,
  CalendarMonth,
  FlagOutlined,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import showNotification from "../../services/notification";
import Button from "../button/Button";

function AddTask() {
  const [group, setGroup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [remindMe, setRemindMe] = useState("");
  const [priority, setPriority] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();
  const editData = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(editData);
    setGroup(editData?.group);
    setTitle(editData?.title);
    setDescription(editData?.description);
    setDate(editData?.date);
    setRemindMe(editData?.remindMe);
    setPriority(editData?.priority);
  }, [editData]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTodo(editData.id));
    navigate('/');
  };

  const handleSubmit = (e) => {
    if (
      !group ||
      !title.trim() ||
      !description.trim() ||
      !date ||
      !remindMe ||
      !priority
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    e.preventDefault();
    const todo = {
      group,
      title,
      description,
      date,
      priority,
      remindMe,
    };
    console.log(todo);

    if (editData) {
      dispatch(editToDo({ ...todo, id: editData.id }));
      toast.success(`"${todo.title}" edited successfully `);
    } else {
      dispatch(addTodo(todo));
      toast.success(`"${todo.title}" added successfully `);
    }

    if (todo.remindMe) {
      const remindTime = new Date(`${todo.date}T${todo.remindMe}`);
      const currentTime = new Date();
      const timeoutDuration = remindTime - currentTime;
      console.log(timeoutDuration);

      setTimeout(() => {
        showNotification(`Reminder: ${todo.title}`, {
          body: `Don't forget to ${todo.title}`,
        });
      }, timeoutDuration);
    }

    setGroup("");
    setTitle("");
    setDescription("");
    setDate("");
    setRemindMe("");
    setPriority("");
    navigate("/");
  };

  return (
    <>
      <div className="addTask fade-in">
        <div className="addTask-header">
          <div>
            <Link to="/">
              <West className="icon arrow-icon" />
            </Link>
            <span>{id ? "Edit" : "Add"} Task</span>
          </div>
          {id ? <Delete className="icon" onClick={handleDelete} /> : null}
          {/* </div> */}
          {/* <Delete className="icon"  onClick={handleDelete}/> */}
        </div>
        <form onSubmit={handleSubmit}>
          <select
            required
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
            required
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            required
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
              required
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
              required
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
              required
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
          <Link to="/" onClick={handleSubmit}>
            <Button text="Save" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default AddTask;
