import { tagTypes } from "@/redux/tagtypes";
import { baseApi } from "../baseApi";

const quoteProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuoteProducts: builder.query({
      query: (params) => ({
        url: "/quote-product/products",
        method: "GET",
        params,
      }),

      providesTags: [tagTypes.quoteProducts],
    }),

    getSingleQuoteProduct: builder.query({
      query: (productId) => ({
        url: `/quote-product/single-product/${productId}`,
        method: "GET",
      }),

      providesTags: [tagTypes.quoteProduct],
    }),

    getQuoteCategories: builder.query({
      query: () => ({
        url: "/quote-category/categories",
        method: "GET",
      }),

      providesTags: [tagTypes.quoteCategories],
    }),

    getQuoteSizes: builder.query({
      query: () => ({
        url: "/quote-product/get-size",
        method: "GET",
      }),
      providesTags: [tagTypes.quoteSizes],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetQuoteCategoriesQuery,
  useGetQuoteProductsQuery,
  useGetSingleQuoteProductQuery,
  useGetQuoteSizesQuery,
} = quoteProductsApi;
