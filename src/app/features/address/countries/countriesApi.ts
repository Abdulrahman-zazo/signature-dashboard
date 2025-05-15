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
      invalidatesTags: ["Countries"],
    }),
    editCountries: builder.mutation({
      query: ({ name, token, id }: ICountries) => ({
        url: UPDATE_COUNTRIES,
        method: "POST",
        body: {
          country_name: name,
          country_id: `${id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Countries", id: result.id }] : ["Countries"],
    }),
    deleteCountries: builder.mutation({
      query: ({ token, id }: ICountries) => ({
        url: DELETE_COUNTRIES,
        method: "POST",
        body: {
          country_id: `${id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Countries", id: result.id }] : ["Countries"],
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useAddCountriesMutation,
  useEditCountriesMutation,
  useDeleteCountriesMutation,
} = countriesApi;
