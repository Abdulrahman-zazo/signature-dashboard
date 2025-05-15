import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";
import { ACCEPT_ORDER, CANCEL_ORDER, GET_ORDER } from "../../../api/api";

export interface Iorders {
  name: string;
  token: string;
  id?: string | number;
}
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["orders"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllorders: builder.query({
      query: () => ({
        url: GET_ORDER,
      }),
      providesTags: ["orders"],
    }),
    acceptOrders: builder.mutation({
      query: ({ name, token }: Iorders) => ({
        url: ACCEPT_ORDER,
        method: "POST",
        body: {
          country_name: name,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["orders"],
    }),
    cancelOrders: builder.mutation({
      query: ({ name, token }: Iorders) => ({
        url: CANCEL_ORDER,
        method: "POST",
        body: {
          country_name: name,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllordersQuery,
  useAcceptOrdersMutation,
  useCancelOrdersMutation,
} = ordersApi;

// GET_ORDER_BY_CLASSIFICATION in future
