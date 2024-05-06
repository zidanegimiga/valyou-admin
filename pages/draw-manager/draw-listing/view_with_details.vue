<template lang="">
  <div class="wrapper-column h-full w-full">
    <div class="item">
      <div class="card">
        <div class="wrapper-row">
          <div class="item expand flex align-items-center">
            <i
              class="pi pi-arrow-left mr-2 cursor-pointer"
              @click="$router.push(`/draw-manager/draw-listing`)"
            ></i>
            <StepperCustom :_list="StepperCustom_items" />
          </div>
        </div>
      </div>
    </div>

    <template v-for="(item, index) in StepperCustom_items" :key="index">
      <template v-if="item.name == 'DED Submission Approval' && item.is_active">
        <div class="card item expand mt-3 overflow-y-auto">
          <keep-alive :max="10">
            <lazyComponent class="h-full w-full" :super_lazy="true">
              <DED_Submission_Approval
                type="Order Draw"
                :threshold="threshold"
                :sold="sold"
              />
            </lazyComponent>
          </keep-alive>
        </div>
      </template>

      <template v-if="item.name == 'DED Winner Announcement' && item.is_active">
        <div class="item expand mt-3 overflow-y-auto">
          <keep-alive :max="10">
            <lazyComponent class="h-full w-full" :super_lazy="true">
              <DED_Winner_Announcement type="Order Draw" />
            </lazyComponent>
          </keep-alive>
        </div>
      </template>

      <template v-if="item.name == 'VP Announcement' && item.is_active">
        <div class="card item expand mt-3 overflow-y-auto">
          <keep-alive :max="10">
            <lazyComponent class="h-full w-full" :super_lazy="true">
              <VP_Announcement type="Order Draw" />
            </lazyComponent>
          </keep-alive>
        </div>
      </template>

      <template
        v-if="
          item.name == 'VP Announcement' &&
          item.is_complete &&
          state.status == 'Announced'
        "
      >
        <div class="card item expand mt-3 overflow-y-auto">
          <keep-alive :max="10">
            <lazyComponent class="h-full w-full" :super_lazy="true">
              <VP_Announcement
                type="Order Draw"
                :completed="item.is_complete"
              />
            </lazyComponent>
          </keep-alive>
        </div>
      </template>
    </template>
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from "vue" // for set connection with parents & children's

// ## <- services imports ->

import { GetDrawID } from "@/services/draw_manager/free_draw/details"

// ## <- dummyData imports ->

// import {
//   data_current_user as d_cu,
//   data_user_list as d_ul,
// } from "@/dummyData/customers/customers_detail"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

// ## <- containers Async imports ->
const DED_Submission_Approval = defineAsyncComponent(() =>
  import("@/containers/DrawManager/FreeDraw/DED_Submission_&_Approval.vue")
)

const DED_Winner_Announcement = defineAsyncComponent(() =>
  import("@/containers/DrawManager/FreeDraw/DED_Winner_Announcement.vue")
)

const VP_Announcement = defineAsyncComponent(() =>
  import("@/containers/DrawManager/FreeDraw/VP_Announcement.vue")
)

const toast = useToast()
const router = useRouter()
const route = useRoute()

// const state = inject('sharedState'); // get reactive data from parent
// to be able to interact with both components, whether the parent or the child, any changes you make in one of the components will be updated in the other.
// in parent you should to add
;`
import { reactive, provide } from 'vue';
// set reactive data from parent
const state = reactive({
  // data or variables
  customer_type:'dog',
  need_refresh: false
});
provide('sharedState', state);

// to refresh API from Child
const need_refresh_computed = computed(()=>state.need_refresh);
watch(need_refresh_computed, (newVal)=>{
  if(newVal == true){
    // jest refresh API call from Child
    onAPI_call();
    state.need_refresh = false;
  }
})
`

const state = reactive({
  // data or variables
  need_refresh: false,

  Winner_Announcement_actions: [],
  status: "",
})
provide("sharedState", state)

const need_refresh_computed = computed(() => state.need_refresh)
watch(need_refresh_computed, (newVal) => {
  if (newVal == true) {
    // jest refresh API call from Child
    onAPI_call()
    state.need_refresh = false
  }
})

// <- container config ->
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  disableApi: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:data"])

const container_Data = computed({
  // getter
  get() {
    return props.data
  },
  // setter
  set(newValue) {
    emit("update:data", newVal)
  },
})

watch(container_Data, (newVal) => {
  emit("update:data", newVal)
})

const route_query_id = computed(() => route.query?._id)
watch(route_query_id, (val) => {
  onAPI_call()
})
// make sure it's changed with this way :
// router.replace({ query: { _id: item._id } })

// how to use it in parent
// <im_component :data="data" @update:data="(value)=> data = value" />

// ---------------------------------------------------------------
// # Setup Components Controls like design
// dd means DropDown
// dp means DatePiker
// cb means CheckBox
// txt means TextArea
// inp means Input
// ~ other use same name of component

// Example
// inp_SellPrice = ref('');
// dd_SellPrice = ref('');

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const StepperCustom_items = ref([
  {
    is_active: true,
    name: "DED Submission & Approval",
    is_complete: false,
  },

  {
    is_active: false,
    name: "DED Winner Announcement",
    is_complete: false,
  },

  {
    is_active: false,
    name: "AnnouncementVP",
    is_complete: false,
  },
])

// ## for displays
// const SideBarVisible = ref(false)

// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations

// ## resets Components Control for integrations

// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return GetDrawID({}, route.query?._id)
}

const threshold = ref()
const sold = ref()
// handleData for display data from api
const handleData = (data) => {
  if (data == undefined) {
    return undefined
  }

  StepperCustom_items.value = data?.processes.map((item) => ({
    is_active: item.process_status == "progress",
    name: item.stage_name,
    is_complete: item.process_status == "completed",
    threshold: item.threshold,
  }))
  threshold.value = data?.threshold
  sold.value = data?.sold

  state.Winner_Announcement_actions = data?.processes?.[1]?.actions

  state.status = data.status

  // Example
  // totalRecords_DataTable.value = data[0].totalCount[0].count;

  // invoices_TableData_api.value = data[0].paginatedResults.map((item) => ({
  //   invoice_no: item?.invoiceNo,
  //   matter: "Not available",
  //   type: "Not available",
  //   client_name: item?.client_name, //  item.client_name.customer_name ,
  //   due_date: new Date(item?.invoice_details.due_date)
  //     .toISOString()
  //     .slice(0, 10),
  //   total_amount: item?.subtotal,
  //   status: item?.bill_status.toUpperCase(),
  //   actions: item?.bill_status == "paid" ? ["View Timesheet"] : [],
  // }));
}

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    handleApi().then((res) => {
      handleData(res)
    })

    // getMatter_list().then((res) => {
    //   let val = res?.data.map((item) => ({
    //     label: item?.matter_name,
    //     id: item?.id,
    //   }));
    //   matter_id.value = val[0]?.id;
    //   dd_matter.value = val[0]?.id;
    //   dd_matter_items.value = val;
    // });
  }
}

onAPI_call()

onMounted(() => {
  // onAPI_call()
})
</script>
<style lang="scss"></style>
