import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";
import { ACCEPT_ORDER, CANCEL_ORDER, GET_ORDER } from "../../../api/api";

export interface Iorders {
  property_id: string;
  token: string;
  reply: string;
}
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["orders"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllorders: builder.query({
      query: (token: string) => ({
        url: GET_ORDER,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["orders"],
    }),
    acceptOrders: builder.mutation({
      query: ({ property_id, token }: Iorders) => ({
        url: ACCEPT_ORDER,
        method: "POST",
        body: {
          classification_id: 1, // in futuer when add classification
          property_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["orders"],
    }),
    cancelOrders: builder.mutation({
      query: ({ property_id, reply, token }: Iorders) => ({
        url: CANCEL_ORDER,
        method: "POST",
        body: {
          classification_id: 1, // in futuer when add classification
          property_id,
          reply,
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
