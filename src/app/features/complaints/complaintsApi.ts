import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADD_REPLAY_COMPLAINTS, GET_COMPLAINTS } from "../../../api/api";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";

export interface Icomplaints {
  reply: string;
  token: string;
  complaint_id: string;
  complaint_image?: HTMLImageElement;
}
export const complaintsApi = createApi({
  reducerPath: "complaintsApi",
  tagTypes: ["complaints"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllComplaints: builder.query({
      query: (token: string) => ({
        url: GET_COMPLAINTS,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["complaints"],
    }),
    addComplaints: builder.mutation({
      query: ({
        complaint_id,
        reply,
        complaint_image,
        token,
      }: Icomplaints) => ({
        url: ADD_REPLAY_COMPLAINTS,
        method: "POST",
        body: {
          complaint_id,
          reply,
          complaint_image,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["complaints"],
    }),
  }),
});

export const { useGetAllComplaintsQuery, useAddComplaintsMutation } =
  complaintsApi;
