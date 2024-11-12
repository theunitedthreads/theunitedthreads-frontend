import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (orderId) => ({
        url: `/payment/create-payment/${orderId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
