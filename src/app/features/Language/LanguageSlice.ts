import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../../i18";

export const languageSlice = createSlice({
  name: "language",
  initialState: localStorage.getItem("i18nextLng") || "en",
  reducers: {
    // Store language and change
    changeLangAction: (state, action: PayloadAction<string>) => {
      i18n.changeLanguage(action.payload);
      localStorage.setItem("i18nextLng", action.payload);
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLangAction } = languageSlice.actions;

export default languageSlice.reducer;
