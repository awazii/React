import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: nanoid(), text: "Learn Redux Toolkit", completed: false },
    { id: nanoid(), text: "Build a Redux app", completed: false }
];
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addtodo(state, action) {
            state.push({ id: nanoid(), text: action.payload, completed: false })
        },
        removetodo(state, action) {
            const index = state.findIndex(todo => todo.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        updatetodo(state, action) {
            const todo = state.find(t => t.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }

        }
    }
})
export const { addtodo, removetodo, updatetodo } = todoSlice.actions;
export default todoSlice.reducer;
// export const todoReducer = todoSlice.reducer; 
/*
we can also export the reducer like this then 
import { todoReducer } from "../features/todo/todoSlice";
and use it in the store.js file like this
todos: todoReducer,
that way we can have multiple reducers in the same file
*/