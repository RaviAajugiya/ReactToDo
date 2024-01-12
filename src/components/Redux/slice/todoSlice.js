import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: nanoid(),
      title: "Learn React ",
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
      title: "Learn React ",
      description: "description",
      priority: "medium",
      completed: false,
      date: "2024-01-07",
      remindMe: "10:00",
      group: "Personal",
    },
  ],
  helperId: '1',
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

    setHelperId: (state, action) => {
      // console.log(action.payload);
      state.helperId = action.payload;
    }
  },
});

export const getFilteredToDo = (state, status) => {
  let data = [];
  switch (status) {
    case "active":
      data = state.filter((todo) => !todo.completed);
      break;

    case "completed":
      data = state.filter((todo) => todo.completed);
      break;

    case "all":
      data = state;
      break;
  }
  return data;
};



export const { addTodo, removeTodo, editToDo, setToDoState, setHelperId } =
  todoSlice.actions;

export default todoSlice.reducer;
