import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const libraryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLibrary: builder.query({
      query: () => ({
        url: "/library/libraries?limit=999999",
        method: "GET",
      }),

      providesTags: [tagTypes.library],
    }),
  }),
});

export const { useGetLibraryQuery } = libraryApi;
