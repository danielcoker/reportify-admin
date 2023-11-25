// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // plugins: ["~/plugins/local-storage", "~/plugins/axios"],
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  runtimeConfig: {
    apiSecret: "",
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@kevinmarrec/nuxt-pwa",
    "@vueuse/nuxt",
  ],
  // imports: {
  //   dirs: [
  //     "store",
  //   ]
  // },
  pwa: {
    workbox: {
      enabled: false,
    },
  },
});
