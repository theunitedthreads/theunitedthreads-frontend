import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagtypes";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/message/upload-image",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.messages],
    }),
  }),
});

export const { useUploadImageMutation } = messageApi;
