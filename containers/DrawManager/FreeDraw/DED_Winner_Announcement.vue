<template lang="">
  <div class="wrapper-row h-full w-full gap-3 DED_Winner_Announcement">
    <div class="card item" style="flex: 0.45">
      <div class="wrapper-column">
        <div class="item">
          <h3 class="font-bold">DED Winner Announcement</h3>
        </div>
        <div class="item overflow-y-auto">
          <Timeline class="mt-5" :value="Timeline_items">
            <template #connector="slotProps">
              <div
                class="p-timeline-event-connector border-2 border-dashed h-3rem"
                style="background: none"
                :style="{ 'border-color': slotProps.item.color }"
              ></div>
            </template>

            <template #marker="slotProps">
              <div
                class="flex flex-column align-items-center justify-content-center relative"
              >
                <!-- flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1  -->
                <span
                  class="absolute h-full w-full flex w-2rem h-2rem align-items-center justify-content-center text-white"
                  style="transform: translate(0.3px, -5.5px)"
                >
                  {{ slotProps.index + 1 }}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                >
                  <path
                    id="Path_17443"
                    data-name="Path 17443"
                    d="M0,0H45V45H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_17444"
                    data-name="Path 17444"
                    d="M25.56,13.983l3.686,6.386a1.877,1.877,0,0,1-1.322,2.79l-.212.021-.21,0L22,22.822,19.56,27.764a1.877,1.877,0,0,1-3.015.488l-.154-.176-.135-.206-3.69-6.388a16.864,16.864,0,0,0,12.994-7.5Z"
                    transform="translate(10.995 12.235)"
                    :fill="slotProps.item.color"
                    stroke="#273647"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0"
                  />

                  <path
                    id="Path_17445"
                    data-name="Path 17445"
                    d="M19.33,21.482l-3.686,6.39a1.877,1.877,0,0,1-3.041.294l-.142-.188-.12-.214L9.895,22.824l-5.5.356a1.877,1.877,0,0,1-1.916-2.419l.075-.2.094-.187,3.69-6.392a16.864,16.864,0,0,0,12.988,7.5Z"
                    transform="translate(2.102 12.234)"
                    :fill="slotProps.item.color"
                    stroke="#273647"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0"
                  />
                  <path
                    id="Path_17446"
                    data-name="Path 17446"
                    d="M18.125,2l.45.007A13.125,13.125,0,0,1,31.25,15.125l-.006.362-.013.36-.034.459-.049.454-.045.334a13.1,13.1,0,0,1-.594,2.378l-.217.577-.287.653a13.127,13.127,0,0,1-23.79-.052l-.244-.557-.1-.249-.15-.407-.178-.551q-.1-.32-.174-.645l-.112-.508-.092-.508-.037-.261-.073-.606-.045-.684L5,15.125A13.125,13.125,0,0,1,17.675,2.007L18.125,2Z"
                    transform="translate(4.375 1.75)"
                    :fill="slotProps.item.color"
                    stroke="#2c3e50"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0"
                  />
                </svg>
              </div>
            </template>

            <template #content="slotProps">
              <div class="wrapper-row">
                <div class="item expand">
                  <div class="wrapper-column">
                    <div class="item">
                      <h6 class="font-bold w-max">
                        {{ slotProps.index + 1 }}
                        <sup v-if="slotProps.index == 0">st</sup>
                        <sup v-else>nd</sup> &ThinSpace; Prize Winner
                      </h6>
                    </div>
                    <div class="item">
                      <span
                        v-if="slotProps?.item?.ticket_id"
                        class="inline-block text-xs w-max font-bold"
                        style="color: #0090ff"
                        >Ticket ID : {{ slotProps.item.ticket_id }}</span
                      >
                      <span
                        v-else
                        class="inline-block text-xs w-max font-bold"
                        style="color: #8d98a9"
                        >Select the Ticket ID</span
                      >
                    </div>
                  </div>
                </div>
                <div v-if="slotProps?.item?.ticket_id" class="item">
                  <div class="flex align-items-center h-full">
                    <i class="pi pi-check-circle" style="color: #1ad598"></i>
                    <!-- pi-circle-fill -->
                  </div>
                </div>
              </div>
            </template>
          </Timeline>
        </div>
      </div>
    </div>
    <div class="card item" style="flex: 1">
      <div class="wrapper-column">
        <!-- Heading & add new btn -->
        <div class="item">
          <div class="wrapper-row pt-3">
            <div class="item">
              <span
                id="inp_Search"
                style="width: 240px"
                class="p-input-icon-left"
              >
                <i class="pi pi-search" />
                <InputText
                  v-model="inp_Search"
                  placeholder="Search by customer ticket id"
                />
              </span>
            </div>
          </div>
        </div>

        <!-- DataTable -->
        <div class="item expand mt-3 overflow-y-auto">
          <DataTable
            class="DataTable"
            stripedRows
            resizableColumns
            columnResizeMode="fit"
            showGridline
            :value="data_TableData"
            :rows="limit_DataTable"
            tableStyle="min-width: 30rem"
            @update:rows="(d_rows) => (limit_DataTable = d_rows)"
            @update:first="
              (d_first) => {
                page_DataTable = d_first / limit_DataTable + 1
                first_DataTable = d_first
              }
            "
            @row-click="async (env) => {
                data_row = env.data
                await confirm1()
              }
            "
            :rowClass="rowClass"
          >
            <Column
              header="Customer Name"
              class="text-center"
              style="color: black"
            >
              <template #body="slotProps">
                <ListAvatar2
                  :border_bottom_bool="false"
                  :first_name="slotProps.data.customer.first_name"
                  :last_name="slotProps.data.customer.last_name"
                  :image="slotProps.data.customer.link"
                  style="transform: translate(45px, 0)"
                />
              </template>
            </Column>
            <Column
              field="customer_id"
              header="Customer ID"
              class="text-center"
            >
            </Column>
            <Column field="ticket_id" header="Ticket ID" class="text-center">
            </Column>
            <Column
              field="customer_contact"
              header="Customer Contact"
              class="text-center"
            >
            </Column>
          </DataTable>
        </div>

        <!-- Paginator -->
        <div class="item">
          <div class="grid">
            <div class="col-8 p-0">
              <Paginator
                class="Paginator"
                :rows="limit_DataTable"
                :first="1"
                :totalRecords="totalRecords_DataTable"
                @page="changePage"
              ></Paginator>
            </div>

            <div class="col-4 flex align-items-center justify-content-end">
              <span class="gray_text mr-2">Rows per page:</span>
              <Dropdown
                v-model="dd_RowsPerPage"
                :options="dd_RowsPerPage_items"
                class="w-full md:w-5rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDialog />
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from "vue" // for set connection with parents & children's

// ## <- services imports ->

import {
  GetCustomersList,
  Export_Submit_DED,
  Update_Winner,
  Proceed_Next,
  fetch_ValyouPoint,
} from "@/services/draw_manager/free_draw/details"

// ## <- dummyData imports ->

import { data_TableData as d_td } from "@/dummyData/DrawManger/FreeDraw/free_draw_details_tb"
import { GetDraw as GetFreeDraw } from "@/services/draw_manager/free_draw/save"
import { GetDraw as GetOrderDraw } from "@/services/draw_manager/draw_listing/save_draw"
// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { useToast } from "primevue/usetoast"
import { useConfirm } from "primevue/useconfirm"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

// ## <- containers Async imports ->
// const CustomerOrder = defineAsyncComponent(()=>import("@/containers/customers/CustomerOrder.vue"));

const toast = useToast()
const router = useRouter()
const route = useRoute()
const confirm = useConfirm()

const state = inject("sharedState") // get reactive data from parent
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

// <- container config ->
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: "",
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
const inp_Search = ref("")

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const Timeline_items = ref([
  // {
  //   ticket_id: "039123456",
  //   color: "#07D0B1",
  // },
  // {
  //   ticket_id: "",
  //   color: "#FFB536",
  // },
  // {
  //   ticket_id: null,
  //   color: "#FF9800",
  // },
  // {
  //   ticket_id: null,
  //   color: "#673AB7",
  // },
  // {
  //   ticket_id: null,
  //   color: "#9C27B0",
  // },
])

const colors = {
  prize_1: "#07D0B1",
  prize_2: "#FFB536",
  prize_3: "#FF9800",
  prize_4: "#673AB7",
  prize_5: "#9C27B0",
  prize_6: "#4CAF50",
  prize_7: "#2196F3",
  prize_8: "#FF4081",
  prize_9: "#FF5722",
  prize_10: "#607D8B",
}
// ## for displays

// <- Data Table settings ->
const data_TableData = ref(d_td) // or  [1, 2, 3, 4]
const limit_DataTable = ref(5)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first_DataTable = ref(1)
const dd_RowsPerPage = ref(limit_DataTable.value)

const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

const Menu_table = ref(null)

const changePage = (paramPage) => {
  page_DataTable.value = paramPage.page + 1
}

const getSeverity = (item) => {
  switch (item.status) {
    case "OVERDUE":
      return {
        color: "#F3654A",
        backgroundColor: "#F3654A33",
      }

    case "APPROVAL":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53633",
      }

    case "PAYMENT":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53633",
      }

    case "PAID":
      return {
        color: "#1AD598",
        backgroundColor: "#D1F7EA",
      }

    default:
      return {
        color: "#fff",
        backgroundColor: "#1AD598",
      }
  }
}

watch(page_DataTable, () => {
  onAPI_call()
})

watch(dd_RowsPerPage, () => {
  onAPI_call()
})

// ## for displays
// const SideBarVisible = ref(false)

// ---------------------------------------------------------------
// # Setup Validation

// ---------------------------------------------------------------
// Functions For design

// This function is triggered when a certain action is confirmed

// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations
const data_row = ref()
// ## resets Components Control for integrations
data_TableData.value = []
// ## Watch's for API Integration

const inp_SearchDebounced = refDebounced(inp_Search, 500)
watch(
  () => inp_SearchDebounced.value,
  (val) => {
    onAPI_call()
  }
)

// ## Functions For API Integration
const Get_TimeLine_inject = () => {
  state?.Winner_Announcement_actions?.forEach((item, index) => {
    if (Timeline_items.value[index]) {
      Timeline_items.value[index].ticket_id =
        item?.status === "progress" ? "" : item.message
    } else {
      // If Timeline_items.value[index] doesn't exist, create a new object with ticket_id
      Timeline_items.value[index] = {
        ticket_id: item?.status === "progress" ? "" : item.message,
      }
    }
  })
}
const confirm_disabled = ref(false)
const rowClass = () => {
  return [{ disabled: confirm_disabled.value == true }]
}

const confirm1 = async () => {
  // A confirmation dialog is shown to the user
  await confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    // icon: 'pi pi-exclamation-triangle',
    // If the user accepts the confirmation
    accept: async () => {
      confirm_disabled.value = true
      // A toast message is shown to the user indicating that they have confirmed the action
      // We map over the Timeline_items to check if each item has a ticket_id that is not empty or null
      const hasValue = Timeline_items.value.map((item) => {
        return (
          item.ticket_id !== undefined &&
          item.ticket_id !== null &&
          item.ticket_id !== ""
        )
      })

      // We define an object with null values
      let obj = {}
      // if ((props.type = "Order Draw")) {
      // drawPrizeArray.value.map((item) => item.type)
      // obj = {
      //   first_prize_winner: null,
      //   second_prize_winner: null,
      //   third_prize_winner: null,
      // }
      drawPrizeArray.value.prize_array.forEach((item) => {
        obj[item.type] = null
      })
      // } else {
      //   obj = {
      //     first_prize_winner: null,
      //     second_prize_winner: null,
      //     third_prize_winner: null,
      //     fourth_prize_winner: null,
      //     fifth_prize_winner: null,
      //   }
      // }

      // We get the keys of the object
      let keys = Object.keys(obj)
      // We iterate over the hasValue array and assign the boolean values to the corresponding keys in the object
      for (let i = 0; i < hasValue.length; i++) {
        if (keys[i]) {
          obj[keys[i]] = hasValue[i]
        }
      }

      // We initialize a variable to keep track of the previous key's value
      let previousKeyWasTrue = false
      // We iterate over the keys of the object
      for (let i = 0; i < keys.length; i++) {
        // If the first key's value is false, we set it to true
        if (i === 0 && obj[keys[i]] === false) {
          obj[keys[i]] = true
          break
        }
        // If the previous key's value was true and the current key's value is false, we set the current key's value to true
        else if (previousKeyWasTrue && obj[keys[i]] === false) {
          // set all previous keys = false
          let n = i
          while (true) {
            obj[keys[n]] = false
            n--

            if (n == "-1") {
              break
            }
          }
          obj[keys[i]] = true
          break
        }
        // We update the previousKeyWasTrue variable with the current key's value
        previousKeyWasTrue = obj[keys[i]]
        
      }
      // console.log("data:",data_row.value);
      
      // obj.user_id = data_row.value?._id
      // obj.ticket_id = data_row.value?.ticket_id_ob
      
      let payload = {
        user_id: data_row.value?._id,
        ticket_id: data_row.value?.ticket_id_ob,
      }
      for (const key in obj) {
        if (obj[key] === true) {
          payload.prize_type = key
        }
      }

      // We call the Update_Winner function with the updated object as an argument
      await Update_Winner(payload, route.query?._id)
      // if (props.type == "Order Draw") {
      if (obj[keys[keys.length - 1]] == true) {
        await fetch_ValyouPoint({}, route.query?._id)
        // await Proceed_Next({ticket_id: data_row.value?.ticket_id},route.query?._id);
      }
      // } else {
      //   if (obj.fifth_prize_winner == true) {
      //     await fetch_ValyouPoint({}, route.query?._id)
      //     // await Proceed_Next({ticket_id: data_row.value?.ticket_id},route.query?._id);
      //   }
      // }
      await Proceed_Next(
        { ticket_id: data_row.value?.ticket_id },
        route.query?._id
      )
      state.need_refresh = true
      // onAPI_call();
      setTimeout(() => {
        Get_TimeLine_inject()

        // refresh datatable
        onAPI_call()
      }, 300)

      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      })
      confirm_disabled.value = false
    },
    // If the user rejects the confirmation
    reject: () => {
      // A toast message is shown to the user indicating that they have rejected the action
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    },
  })
}
// ## Submit Form

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return GetCustomersList(
    {
      search: inp_Search.value, // ** Conditional
      page: page_DataTable.value,
      limit: dd_RowsPerPage.value,
      sortBy: "_id",
    },
    route.query?._id
  )
}

// handleData for display data from api
const handleData = (data) => {
  if (data == undefined) {
    return undefined
  }

  // Example
  totalRecords_DataTable.value = data.totalResults
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

  data_TableData.value = data?.results.map((item) => ({
    _id: item.customer_id,
    customer: {
      name: `${item?.name} ${item?.lastName}`,
      first_name: item?.name,
      last_name: item?.lastName,
      link: item?.imageUrl,
    },
    customer_id: item?.customerID,
    customer_email_id: item.email,
    ticket_id: item.ticketId,
    customer_contact: `+${item.countryCode} ${item.mobileNumber}`,
    customer_contact:
      "+" +
      (item.countryCode?.[0] == "+"
        ? `${item.countryCode.slice(1)}`
        : item.countryCode) +
      "-" +
      item?.mobileNumber?.toString().slice(0, 2) +
      " " +
      item?.mobileNumber?.toString().slice(2),
    registration_date: item.created_date, // No_API

    ticket_id_ob: item.ticket_id,
  }))
}

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    data_TableData.value = []

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

  //   {
  //     ticket_id: "039123456",
  //     color: "#07D0B1",
  //   },

  Get_TimeLine_inject()
}

onAPI_call()

const drawPrizeArray = ref(null)
onMounted(async () => {
  // onAPI_call()
  if (props.type == "Order Draw") {
    drawPrizeArray.value = await GetOrderDraw({}, route.query?._id)

  } else {
    drawPrizeArray.value = await GetFreeDraw({}, route.query?._id)
    // Timeline_items.value = drawPrizeArray.value.prize_array
  }
  Timeline_items.value.forEach((item) => {
    item.color = colors[item.type]
  })
  Timeline_items.value.forEach((item, index) => {
    item.type = drawPrizeArray.value.prize_array[index].type
    item.amount = drawPrizeArray.value.prize_array[index].amount
    item.color = colors[item.type]
    item.ticket_id = "" // You can set the default value here
  })
})
</script>
<style lang="scss">
.DED_Winner_Announcement {
  .p-disabled,
  .p-component:disabled {
    opacity: unset;
    background: unset !important;
  }
}

.p-timeline {
  align-items: flex-start;
}

.p-timeline-event:nth-child(even) {
  flex-direction: row !important;

  .p-timeline-event-content {
    text-align: left !important;
  }
}

.p-timeline-event-opposite {
  flex: 0 !important;
}

// split side

.p-timeline-event {
  width: 100%;
}
</style>

<style lang="scss">
#inp_Search {
  i.pi.pi-search {
    color: #8d98a9;
    transform: scale(0.72);
  }

  input.p-inputtext.p-component::placeholder {
    color: #8d98a9;
  }
}
</style>

<style lang="scss">
.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  // justify-content: center;
}

.Paginator {
  .p-paginator-rpp-options {
    width: min-content;
  }
  .p-dropdown.p-inputwrapper-filled .p-dropdown-label {
    display: flex;
    align-items: center;
  }

  .p-paginator {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .p-paginator.p-component {
    transform: scale(0.9) translate(-49px, 0px);
  }

  button {
    font-weight: bolder;
    border-radius: 4px !important;
    color: #4e4e4e !important;
    // border: 1px solid !important;

    box-shadow: 0px 1px 3px #00000029;
  }

  button.p-highlight {
    color: #fff !important;
    background: #0090ff !important;
  }
}

.p-datatable-tbody tr {
  cursor: pointer;
}
</style>
