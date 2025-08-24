import { configureStore} from "@reduxjs/toolkit";
import todosReducer from './features/counterSlice'


export const store = configureStore({
    reducer:{
        todos:todosReducer
    },
});