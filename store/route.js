import { defineStore } from "pinia";

export const useRouteStore = defineStore("route", {
  state: () => ({
    to: [],
    from: [],
  }),
  getters: {
    getToRoute() {
      return this.to;
    },
    getFromRoute() {
      return this.from;
    },
  },
  actions: {
    setRoutes(payload) {
      const { to, from } = payload;
      this.to = to.fullPath.split("/");
      this.from = from.fullPath.split("/");
    },
  },
});
