import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADD_COUNTRIES,
  DELETE_COUNTRIES,
  GET_ALL_COUNTRIES,
  UPDATE_COUNTRIES,
} from "../../../../api/api";
import { decryptToken } from "../../../../Cookies/CryptoServices/crypto";
export interface ICountries {
  name: string;
  token: string;
  id?: string | number;
}
export const countriesApi = createApi({
  reducerPath: "CountriesApi",
  tagTypes: ["Countries"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => ({
        url: GET_ALL_COUNTRIES,
      }),
      providesTags: ["Countries"],
    }),
    addCountries: builder.mutation({
      query: ({ name, token }: ICountries) => ({
        url: ADD_COUNTRIES,
        method: "POST",
        body: {
          country_name: name,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: [{ type: "Countries", id: "LIST" }],
    }),
    editCountries: builder.mutation({
      query: ({ name, token, id }: ICountries) => ({
        url: UPDATE_COUNTRIES,
        method: "POST",
        body: {
          country_name: name,
          id: id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Countries", id }],
    }),
    deleteCountries: builder.mutation({
      query: ({ token, id }: ICountries) => ({
        url: DELETE_COUNTRIES,
        method: "POST",
        body: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Countries", id }],
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useAddCountriesMutation,
  useEditCountriesMutation,
  useDeleteCountriesMutation,
} = countriesApi;
// tagTypes: ['Posts'],

// getPosts: builder.query({
//   query: () => '/posts',
//   providesTags: (result = []) =>
//     result.map(({ id }) => ({ type: 'Posts' as const, id })).concat({ type: 'Posts', id: 'LIST' }),
// }),

// addPost: builder.mutation({
//   query: (newPost) => ({
//     url: '/posts',
//     method: 'POST',
//     body: newPost,
//   }),
//   invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
// }),

// updatePost: builder.mutation({
//   query: ({ id, ...patch }) => ({
//     url: `/posts/${id}`,
//     method: 'PATCH',
//     body: patch,
//   }),
//   invalidatesTags: (_res, _err, { id }) => [{ type: 'Posts', id }],
// }),

// deletePost: builder.mutation({
//   query: (id) => ({
//     url: `/posts/${id}`,
//     method: 'DELETE',
//   }),
//   invalidatesTags: (_res, _err, id) => [{ type: 'Posts', id }, { type: 'Posts', id: 'LIST' }],
// }),
