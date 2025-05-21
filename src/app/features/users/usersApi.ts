import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  ADD_ADMIN_SUPER,
  CHANGE_STATUS_USER_SUPER,
  DELETE_USERS_SUPER,
  GET_ALL_USERS_SUPER,
  UPDATE_USERS_SUPER,
} from "../../../api/api";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";

export interface Iusers {
  token: string;
  user_type: "merchant" | "user";
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  region_id: string;
  secondary_address: string;
  phone_number: string;
  identification_papers: File[];
}
export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token: string) => ({
        url: GET_ALL_USERS_SUPER,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          "Content-Type": "text/javascript",
        },
      }),
      providesTags: ["users"],
    }),

    addUsers: builder.mutation({
      query: ({
        token,
        email,
        first_name,
        identification_papers,
        last_name,
        phone_number,
        region_id,
        secondary_address,
        user_type,
      }: Iusers) => ({
        url: ADD_ADMIN_SUPER,
        method: "POST",
        body: {
          email,
          first_name,
          identification_papers,
          last_name,
          phone_number,
          region_id,
          secondary_address,
          user_type,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          "Content-Type": "text/javascript",
        },
      }),
      invalidatesTags: ["users"],
    }),
    editUsers: builder.mutation({
      query: ({
        token,
        user_id,
        email,
        first_name,
        identification_papers,
        last_name,
        phone_number,
        region_id,
        secondary_address,
        user_type,
      }: Iusers) => ({
        url: UPDATE_USERS_SUPER,
        method: "POST",
        body: {
          user_id,
          email,
          first_name,
          identification_papers,
          last_name,
          phone_number,
          region_id,
          secondary_address,
          user_type,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          "Content-Type": "text/javascript",
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "users", id: result.id }] : ["users"],
    }),
    deleteUsers: builder.mutation({
      query: ({ token, user_id }: Iusers) => ({
        url: DELETE_USERS_SUPER,
        method: "POST",
        body: {
          user_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          "Content-Type": "text/javascript",
        },
      }),
      invalidatesTags: ({ user_id }) => [{ type: "users", user_id }],
    }),
    changeUserStatus: builder.mutation({
      query: ({ token, user_id }: Iusers) => ({
        url: CHANGE_STATUS_USER_SUPER,
        method: "POST",
        body: {
          user_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          "Content-Type": "text/javascript",
        },
      }),
      invalidatesTags: ({ user_id }) => [{ type: "users", user_id }],
    }),
  }),
});

export const {
  useAddUsersMutation,
  useChangeUserStatusMutation,
  useDeleteUsersMutation,
  useEditUsersMutation,
  useGetAllUsersQuery,
} = usersApi;
