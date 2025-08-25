import { configureStore } from '@reduxjs/toolkit'
import todoSlice from "./toDoList/toDoListSlice"


export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
})