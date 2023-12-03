import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export const useCustomFetch = (request, opts) => {
  const config = useRuntimeConfig();

  const StoreAuth = useAuthStore();
  const { accessToken } = storeToRefs(StoreAuth);

  const excludedURLs = [
    "/users/auth/sign-in"
  ]

  return useFetch(request, {
    baseURL: config.public.API_BASE_URL,
    key: JSON.stringify((Math.random() * 11223).toString()),
    onRequest({ request, options }) {
      // Set the request headers
      options.headers = options.headers || {};

      if (!excludedURLs.includes(request) && accessToken.value) {
        options.headers["authorization"] = `Bearer ${accessToken.value}`;
      }
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      // if (response.status === 401 || response.status === 404) {
      //     StoreAuth.toggleAuthState(false)
      //     alert('')
      // }
      // console.log(response);
      return response.data;
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      if (response.status === 401 || response.status === 404) {
        StoreAuth.toggleAuthState(false);
      }

      return response;
    },
    ...opts,
  });
};
