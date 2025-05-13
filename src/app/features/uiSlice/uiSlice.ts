import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  collapsed: boolean;
  DisplayDataAsCard: string;
}

const initialState: UiState = {
  collapsed: false,
  DisplayDataAsCard: "card",
};

const uiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    collapsedAction: (state) => {
      state.collapsed = !state.collapsed;
    },
    setDisplayDataAsCard: (state, action: PayloadAction<string>) => {
      state.DisplayDataAsCard = action.payload;
    },
  },
});

export const { collapsedAction, setDisplayDataAsCard } = uiSlice.actions;
export default uiSlice.reducer;
