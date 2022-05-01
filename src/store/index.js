import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/exampleTodo";
import recordReducer from "./slice/record";

export default configureStore({
  reducer: {
    todo: todoReducer,
    record: recordReducer,

    // You can add more reducer at here..
  },
});
