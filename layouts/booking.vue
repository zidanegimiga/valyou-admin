<template>
  <div class="main__Bar">
    <LeftSidebar />
    <div class="topBar_wrap">
      <div class="topBar">
        <TabMenu :model="tabs" class="nav_tab_menu" />
        <div class="ml-auto">
          <TopBar />
        </div>
      </div>
    </div>
    <div class="flex-1 main_body">
      <slot />
    </div>
  </div>
</template>

<script>
//DIALOGS
export default {
  name: "BookingLayout",
  data() {
    return {
      tabs: [
        { label: "Insights", to: "/bookings/insights" },
        { label: "Bookings", to: "/bookings" },
      ],
    }
  },
}
</script>

<style lang="scss">
.p-reset {
  border-bottom: 0 !important;
  background-color: transparent;
}
</style>
