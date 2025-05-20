import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Iprops {
  new_complaints: number;
}

const initialState: Iprops = {
  new_complaints: 0,
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    setNewComplaints: (state, action: PayloadAction<number>) => {
      state.new_complaints = action.payload;
    },
  },
});

export const { setNewComplaints } = complaintsSlice.actions;
export default complaintsSlice.reducer;
