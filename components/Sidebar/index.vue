<template lang="">
  <div class="sidebar__wrap p-0 wrapper-column">
    <div class="item">
      <div class="sidebar__brand mt-2">
        <img
          src="/Valyou_logo.png"
          style="transform: scale(0.5) translate(-75px, 14px)"
        />
      </div>
    </div>

    <div class="item expand overflow-y-auto">
      <ul>
        <li
          class="p-2 mb-2 ml-1 mr-1"
          v-for="(item, index) in items"
          :key="index"
          :class="{disable : item.lock}"
          :style="{
            color: getRouteTitle(item.title, index)
              ? item.activeColor
              : '#626262',
            background: getRouteTitle(item.title, index)
              ? getBgColor(item.activeColor)
              : 'transparent',
          }"
          @click.prevent="goToRoute(item.route)"
        >
          <i class="pi pi-lock" v-if="item.lock"></i>
          <Image
            class="ml-1"
            :src="item.icon"
            width="25"
            style="transform: scale(0.8) translate(8px, 2px)"
            v-if="!item.lock"
          />
          <span
            class="ml-1"
            :style="{
              color: getRouteTitle(item.title, index)
                ? item.activeColor
                : '#626262',
            }"
            >{{ item.title }}</span
          >
        </li>
      </ul>
    </div>

    <div class="item">
      <div class="sidebar__powered"><Image src="/icons/powered.svg" /></div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"
import { inject } from "vue"
import { useRoute, useRouter } from "vue-router"

const items = ref([
  {
    title: "Dashboard",
    route: "/",
    activeColor: "#0A94FF",
    icon: "/icons/sidebar/dashboard.svg",
    key: "dashboard",
  },
  {
    title: "Customers",
    route: "/customers",
    activeColor: "#895BF1",
    key: "customers",
    icon: "/icons/sidebar/customers.svg",
  },

  {
    title: "Draw Manager",
    route: "/draw-manager/draw-listing",
    activeColor: "#F3654A",
    key: "draw_manager",
    icon: "/icons/sidebar/draw_manager.svg",
  },

  // {
  //   title: "Content Manager",
  //   route: "/content_manager",
  //   activeColor: "#1AD598",
  //   key: "content_manager",
  //   icon: "/icons/sidebar/content_manager.svg",
  //   lock: true,
  // },

  {
    title: "Marketing Campaigns",
    route: "/marketing_campaigns",
    activeColor: "#FFB536",
    key: "marketing_campaigns",
    icon: "/icons/sidebar/marketing_campaigns.svg",
    lock: false,
  },

  {
    title: "Products",
    route: "/products",
    activeColor: "#0090FF",
    key: "products",
    icon: "/icons/sidebar/products.svg",
  },

  {
    title: "Inventory",
    route: "/inventory/location",
    activeColor: "#F3654A",
    key: "inventory",
    icon: "/icons/sidebar/inventory.svg",
  },

  {
    title: "Orders",
    route: "/orders",
    activeColor: "#895BF1",
    key: "orders",
    icon: "/icons/sidebar/orders.svg",
  },

  {
    title: "Logistics",
    route: "/logistics",
    activeColor: "#F3654A",
    key: "logistics",
    icon: "/icons/sidebar/logistics.svg",
  },

  {
    title: "Accounting",
    route: "/accounting",
    activeColor: "#1AD598",
    key: "accounting",
    icon: "/icons/sidebar/accounting.svg",
    lock: true,
  },

  {
    title: "HRMS",
    route: "/hrms",
    activeColor: "#1AD598",
    key: "hrms",
    icon: "/icons/sidebar/hrms.svg",
    lock: true,
  },

  {
    title: "Settings",
    route: "/settings",
    activeColor: "#1AD598",
    key: "settings",
    icon: "/icons/sidebar/settings.svg",
  },
])

const route = useRoute()
const router = useRouter()

let path = ref(route.fullPath.split("/")[1])

watch(route, (to) => {
  path.value = to.fullPath.split("/")[1]
})

const getRouteTitle = (title, index) => {
  if (title === "Dashboard" && !path.value.length && index === 0) {
    return true
  }
  if (path.value.includes(title.toLowerCase())) {
    return true
  }
  if (path.value.includes(items.value[index].key)) {
    return true
  }
  return false
}
const forceRerender_tabs = inject("forceRerender")
const goToRoute = (route) => {
  router.push(route)
  forceRerender_tabs()
}

const getBgColor = (color) => {
  return color + 30
}
</script>

<style lang="scss">
$powered_height: 60px;
$brand_height: 80px;

.sidebar__wrap {
  background: #fff;

  ::-webkit-scrollbar {
    display: none;
  }

  // display: grid;
  // grid-template-rows: $brand_height 1fr $powered_height;
  ul {
    padding: 1rem;
    // max-height: calc(95vh - ($powered_height + $brand_height));
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    li {
      list-style: none;
      padding: 1rem 0px;
      padding-left: 1rem;
      cursor: pointer;
      display: flex;
      column-gap: 0.8rem;
      align-items: center;

      span {
        color: #737477;
        font-weight: 500;
      }

      border-radius: 10px;
    }
  }

  .sidebar__powered {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  max-height: 100vh;
  overflow: hidden;
}
.sidebar__brand {
  img {
    width: 100%;
    height: 100%;
  }
}

.sidebar__wrap {
  background: #fff;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: unset;
}
</style>
