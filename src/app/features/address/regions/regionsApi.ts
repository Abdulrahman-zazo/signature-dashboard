import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { decryptToken } from "../../../../Cookies/CryptoServices/crypto";
import {
  ADD_REGIONS,
  DELETE_REGIONS,
  GET_ALL_REGIONS_BY_CITIESID,
  UPDATE_REGIONS,
} from "../../../../api/api";

export interface Iregions {
  name: string;
  token: string;
  id?: string | number;
  city_id?: string | number;
}
export const regionsApi = createApi({
  reducerPath: "regionsApi",
  tagTypes: ["regions"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllRegionsByCity: builder.query({
      query: (city_id) => ({
        url: `${GET_ALL_REGIONS_BY_CITIESID}/ ${city_id}`,
      }),
      providesTags: ["regions"],
    }),
    addRegions: builder.mutation({
      query: ({ name, city_id, token }: Iregions) => ({
        url: ADD_REGIONS,
        method: "POST",
        body: {
          city_name: name,
          city_id: city_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["regions"],
    }),
    editRegions: builder.mutation({
      query: ({ name, token, id, city_id }: Iregions) => ({
        url: UPDATE_REGIONS,
        method: "POST",
        body: {
          region_name: name,
          region_id: `${id}`,
          city_id: `${city_id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "regions", id: result.id }] : ["regions"],
    }),
    deleteRegions: builder.mutation({
      query: ({ token, id }: Iregions) => ({
        url: DELETE_REGIONS,
        method: "POST",
        body: {
          city_id: `${id}`,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ({ id }) => [{ type: "regions", id }],
    }),
  }),
});

export const {
  useGetAllRegionsByCityQuery,
  useAddRegionsMutation,
  useEditRegionsMutation,
  useDeleteRegionsMutation,
} = regionsApi;
