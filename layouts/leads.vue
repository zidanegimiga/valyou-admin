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
//DIALOGSist
export default {
  name: "LeadsLayout",
  data() {
    return {
      tabs: [
        { label: "Dashboard (Ad)", to: "/leads" },
        { label: "Leads", to: "/leads/leads" },
        { label: "Discarded Leads", to: "/leads/discarded-leads" },
        // {
        //   label: "Pipeline",
        //   to: "/leads/pipeline",
        // },
        {
          label: "Activities",
          to: "/leads/activities",
        },
        // {
        //   label: "Booking Calendar",
        //   to: "/leads/booking-calendar",
        // },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
