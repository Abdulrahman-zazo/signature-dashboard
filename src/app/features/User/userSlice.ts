import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  image_url: string;
  permissions: string[];
}

const initialState: AuthState = {
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  image_url: "",
  permissions: [],
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<AuthState>) => {
      const {
        email,
        first_name,
        last_name,
        phone_number,
        image_url,
        permissions,
      } = action.payload;
      return {
        ...state,
        email,
        first_name,
        last_name,
        image_url,
        permissions,
        phone_number,
      };
    },
    logoutAction: () => {
      return initialState;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
