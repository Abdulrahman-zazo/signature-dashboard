import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CHANGE_PASSWORD,
  CODE_TESTER,
  FORGET_PASSWORD,
  LOGIN,
  LOGOUT,
  RESEND_CODE,
  USER_INFORMATION,
} from "../../../api/api";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";

interface Iuserdata {
  email: string;
  password: string;
}
interface IforgetPassword {
  email: string;
  password?: string;
  confirmationpassword?: string;
  code?: number;
}
export const userApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getuserInformation: builder.query({
      query: (token: string) => ({
        url: USER_INFORMATION,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["auth"],
    }),
    login: builder.mutation({
      query: ({ email, password }: Iuserdata) => ({
        url: LOGIN,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: (token: string) => ({
        url: LOGOUT,
        method: "POST",
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["auth"],
    }),
    forgetpassword: builder.mutation({
      query: (email: string) => ({
        url: FORGET_PASSWORD,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["auth"],
    }),
    testCode: builder.mutation({
      query: ({ email, code }: IforgetPassword) => ({
        url: CODE_TESTER,
        method: "POST",
        body: { email, code },
      }),
      invalidatesTags: ["auth"],
    }),
    changepassword: builder.mutation({
      query: ({ email, password, confirmationpassword }: IforgetPassword) => ({
        url: CHANGE_PASSWORD,
        method: "POST",
        body: {
          email,
          new_password: password,
          new_password_confirmation: confirmationpassword,
        },
      }),
      invalidatesTags: ["auth"],
    }),
    resendCode: builder.mutation({
      query: ({ email }: Iuserdata) => ({
        url: RESEND_CODE,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetuserInformationQuery,
  useForgetpasswordMutation,
  useChangepasswordMutation,
  useResendCodeMutation,
  useTestCodeMutation,
  useLogoutMutation,
} = userApi;
