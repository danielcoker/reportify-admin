import { defineStore } from "pinia";
import { useCustomFetch } from "~/composables/useCustomFetch";

const config = useRuntimeConfig();

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);
    const accessToken = ref("");
    const refreshToken = ref("");
    const userInfo = ref({});
    const userId = ref("");

    const login = async (payload: any) => {
      try {
        const { data, error, refresh }: any = await useCustomFetch(
          `/users/auth/sign-in`,
          {
            baseURL: config.public.API_BASE_URL,
            method: "POST",
            body: payload,
          }
        );

        if (error.value) {
          throw new Error(error.value);
        } else {
          isAuthenticated.value = true;
          accessToken.value = data.value.data.token;
          refreshToken.value = data.value.data.refresh;
          userInfo.value = data.value.data;
          userId.value = data.value.data.id;

          return data.value;
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    const logout = () => {
      isAuthenticated.value = false;
      accessToken.value = "";
      refreshToken.value = "";
      userInfo.value = {};
      userId.value = "";

      const cookie = useCookie("auth");
      cookie.value = null;
    };

    const toggleAuthState = (value: boolean) => {
      isAuthenticated.value = value;
    };

    return {
      login,
      logout,
      toggleAuthState,
      isAuthenticated,
      accessToken,
      refreshToken,
      userInfo,
      userId,
    };
  },
  {
    persist: true,
  }
);
