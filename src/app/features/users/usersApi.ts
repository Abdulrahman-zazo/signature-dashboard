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
  name: string;
  token: string;
  id?: string | number;
  country_id?: string | number;
}
export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: GET_ALL_USERS_SUPER,
      }),
      providesTags: ["users"],
    }),

    addUsers: builder.mutation({
      query: ({ name, country_id, token }: Iusers) => ({
        url: ADD_ADMIN_SUPER,
        method: "POST",
        body: {
          city_name: name,
          country_id: country_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["users"],
    }),
    editUsers: builder.mutation({
      query: ({ name, token, id, country_id }: Iusers) => ({
        url: UPDATE_USERS_SUPER,
        method: "POST",
        body: {
          city_name: name,
          city_id: `${id}`,
          country_id: `${country_id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "users", id: result.id }] : ["users"],
    }),
    deleteUsers: builder.mutation({
      query: ({ token, id }: Iusers) => ({
        url: DELETE_USERS_SUPER,
        method: "POST",
        body: {
          city_id: `${id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ({ id }) => [{ type: "users", id }],
    }),
    changeUserStatus: builder.mutation({
      query: ({ token, id }: Iusers) => ({
        url: CHANGE_STATUS_USER_SUPER,
        method: "POST",
        body: {
          city_id: `${id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ({ id }) => [{ type: "users", id }],
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
