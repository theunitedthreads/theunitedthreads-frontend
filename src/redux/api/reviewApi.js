import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (params) => ({
        url: "/review/reviews",
        method: "GET",
        params: params,
      }),

      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewApi;
