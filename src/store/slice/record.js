import { createSlice } from "@reduxjs/toolkit";
import {
  getExample,
  createExample,
  updateExample,
  deleteExample,
} from "@/services/example";

const initRecords = [
  {
    id: 1,
    memo: "烤肉聚餐",
    dollars: 500,
    label: "eat",
    createDate: Date.now(),
  },
  {
    id: 2,
    memo: "肯尼掰掰聚會",
    dollars: 25000,
    label: "party",
    createDate: Date.now(),
  },
];

export const recordSlice = createSlice({
  name: "record",
  initialState: initRecords,
  reducers: {
    getRecord(state) {
      // get all records
      getExample();
    },
    addRecord(state, action) {
      // add new record
      const newData = { ...action.payload.record, id: Date.now() };
      createExample(newData);
    },
    updateRecord(state, action) {
      // update data
      updateExample(action.payload.record);
    },
    deleteRecord(state, action) {
      // delete a record
      deleteExample(action.payload.record.id);
    },
  },
});

export const { getRecord, addRecord, updateRecord, deleteRecord } =
  recordSlice.actions;
export const selectRecords = (state) => state.record;
export default recordSlice.reducer;
