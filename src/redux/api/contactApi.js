import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (data) => ({
        url: "/user/send-mail",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMailMutation } = contactApi;
