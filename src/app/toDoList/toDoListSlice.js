import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.todos.push(payload);

      localStorage.setItem("todo", JSON.stringify(state.todos));
    },
    remove: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      localStorage.setItem("todo", JSON.stringify(state.todos));
    },

    toggle: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todo", JSON.stringify(state.todos));
    },
  },
});

export const { add, remove, toggle } = todoSlice.actions;
export default todoSlice.reducer;
