import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../interfaces";

const initialState = {
  currentTask: {} as ITask,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentTask: (state, { payload }) => {
      state.currentTask = payload;
    },
  },
});

export const { setCurrentTask } = tasksSlice.actions;

export default tasksSlice.reducer;
