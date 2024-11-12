import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.orders],
    }),

    getOrders: builder.query({
      query: (params) => ({
        url: "/order/my-orders",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.orders],
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/my-single-order/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
} = orderApi;
