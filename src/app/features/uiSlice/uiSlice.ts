import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  collapsed: boolean;
}

const initialState: AuthState = {
  collapsed: false,
};

const uiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    collapsedAction: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { collapsedAction } = uiSlice.actions;
export default uiSlice.reducer;
