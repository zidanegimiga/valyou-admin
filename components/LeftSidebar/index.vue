<template lang="">
  <div class="sidebar__wrap">
    <div class="flex align-items-center justify-content-center pt-2">
      <img src="@/assets/images/logo-clublab.png" />
    </div>
    <ul>
      <li
        v-for="(item, index) in leftSidebar"
        :key="index"
        :style="{
          color: getRouteTitle(item.title, index)
            ? item.activeColor
            : '#8D98A9',
          background: getRouteTitle(item.title, index)
            ? getBgColor(item.activeColor)
            : 'transparent',
        }"
        @click.prevent="goToRoute(item.route)"
      >
        <img alt="" :src="item.iconSrc" />
        <!-- <i class="pi pi-home"></i> -->
        <span
          :style="{
            color: getRouteTitle(item.title, index)
              ? item.activeColor
              : '#8D98A9',
          }"
          >{{ item.title }}</span
        >
      </li>
    </ul>
    <div class="sidebar__powered">
      <img alt="" src="@/assets/images/poweredby.svg" />
    </div>
  </div>
</template>
<script>
import { leftSidebar } from "@/config/leftSidebar";
export default {
  name: "Sidebar",
  props: {
    brandLogo: {
      type: String,
      default: "@/assets/images/sidebar/logo-clublab.png",
    },
  },
  data() {
    return {
      leftSidebar,
      path: "",
      items: [
        {
          title: "Dashboard",
          route: "/dashboards",
          activeColor: "#3494FF",
          key: "dashboard",
          iconSrc: "/icons/dashboard.svg",
        },
        {
          title: "Marketing",
          route: "/marketing",
          activeColor: "#F3654A",
          key: "marketing",
          iconSrc: "/icons/marketing.svg",
        },
        {
          title: "Leads",
          route: "/leads",
          activeColor: "#895BF1",
          key: "leads",
          iconSrc: "/icons/leads.svg",
        },
        {
          title: "Bookings",
          route: "/bookings/insights",
          activeColor: "#1BD598",
          key: "bookings",
          iconSrc: "/icons/bookings.svg",
        },
        {
          title: "Memberships",
          route: "/memberships",
          activeColor: "#3494FF",
          key: "memberships",
          iconSrc: "/icons/memberships.svg",
        },
        {
          title: "Events",
          route: "/events",
          activeColor: "#FBB536",
          key: "events",
          iconSrc: "/icons/events.svg",
        },
        {
          title: "Pro Shop",
          route: "/pro-shop",
          activeColor: "#895BF1",
          key: "pro-shop",
          iconSrc: "/icons/pro-shop.svg",
        },
        {
          title: "Accounting",
          activeColor: "#3494FF",
          route: "/accounting",
          key: "accounting",
          iconSrc: "/icons/account.svg",
        },
        {
          title: "HRMS",
          route: "/hrms",
          activeColor: "#F3654A",
          key: "hrms",
          iconSrc: "/icons/hrms.svg",
        },

        {
          title: "Customers",
          route: "/customers",
          activeColor: "#895BF1",
          key: "customers",
          iconSrc: "/icons/customers.svg",
        },

        {
          title: "Settings",
          route: "/settings",
          activeColor: "#1BD598",
          key: "settings",
          iconSrc: "/icons/",
        },
      ],
    };
  },
  methods: {
    getRouteTitle(title, index) {
      if (title === "Dashboard" && !this.path.length && index === 0) {
        return true;
      }
      if (this.path.includes(title.toLowerCase())) {
        return true;
      }
      if (this.path.includes(this.leftSidebar[index].key)) {
        return true;
      }
      return false;
    },
    goToRoute(route) {
      this.$router.push(route);
    },
    getBgColor(color) {
      return color + 30;
    },
  },
  mounted() {
    this.path = this.$route.fullPath.split("/")[1];
  },
  watch: {
    $route(to, from) {
      this.path = to.fullPath.split("/")[1];
    },
  },
};
</script>
<style lang="scss">
$powered_height: 60px;
$brand_height: 80px;

.sidebar__wrap {
  background: #fff;
  // display: grid;
  // grid-template-rows: $brand_height 1fr $powered_height;

  ul {
    padding: 1rem;
    max-height: calc(100vh - ($powered_height + $brand_height));
    overflow: hidden;
    overflow-y: auto;
    flex: 1;

    li {
      list-style: none;
      padding: 1rem 0px;

      padding-left: 1rem;
      cursor: pointer;
      display: flex;
      column-gap: 0.8rem;
      align-items: center;

      span {
        color: #8D98A9;
        font-weight: 500;
      }

      border-radius: 16px;
    }
  }

  .sidebar__powered {
    display: flex;
    align-items: center;
    padding: 1rem;
    padding-left: 2rem;
  }

  max-height: 100vh;
  overflow: hidden;
}
</style>
