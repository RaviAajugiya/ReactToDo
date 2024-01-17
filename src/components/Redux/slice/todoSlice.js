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
  filterTodo: {
    status: "all",
    search: "",
    group: "",
    date: "",
  },
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

    setFilterStatus: (state, action) => {
      state.filterTodo.status = action.payload;
    },

    setFilterSearch: (state, action) => {
      state.filterTodo.search = action.payload;
    },

    setFilterGroup: (state, action) => {
      state.filterTodo.group = action.payload;
    },

    setFilterDate: (state, action) => {
      state.filterTodo.date = action.payload;
    },

    clearFilters: (state) => {
      state.filterTodo = {
        status: "all",
        search: "",
        group: "",
        date: "",
      };
    },
  },
});

export const getFilteredToDo = (state) => {
  const { status, search, group, date } = state.filterTodo;

  let data = state.todos.filter((todo) => {
    return (
      (status === "all" ||
        (status === "pending" && !todo.completed) ||
        (status === "completed" && todo.completed)) &&
      todo.title?.includes(search) &&
      (group === "" || todo.group === group) &&
      (date === "" || todo.date === date)
    );
  });

  return data;
};

export const {
  addTodo,
  removeTodo,
  editToDo,
  setToDoState,
  setHelperId,
  swapTask,
  setFilterStatus,
  setFilterSearch,
  setFilterGroup,
  setFilterDate,
  clearFilters,
} = todoSlice.actions;

export default todoSlice.reducer;
