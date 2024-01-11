import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: nanoid(),
      title: "Learn React ",
      description: "description",
      priority: 1,
      completed: false,
      date: "09-01-2024",
      group: "Personal",
    },
    {
      id: nanoid(),
      title: "Learn Js ",
      description: "description",
      priority: 1,
      completed: false,
      date: "09-01-2024",
      group: "Personal",
    },
    {
      id: nanoid(),
      title: "Learn React ",
      description: "description",
      priority: 1,
      completed: false,
      date: "09-01-2024",
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
  },
});



export const getFilteredToDo = (state, status) => {
  let data = [];
  switch (status) {
    case "active":
      data = state.filter((todo) => todo.completed);
      break;

    case "completed":
      data = state.filter((todo) => !todo.completed);
      break;

  }
  return data;
};

export const { addTodo, removeTodo, editToDo, setToDoState } =
  todoSlice.actions;

export default todoSlice.reducer;
