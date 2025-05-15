import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { decryptToken } from "../../../../Cookies/CryptoServices/crypto";
import {
  ADD_CITIES,
  DELETE_CITIES,
  GET_ALL_CITIES,
  UPDATE_CITIES,
} from "../../../../api/api";
export interface Icities {
  name: string;
  token: string;
  id?: string | number;
  country_id?: string | number;
}
export const citiesApi = createApi({
  reducerPath: "citiesApi",
  tagTypes: ["cities"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCities: builder.query({
      query: () => ({
        url: GET_ALL_CITIES,
      }),
      providesTags: ["cities"],
    }),
    addCities: builder.mutation({
      query: ({ name, country_id, token }: Icities) => ({
        url: ADD_CITIES,
        method: "POST",
        body: {
          city_name: name,
          country_id: country_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["cities"],
    }),
    editCities: builder.mutation({
      query: ({ name, token, id, country_id }: Icities) => ({
        url: UPDATE_CITIES,
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
        result ? [{ type: "cities", id: result.id }] : ["cities"],
    }),
    deleteCities: builder.mutation({
      query: ({ token, id }: Icities) => ({
        url: DELETE_CITIES,
        method: "POST",
        body: {
          city_id: `${id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ({ id }) => [{ type: "cities", id }],
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
  useAddCitiesMutation,
  useDeleteCitiesMutation,
  useEditCitiesMutation,
} = citiesApi;
