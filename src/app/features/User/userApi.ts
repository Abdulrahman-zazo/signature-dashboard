import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LOGIN } from "../../../api/api";

interface Iuserdata {
  email: string;
  password: string;
}
export const userApi = createApi({
  reducerPath: "auth",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }: Iuserdata) => ({
        url: LOGIN,
        method: "POST",
        body: { email: email, password: password },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation } = userApi;
