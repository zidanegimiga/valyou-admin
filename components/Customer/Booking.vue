<template lang="">
  <!-- data Table Booking -->
  <div class="mb-6">
    <!-- Bookings -->
    <div
      class="col-12 p-0 grid flex align-items-center justify-content-between"
    >
      <span class="small__text font-bold custom_text custom_spacing uppercase"
        >BOOKINGS</span
      >
    </div>
    <!-- Bookings Table -->
    <div class="col-12 p-0 mt-3 mb-7">
      <DataTable
        class="booking_table"
        :value="bookings"
        tableStyle="min-width:100%"
      >
        <Column header="Service Type" class="accent font-medium p-2">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.services"
              class="small__text font-medium spacing_none"
              >{{ slotProps.data.services }}</span
            >
            <span v-else class="small__text font-medium spacing_none">
              no data
            </span>
          </template>
        </Column>
        <Column header="Category" class="accent font-medium p-2">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.category"
              class="small__text font-medium spacing_none"
              >{{ slotProps.data.category }}</span
            >
            <span v-else class="small__text font-medium spacing_none">
              no data
            </span>
          </template></Column
        >
        <Column header="Source" class="accent font-medium p-2">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.source"
              class="small__text font-medium spacing_none"
              >{{ slotProps.data.source }}</span
            >
            <span v-else class="small__text font-medium spacing_none">
              no data
            </span>
          </template></Column
        >
        <Column header="Date" class="accent font-medium">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.createdAt"
              class="small__text font-medium spacing_none"
              >{{ slotProps.data.createdAt }}</span
            >
            <span v-else class="small__text font-medium spacing_none">
              no data
            </span>
          </template></Column
        >
        <Column header="Time" class="accent font-medium">
          <template #body="slotProps">
            <div
              class="flex flex-column gap-1"
              v-if="slotProps.data.start_time"
            >
              <span class="small__text font-medium spacing_none">{{
                slotProps.data.start_time
              }}</span>
              <span class="small__text font-medium spacing_none">{{
                slotProps.data.end_time
              }}</span>
            </div>
            <span v-else class="small__text font-medium spacing_none">
              no data
            </span>
          </template></Column
        >
        <Column field="status" header="Status" class="accent font-medium">
          <template #body="slotProps">
            <div class="flex align-items-center justify-content-between">
              <CustomTagRounded
                v-if="slotProps.data.status"
                class=""
                :color="fetchStyle(slotProps.data.status)"
                :value="slotProps.data.status"
              />
              <span v-else class="small__text font-medium spacing_none">
                no data
              </span>
              <i v-if="slotProps.data.status == 'booked'"
                class="p-ripple pi pi-ellipsis-v cursor-pointer custom_text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.stop="event => bookingCancel(event, slotProps.data)"
                v-ripple
              ></i>
              <i v-if="slotProps.data.status == 'cancelled'"
                class="p-ripple pi pi-ellipsis-v cursor-pointer custom_text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.stop="event => bookingMenu(event, slotProps.data)"
                v-ripple
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>
      <p
        v-if="!bookings.length"
        class="font-bold font-size-normal m-auto mt-3 text-center"
      >
        No data to preview
      </p>
    </div>
    <!-- Events -->
    <!-- <div
      class="col-12 p-0 grid flex align-items-center justify-content-between"
    >
      <span class="small__text font-bold custom_text custom_spacing uppercase"
        >Events</span
      >
    </div> -->
    <!-- Events Table -->
    <!-- <div class="col-12 p-0 mt-3 mb-7">
      <DataTable
        class="booking_table"
        :value="events"
        tableStyle="min-width:100%"
      >
        <Column header="Event Name" class="accent font-medium p-2">
          <template #body="slotProps">
            <span class="small__text font-medium spacing_none">{{
              slotProps.data.title
            }}</span>
            <span class="small__text font-medium spacing_none">{{
              slotProps.data.event_sector
            }}</span>
            <CustomChip
              class=""
              :color="fetchStyle(slotProps.data.event_sector)"
              :value="slotProps.data.event_sector"
            /> </template
        ></Column>
        <Column header="Event type" class="accent font-medium p-2">
          <template #body="slotProps">
            <span class="small__text font-medium spacing_none">{{
              slotProps.data.event_type
            }}</span>
          </template></Column
        >
        <Column header="Date" class="accent font-medium">
          <template #body="slotProps">
            <span class="small__text font-medium spacing_none">{{
              slotProps.data.date
            }}</span>
          </template></Column
        >
        <Column header="Time" class="accent font-medium">
          <template #body="slotProps">
            <span class="small__text font-medium spacing_none">{{
              slotProps.data.time
            }}</span>
          </template></Column
        >
        <Column field="status" header="Status" class="accent font-medium">
          <template #body="slotProps">
            <div class="flex align-items-center justify-content-between">
              <CustomTagRounded
                class=""
                :color="fetchStyle(slotProps.data.status)"
                :value="slotProps.data.status"
              />
              <i
                class="p-ripple pi pi-ellipsis-v cursor-pointer custom_text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.stop="eventMenu"
                v-ripple
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>
      <p
        v-if="!events.length"
        class="font-bold font-size-normal m-auto mt-3 text-center"
      >
        No data to preview
      </p>
    </div> -->
    <!-- Credits -->
    <div
      class="col-12 p-0 grid flex align-items-center justify-content-between"
    >
      <span class="small__text font-bold custom_text custom_spacing uppercase"
        >Credits</span
      >
    </div>
    <!-- Credits Panel Table -->
    <div class="col-12 p-0 mt-3 mb-7">
      <!-- Panel -->
      <Panel toggleable class="booking_panel">
        <!-- Panel Header -->
        <template v-slot:header>
        <span  class="pi pi-chevron-up panel_icon" ></span>

          <div
            class="panel_header flex align-items-center justify-content-between"
          >
            <span class="font-bold black_text">Booking credits</span>
          </div>
        </template>
        <!-- Panel Credits Table -->
        <div class="col-12 p-0 mt-3 mb-7">
          <DataTable
            class="booking_table"
            :value="credits"
            tableStyle="min-width:100%"
          >
            <Column header="Service Type" class="accent font-medium p-2">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.service"
                  class="small__text font-medium spacing_none"
                  >{{ slotProps.data.service }}</span
                >
                <span v-else class="small__text font-medium spacing_none"
                  >no data</span
                >
              </template></Column
            >
            <Column header="Category" class="accent font-medium p-2">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.category"
                  class="small__text font-medium spacing_none"
                  >{{ slotProps.data.category }}</span
                >
                <span v-else class="small__text font-medium spacing_none"
                  >no data</span
                >
              </template></Column
            >
            <!-- <Column header="Cancelled On" class="accent font-medium">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.createdAt"
                  class="small__text font-medium spacing_none"
                  >{{ slotProps.data.createdAt }}</span
                >
                <span v-else class="small__text font-medium spacing_none"
                  >no data</span
                >
              </template></Column
            > -->
            <!-- <Column header="Cancelled By" class="accent font-medium">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.cancelBy"
                  class="small__text font-medium spacing_none"
                  >{{ slotProps.data.cancelBy }}</span
                >
                <span v-else class="small__text font-medium spacing_none"
                  >no data</span
                >
              </template></Column
            > -->
            <Column header="Credit" class="accent font-medium">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.total"
                  class="small__text font-medium spacing_none"
                  >
                  {{ slotProps.data.total }}
                </span>
                <span v-else class="small__text font-medium spacing_none"
                  >no data</span
                >
              </template>
            </Column>
          </DataTable>
          <p
            v-if="!credits.length"
            class="font-bold font-size-normal m-auto mt-3 text-center"
          >
            No data to preview
          </p>
        </div>
      </Panel>
    </div>
    <CustomDrawer
       title_report="Fitting Report Jul 24, 2023"
        @close="closeDrawer"
        status="report"
        :drawerBtn="drawerBtn"
        :report_url="report_url"
    />
    <Toast position="top-center" />
    <Menu
      ref="booking_menu"
      id="overlay_menu"
      :model="booking_dropdown"
      :popup="true"
    />
    <Menu
      ref="booking_cancel"
      id="overlay_menu"
      :model="cancelItem"
      :popup="true"
    />
    <Menu
      ref="event_menu"
      id="overlay_menu"
      :model="event_menuData"
      :popup="true"
    />
  </div>
</template>
<script setup>
import { ref, inject, onMounted } from "vue"
import { useToast } from "primevue/usetoast"
const toast = useToast()
name: "CustomerBooking"
const props = defineProps({
  drawerBtn: {
    default: "",
    type: Array,
  },
})
// inject selected customer id
const selectedCustomer = inject("selected_customer")
const customDrawer = useState("customDrawer", () => false)
const router = useRouter()

watch(selectedCustomer, (newVal) => {
  if (newVal) {
    customerBookingsDetails()
  }
})
const booking_details = ref({})
const bookings = ref([])
const credits = ref([])
const show_scoreDrawer = ref(false)
const drawer_status = ref("")
const booking_menu = ref()
const booking_cancel = ref()
const event_menu = ref()
const session_id = ref("")
const booking_status = ref("")
const booking_id = ref("")
const cancel_reason = ref("")
const booking_service = ref("")
// booking menu
const booking_dropdown = reactive([
  {
    label: "Book Again",
    command: () => {
      bookAgain()
    },
  },
  {
    label: "View Reports",
    command: () => {
      reportGenerate()
    },
  },
])
// booking cancel menu
const cancelItem = reactive([
  {
    label: "Cancel Booking",
    command: () => {
      cancelBooking()
    },
  },
])

const event_menuData = ref([
  {
    label: "View Pass",
  },
  {
    label: "View Details",
  },
])
// api methods
// customerBookings Details on id
const customerBookingsDetails = async () => {
  try {
    const { detail_table } = props
    const response = await useMyFetch(
      `/client/customer/details/${selectedCustomer?.value}`
    )
    const { data } = response
    booking_details.value = data.value
    bookings.value = booking_details.value.booking
    credits.value = booking_details.value.credits
  } catch (err) {
    console.log("error Response:", err)
  }
}
// mounted
onMounted(() => {
  customerBookingsDetails()
})
// methods
// booking cancel 
const bookingCancel = (event, value) => {
  booking_cancel.value.toggle(event)
  session_id.value = value.session_id;
  booking_status.value = value.status;
  booking_id.value = value._id;
  booking_service.value = value.services;
 }
//  booking menu
 const bookingMenu = (event, value) => {
  booking_menu.value.toggle(event)
  session_id.value = value.session_id;
  booking_status.value = value.status;
  booking_id.value = value._id;
  booking_service.value = value.services;
 }
const report_url = ref()
// report booking
const reportGenerate = async () => {
  if (booking_status.value =='completed' &&  booking_service.value == "Club Assessment" ) {
    customDrawer.value = true
  try {
    const { data } = await useMyFetch(
      `/admin/session/generate/${session_id?.value}`
    )
    report_url.value = data.value.url

  } catch (err) {
    console.log("error Response:", err)
  }
  }
  else{
 
  toast.add({
      severity: "error",
      summary: "There is no session for this Booking",
      detail: "",
      life: 2000
    })
    return
  }
};
// book again
const bookAgain = () =>{
  router.push("/bookings")
};
// cancel booking
const cancelBooking = async () => {
  if (booking_status.value =='cancelled' || booking_status.value == 'completed'  ) {
    toast.add({
      severity: "error",
      summary: "Booking is already canceled or completed",
      detail: "",
      life: 2000
    })
    return
  } else{
    try {
    const payload = {
      cancellation_reason: cancel_reason ?? "",
      
    }
    const { data } = await useMyFetch(`/client/bookings/cancel/${booking_id?.value}`, {
      method: "POST",
      body: payload,
    })
    // console.log('cancel booking ress',data);
    toast.add({
      severity: "success",
      summary: "Booking Canceled",
      detail: "",
      life: 1000
    })
    customerBookingsDetails()
  } catch (err) {
    console.log("error Response:", err)
  }
  }
 
};

const eventMenu = (event) => {
  event_menu.value.toggle(event)
}
const fetchStyle = (value) => {
  let task = value
  if (task === "completed" || task === "booked" ) {
    return "#1AD598"
  } else if (task === "pending" || task === "Ongoing" || task == 'in progress') {
    return "#FFB536"
  } else if (task === "Canceled") {
    return "#F3654A"
  } else if (task === "Upcoming") {
    return "#8D98A9"
  } else if (task === "Public") {
    return "#895BF1"
  }
}
// handle sore drawer
const handleViewScore = (value) => {
  if (value == "report") {
    this.drawer_status = value
    this.show_scoreDrawer = true
  } else if (value == "score") {
    this.drawer_status = value
    this.show_scoreDrawer = true
  }
}
// close drawer
const closeDrawer = () => {
  customDrawer.value = false
  customerBookingsDetails()

}
</script>
<style lang="scss">
.booking_table .p-datatable-table th {
  color: #8d98a9 !important;
  font-size: 0.75rem !important;
  letter-spacing: 0 !important;
  font-weight: 400 !important;
}
.booking_table .p-datatable-table td {
  padding: 1rem 1rem !important;
}
.booking_panel{
  position: relative !important;
  .panel_icon{
    position: absolute !important;
    right: 1.7rem;
    z-index: 10 !important;
    cursor: pointer;
  }
}
.booking_panel.p-panel .p-panel-content {
  border: none !important;
  padding: 0.3rem !important;
}
.booking_panel.p-panel .p-panel-header {
  border-radius: 8px !important;
  border: none !important;
  background-color: #ceeaff !important;
}
.panel_header {
  width: 100% !important;
}
.booking_panel .p-icon{
  visibility: hidden !important;
}
</style>
