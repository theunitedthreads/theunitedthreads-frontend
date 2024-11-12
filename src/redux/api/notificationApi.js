import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (query) => ({
        url: "/notification/notifications",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.notifications],
    }),

    markRead: builder.mutation({
      query: () => ({
        url: "/notification/seen",
        method: "PATCH",
      }),

      invalidatesTags: [tagTypes.notifications],
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkReadMutation } =
  notificationApi;
