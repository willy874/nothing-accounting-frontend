import { createSlice } from "@reduxjs/toolkit";

const initTodos = {
  value: 0,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todolist: [
      { id: 1, name: "first todo on redux" },
      { id: 2, name: "second todo in list" },
    ],
  },
  reducers: {
    // props1 state, props2 action
    addTodo: (state, action) => {
      state.todolist.push({ id: Date.now(), name: action.payload });
    },
  },
});

export const { addTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todo;
export default todoSlice.reducer;
