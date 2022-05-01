import { createSlice } from "@reduxjs/toolkit";

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
      // TODO fetch data
    },
    addRecord(state, action) {
      // add new record
      state.initRecords.push({
        id: Date.now(),
        memo: action.payload,
      });
    },
    deleteRecord(state, action) {
      // delete a record
      state.slice();
    },
  },
});

export const { getRecord, addRecord, deleteRecord } = recordSlice.actions;
export const selectRecords = (state) => state.record;
export default recordSlice.reducer;
