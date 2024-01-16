import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
  todos: [
    {
      id: nanoid(),
      title: "Learn React ",
      description: "description",
      priority: "high",
      completed: true,
      date: "2024-01-07",
      remindMe: "10:00",
      group: "Personal",
    },
    {
      id: nanoid(),
      title: "Learn PHP ",
      description: "description",
      priority: "high",
      completed: false,
      date: "2024-01-07",
      remindMe: "10:00",
      group: "Personal",
    },
    {
      id: nanoid(),
      title: "Learn C ",
      description: "description",
      priority: "high",
      completed: false,
      date: "2024-01-07",
      remindMe: "10:00",
      group: "Personal",
    },
    {
      id: nanoid(),
      title: "Learn Js ",
      description: "description",
      priority: "low",
      completed: true,
      date: "2024-01-07",
      remindMe: "15:00",
      group: "Personal",
    },
    {
      id: nanoid(),
      title: "Learn Python ",
      description: "description",
      priority: "medium",
      completed: true,
      date: "2024-01-07",
      remindMe: "10:00",
      group: "Personal",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        date: action.payload.date,
        group: action.payload.group,
        remindMe: action.payload.remindMe,
        completed: false,
      };

      state.todos.push(todo);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    editToDo: (state, action) => {
      let index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index] = action.payload;
    },

    setToDoState: (state, action) => {
      let index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].completed = action.payload.completed;
    },

    swapTask: (state, action) => {
      const { active, over } = action.payload;
      const activeIndex = state.todos.findIndex((e) => e.id === active);
      const [movedTask] = state.todos.splice(activeIndex, 1);
      const overIndex = state.todos.findIndex((e) => e.id === over);
      if (activeIndex > overIndex) {
        state.todos.splice(overIndex, 0, movedTask);
      } else {
        state.todos.splice(overIndex + 1, 0, movedTask);
      }
    },
  },
});

export const getFilteredToDo = (state, status, search) => {
  search = search ? search : "";
  // console.log(status, search);
  let data = [];
  switch (status) {
    case "active":
      data = state.filter(
        (todo) => !todo.completed && todo.title?.includes(search)
      );
      break;

    case "completed":
      data = state.filter(
        (todo) => todo.completed && todo.title?.includes(search)
      );
      break;

    case "all":
      data = state.filter((todo) => todo.title?.includes(search));
      break;
  }

  return data;
};

export const {
  addTodo,
  removeTodo,
  editToDo,
  setToDoState,
  setHelperId,
  swapTask,
} = todoSlice.actions;

export default todoSlice.reducer;
