import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_AD } from "../../../api/api";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";

export const adsApi = createApi({
  reducerPath: "AdsApi",
  //   tagTypes: ["Ads"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: (token: string) => ({
        url: GET_AD,
        method: "POST",
        body: {
          classification_id: 1,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      //   providesTags: ["Ads"],
    }),
  }),
});

export const { useGetAllAdsQuery } = adsApi;
