import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Istatistic {
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
}

const initialState: Istatistic = {
  min_price: 0,
  max_price: 10000000000,
  min_area: 0,
  max_area: 2000,
};

const satisticsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // collapsedAction: (state) => {
    //   state.collapsed = !state.collapsed;
    // },
    // setDisplayDataAsCard: (state, action: PayloadAction<string>) => {
    //   state.DisplayDataAsCard = action.payload;
    // },
  },
});

export const {} = satisticsSlice.actions;
export default satisticsSlice.reducer;
