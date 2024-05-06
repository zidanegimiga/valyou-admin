import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    // "@/assets/scss/reboot.scss", // for fix datatable in safari browser
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "@/assets/scss/global.scss",
    "@/assets/fonts/arial/style.css",
  ],
  build: {
    transpile: ["primevue"],
  },
  modules: ["@sidebase/nuxt-auth", "@pinia/nuxt", "@vueuse/nuxt"],

  imports: {
    dirs: ["@/stores"],
  },
  plugins: [
    "@/plugins/vue-query.ts",
    "@/plugins/vue-tel-input.js",
    "@/plugins/vue-slicksort.js",
    {
      src: "@/plugins/vue-pdf-embed.js",
      mode: "client",
    },
  ],
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  vite: {
    plugins: [
      svgLoader({
        // Your settings.
      }),
    ],
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://valyouapi-staging.devnhr.com",
    },
  },

  auth: {
    provider: {
      type: "local",
      pages: {
        login: "/login",
      },
      endpoints: {
        signIn: { path: "/admin/auth/login", method: "post" },
        signOut: { path: "/admin/auth/logout", method: "post" },
        // signUp: { path: "/register", method: "post" },
        getSession: {
          path: "/admin/user/get-auth-user",
          method: "get",
        },
      },
      token: {
        signInResponseTokenPointer: "/tokens/access/token",
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
    baseURL: process.env.BASE_URL,

    origin: process.env.ORIGIN,
    enableSessionRefreshPeriodically: false,
    enableSessionRefreshOnWindowFocus: true,
  },

  ssr: false,
  telemetry: false,
  devServer: {
    port: 3101,
  },
});
