import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.users, tagTypes.auth],
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.auth, tagTypes.user],
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.otp],
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.otp],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: [tagTypes.auth],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.auth],
    }),
  }),

  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
