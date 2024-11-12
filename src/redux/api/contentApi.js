import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (params) => ({
        url: "/settings/get-settings",
        params,
      }),
    }),
  }),
});

export const { useGetContentQuery } = contentApi;
