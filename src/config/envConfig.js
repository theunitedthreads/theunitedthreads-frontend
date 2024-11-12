export const getBackendBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_BASEURL;
};

// export const getBackendImageUrl = () => {
//   return process.env.NEXT_PUBLIC_IMAGE_URL;
// };

// export const getStripePublishableKey = () => {
//   return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// };

export const getSocketEndpoint = () => {
  return process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;
};
