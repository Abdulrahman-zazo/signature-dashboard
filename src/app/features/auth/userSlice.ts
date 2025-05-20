import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  image_url?: string;
  permissions?: string[];
  code?: number;
  is_send?: boolean;
}

const initialState: AuthState = {
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  image_url: "",
  permissions: [],
  is_send: false,
  code: undefined,
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
    verificationCodeAction: (state, action: PayloadAction<AuthState>) => {
      const { code } = action.payload;
      return {
        ...state,
        code,
      };
    },
    sendcodeAction: (state) => {
      state.is_send = !state.is_send;
    },
  },
});

export const {
  loginAction,
  logoutAction,
  verificationCodeAction,
  sendcodeAction,
} = authSlice.actions;
export default authSlice.reducer;
