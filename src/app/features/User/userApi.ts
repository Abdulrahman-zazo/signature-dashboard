import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LOGIN, USER_INFORMATION } from "../../../api/api";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";

interface Iuserdata {
  email: string;
  password: string;
}
export const userApi = createApi({
  reducerPath: "auth",
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
  }),
});

export const { useLoginMutation, useGetuserInformationQuery } = userApi;
