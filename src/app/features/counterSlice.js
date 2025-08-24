import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) :
 { todos: [] }

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
      addTodo:(state, {payload})=>{
        state.todos.push(payload)
      },
       removeTodo:(state, {payload})=>{
        state.todos= state.todos.filter((todo)=>todo.id== payload)
      }
    },
});

export const { addTodo} = todosSlice.actions;
export default todosSlice.reducer;