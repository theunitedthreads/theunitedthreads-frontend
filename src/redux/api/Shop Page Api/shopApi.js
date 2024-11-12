import { tagTypes } from "@/redux/tagtypes";
import { baseApi } from "../baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all types of categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/category/all-categories",
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),

    getShopCategories: builder.query({
      query: () => ({
        url: "/category/categories",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: [tagTypes.shopCategories],
    }),

    getShopProductSizes: builder.query({
      query: () => ({
        url: "/product/get-size",
        method: "GET",
      }),

      transformResponse: (res) => res.data,
      providesTags: [tagTypes.shopProductSizes],
    }),

    getShopProducts: builder.query({
      query: (params) => ({
        url: "/product/products",
        method: "GET",
        params,
      }),

      providesTags: [tagTypes.shopProducts],
    }),

    getSingleShopProduct: builder.query({
      query: (id) => ({
        url: `/product/single-product/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.shopProduct],
    }),

    getShopProductReviews: builder.query({
      query: (params) => ({
        url: `/review/reviews`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.shopProductReviews],
    }),

    createShopProductReview: builder.mutation({
      query: (data) => ({
        url: "/review/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.shopProductReviews],
    }),

    updateShopProductReview: builder.mutation({
      query: (data) => ({
        url: `/review/update-review/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: [tagTypes.shopProductReviews],
    }),

    deleteShopProductReview: builder.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shopProductReviews],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetShopCategoriesQuery,
  useGetShopProductSizesQuery,
  useGetShopProductsQuery,
  useGetSingleShopProductQuery,
  useGetShopProductReviewsQuery,
  useCreateShopProductReviewMutation,
  useUpdateShopProductReviewMutation,
  useDeleteShopProductReviewMutation,
} = shopApi;
