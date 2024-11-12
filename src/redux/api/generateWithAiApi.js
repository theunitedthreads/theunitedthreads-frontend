import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const generateWithAiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    generateWithAi: build.mutation({
      query: (data) => ({
        url: "/ai/generate-image",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.aiGeneratedImage],
    }),
  }),
});

export const { useGenerateWithAiMutation } = generateWithAiApi;
