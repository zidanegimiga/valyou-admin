<template lang="">
  <div
    :class="sidebar_view ? class_sidebar.parent : class_page.parent"
    style="min-height: 89.5vh"
  >
    <div :class="sidebar_view ? class_sidebar.left_side : class_page.left_side">
      <Divider
        v-if="sidebar_view"
        class="p-0 m-0"
        style="transform: scale(1.5)"
      />
      <div
        :class="sidebar_view ? class_sidebar.time_line : class_page.time_line"
        class="flex align-items-center"
      >
        <!-- <i
          class="pi pi-arrow-left mr-2 cursor-pointer"
          @click="$router.push(`/orders`)"
        ></i> -->
        <StepperCustom :_list="StepperCustom_items" />
      </div>
      <Divider
        v-if="sidebar_view"
        class="p-0 m-0 -mt-3"
        style="transform: scale(1.5)"
      />
      <!-- Process UI -->
      <div class="flex-1 card p-0">
        <div class="flex flex-column h-full">
          <div
            class="grid"
            :class="sidebar_view ? 'p-0 pt-3' : 'p-3 pl-4 pr-4'"
          >
            <div class="col-12" v-if="!sidebar_view">
              <h3 class="font-bold">Order Number: {{ order_number }}</h3>
            </div>

            <div
              v-if="current_status == 'Moved to Logistics'"
              class="col-12 mt-4 mb-5"
            >
              <div
                class="flex flex-column align-items-center justify-content-center gap-3"
              >
                <i
                  class="pi pi-check-circle"
                  style="color: #7ebe36; transform: scale(1.8)"
                ></i>
                <h1 class="font-bold">Order has been moved to Logistics</h1>
                <p
                  class="text-sm text-center"
                  :class="sidebar_view ? '' : 'w-6'"
                >
                  A confirmation email will be sent to your registered email ID.
                  Note, you could always check order status ad details from your
                  profile under “Order” section.
                </p>
              </div>
            </div>

            <div
              v-else
              class="col-3"
              v-for="(item, index) in Cards_list"
              :key="index"
            >
              <Card
                class="Card shadow-1 w-24 p-3 h-full flex justify-content-between"
              >
                <template #content>
                  <div class="grid grid-nogutter w-full">
                    <div class="col">
                      <div class="flex algin-items-center h-full">
                        <h5 class="text-grey font-bold" style="color: #949dac">
                          {{ item.key }}
                        </h5>
                      </div>
                    </div>
                    <div class="col">
                      <div
                        class="flex algin-items-center h-full justify-content-end"
                        style="align-items: center; justify-content: end"
                      >
                        <Tag
                          v-if="item.value?.tag"
                          class="p-0 font-size-small font-bold h-min"
                          :value="item.value?.tag"
                          style="
                            min-width: 3.5rem;
                            padding: 3px !important;
                            padding-left: 6px !important;
                            padding-right: 6px !important;
                          "
                          :style="getSeverity(item.value?.tag)"
                        />
                        <template v-else>
                          <h6
                            class="font-bold text-right"
                            style="color: #000000"
                          >
                            {{ item.value }}
                          </h6>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>

            <div class="col-12" v-if="!sidebar_view">
              <h3 class="font-bold">Item Details</h3>
            </div>

            <div class="col-12 mt-5" :class="sidebar_view ? 'p-0' : ''">
              <!-- 
                @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse"
               -->
              <DataTable
                columnResizeMode="fit"
                v-model:expandedRows="expandedRows"
                :value="data_TableData"
                :rows="limit_DataTable"
                @update:rows="(d_rows) => (limit_DataTable = d_rows)"
                @update:first="
                  (d_first) => {
                    page_DataTable = d_first / limit_DataTable + 1
                    first = d_first
                  }
                "
              >
                <Column header="Item & Description">
                  <template #body="slotProps">
                    <div class="flex gap-3 align-items-center">
                      <img
                        :src="slotProps.data.items.image"
                        class="dataTable_image"
                      />
                      <div>
                        <p class="text-sm font-semibold">
                          {{ slotProps.data.items.title.name }}
                        </p>
                        <!-- Problem with API: returniing html tags in subtitle -->
                        <!-- <p
                          v-if="slotProps?.data?.items?.subtitle?.charAt(0) !== '<'"
                          class="text-[#8D98A9]"
                        >
                          {{ slotProps.data.items.subtitle }}
                        </p> -->
                      </div>
                    </div>
                  </template>
                </Column>
                <Column field="draw_id">
                  <template #header>
                    <span class="text-center">Draw ID</span>
                  </template>
                  <!-- <template #body="slotProps">
                    <listInfo
                      :name="slotProps.data.items.title"
                      :image="slotProps.data.items.image"
                      :subtitle="''"
                      :is_circle="false"
                      :is_sub_first="false"
                      :bottom_border="false"
                      :border_bottom_bool="false"
                      :showActive="true"
                      style="transform: translate(90px, 0)"
                    />
                  </template> -->
                </Column>
                <Column field="expected_draw_date" header="Expected Draw Date">
                  <template #body="slotProps">
                    {{
                      moment(slotProps.data.expected_draw_date).format(
                        "DD MMM YYYY"
                      )
                    }}
                  </template>
                </Column>
                <Column field="qty" header="QTY" />
                <Column header="Price">
                  <template #body="slotProps">
                    <span>AED {{ slotProps.data.price }}.00</span>
                  </template>
                </Column>
                <Column expander style="width: 5rem" />
                <template #expansion="slotProps">
                  <div
                    v-if="slotProps.data.expansion.total_tickets > 0"
                    class="expansion-container"
                  >
                    <p class="text-sm font-bold">View Tickets</p>
                    <div class="tickets-container">
                      <div>
                        <p class="text-xs">Total tickets</p>
                        <p class="text-xs mt-2">
                          {{ slotProps?.data?.expansion?.total_tickets }}
                        </p>
                      </div>
                      <div class="flex flex-column gap-3">
                        <div
                          class="flex gap-4"
                          v-for="ticket in slotProps.data.expansion
                            .ticket_lists"
                        >
                          <div class="ticket-details">
                            <p class="text-xs">Ticket no</p>
                            <p class="text-sm font-bold">
                              {{ ticket.ticket_no }}
                            </p>
                          </div>
                          <div class="ticket-details">
                            <p class="text-xs">Issue on</p>
                            <p class="text-sm font-bold">
                              {{
                                moment(ticket.issue_on).format(
                                  "DD MMM YYYY, h:mm A"
                                )
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>No tickets available</div>
                </template>
              </DataTable>
              <!-- <div class="grid">
                <div class="col">
                  <Paginator
                    class="Paginator"
                    :rows="limit_DataTable"
                    :first="1"
                    :totalRecords="totalRecords_DataTable"
                    @page="changePage"
                  ></Paginator>
                </div>

                <div
                  class="col-4 md:col-3 flex align-items-center justify-content-end"
                >
                  <span class="gray_text mr-1">Rows per page:</span>
                  <Dropdown
                    v-model="dd_RowsPerPage"
                    :options="dd_RowsPerPage_items"
                    class="w-full md:w-5rem"
                  />
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Side -->
    <div
      :class="sidebar_view ? class_sidebar.left_side : class_page.right_side"
    >
      <div class="grid grid-column-2 gap-4">
        <!-- Delivery details N/A on API -->
        <!-- <Card class="p-3 shadow-none shadow-1 border-round-xs" style="min-width: 330px">
          <template #title>
            <h1 v-if="delivery_method == 'Self Pickup'" class="card-title">
              Self Pickup Address
            </h1>
            <span v-else class="card-title">Delivery Address</span>
          </template>
          <template #content>
            <div class="name-and-address flex flex-column">
              <span>Michael Baven</span>
              <span>Flat #24, 3rd Floor, King Faisal Street, Dubai</span>
            </div>
            <div class="flex gap-2">
              <p class="name-and-address">+971-52 6813408</p>
              <p class="name-and-address" style="color: #1AD598; font-weight: bold">Verified</p>
            </div>            
            <div class="grid grid-nogutter">
              <TextAutoFlagNumber class="col" v-model="mobile_number" />
              <span class="font-bold col" style="color: #1ad598">Verified</span>
            </div>
          </template>
        </Card> -->

        <!-- Payment Method - N/A on API -->
        <!-- <Card class="p-3 shadow-none shadow-1 border-round-xs" style="min-width: 330px"> 
          <template #title>
            <span class="card-title">Payment Method</span>
          </template>
          <template #content>
            <img src="../../assets/images/visa.png"/>
            <p class="mt-2" style="color: #4D4D4D!important; font-size: 12px !important; font-weight: 600 !important;">
              ending in
              <span class="font-bold" style="color: #202020">9751</span>
            </p>
          </template>
        </Card> -->

        <!-- View invoice summary -->
        <Card
          class="p-3 shadow-none shadow-1 border-round-xs relative cursor-pointer"
          style="min-width: 330px"
          @click="
            toast.add({
              severity: 'info',
              summary: 'Sorry',
              detail:
                'We are working on this future please wait it until finish',
              life: 3000,
            })
          "
        >
          <template #title>
            <h1>View invoice summary</h1>
          </template>
          <template #content>
            <span>Find invoice and shipping details here</span>
            <i
              class="pi pi-angle-right absolute top-0 bottom-0 right-0 flex algin-content-center text-3xl mr-3"
              style="align-items: center"
            ></i>
          </template>
        </Card>

        <Card
          class="p-3 shadow-none shadow-1 border-round-xs"
          style="min-width: 330px"
        >
          <template #title>
            <span class="card-title">Order Summary</span>
          </template>
          <template #content>
            <div class="grid grid-nogutter">
              <div class="col-6">
                <span>Sub-total</span>
              </div>

              <div class="col-6">
                <div class="flex gap-3 justify-content-end">
                  <span>AED {{ sub_total }}</span>
                </div>
              </div>

              <!-- <div class="col-6 mt-1">
                <span>VAT</span>
              </div>

              <div class="col-6 mt-1">
                <div class="flex gap-3 justify-content-end">
                  <span>AED {{ vat_amount }}</span>
                </div>
              </div> -->

              <div class="col-6 mt-1">
                <span class="">VAT</span>
              </div>

              <div class="col-6 mt-1">
                <div class="flex gap-3 justify-content-end">
                  <span
                    v-if="delivery_method == 'Self Pickup'"
                    class="font-bold"
                    >NA
                  </span>
                  <span v-else> AED {{ delivery_amount }} </span>
                </div>
              </div>

              <div class="col-6 mt-1">
                <span class="">
                  <span class="card-title">Total</span>
                </span>
              </div>

              <div class="col-6 mt-1">
                <div class="flex gap-3 justify-content-end">
                  <span class="card-title">AED {{ grand_total }}</span>
                </div>
              </div>
            </div>
          </template>
        </Card>
        <div class="text-right">
          <Button
            v-if="current_status != 'Ready to Ship'"
            @click="Next_Step"
            label="Proceed to Next Step"
          />
        </div>
        <Dialog v-model:visible="DialogShipmentDetail"  header="Selected Shipment Details" :style="{ width: '30rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div class="flex align-items-center justify-content-between">
            <div class="">
              <div class="flex flex-column">
              <label for="shipmentArea" class="label font-Bolder">Shipment Area</label>
              {{shipment_selected_area}}
              <Dropdown name="shipmentArea" v-model="form.shipment_selected_area" :options="shipment_area_code_list" optionLabel="location_name"  placeholder="Choose Shipment Area" class="w-full form-control">
              </Dropdown>
            </div>
          </div>
          <div class="">
            <div class="flex flex-column">
              <label for="shipmentDate" class="label font-Bolder">Shipment Date</label>
              <DatePicker dateFormat="dd/mm/yy"  name="shipmentDate"  class="custom-date-picker w-full" :showOnFocus="false"   :showIcon="true" v-model="form.shipment_selected_date"/>
            </div>
           
           
          </div>
          </div>
          <div class="text-right mt-5">
          <Button @click="Create_shipment" label="Create Shipment" :loading="loading"/>
        </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment-timezone"

import {
  GetOrder,
  PutOrderStatus,
  CreateShipment,
  GetUserByID,
} from "@/services/orders/view_with_details"

import { data_order_list as d_ol } from "@/dummyData/orders/orders_detail"
import { customer_order as d_co } from "@/dummyData/customers/customer_order"
import shipment_area_code_list from "@/json/shipment_area_code.json";

import { useToast } from "primevue/usetoast"
const toast = useToast()

const route = useRoute()

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

const class_page = ref({
  parent: "flex flex-col md:flex-row gap-3 h-full",
  left_side: "flex-1 flex flex-column",
  right_side: "w-full md:w-25rem card p-0",

  time_line: "card flex mb-3",
})
const class_sidebar = ref({
  parent: "flex gap-3 flex-column",
  left_side: "flex-1 flex flex-column",
  right_side: "w-full md:w-25rem card p-0",

  time_line: "card flex mb-3",
})

const props = defineProps({
  _id: {
    type: String,
    default: "",
  },
  sidebar_view: {
    type: Boolean,
    default: false,
  },
})

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
const data_TableData = ref(d_ol)
const customer_order = ref(d_co)
// const data_current_user = ref(d_cu)
const data_page = ref(1)

const limit_DataTable = ref(5)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first = ref(1)

const target = ref(null)
const targetIsVisible = ref(false)

const mobile_number = ref("+971-52 6813408")
const current_status = ref("DELIVERED")
const Cards_list = ref([
  {
    key: "Order Status",
    value: { tag: current_status.value },
  },

  {
    key: "Customer Name",
    value: "",
  },

  {
    key: "Grand Total",
    value: "",
  },

  {
    key: "Order Type",
    value: "",
  },

  {
    key: "Order Placed by",
    value: "",
  },
  {
    key: "Delivery Method",
    value: "",
  },
  {
    key: "Order Date",
    value: "",
  },
  {
    key: "Purchase Mode",
    value: "",
  },
])

const expandedRows = ref()

const dd_RowsPerPage = ref(limit_DataTable.value)

const customer_name = ref("Customer Name")
const flat = ref()
const street = ref()
const city = ref()
const sub_total = ref(222.5)
const vat_amount = ref(33)
const delivery_amount = ref(2)

const delivery_method = ref("not from api")
const form = reactive({
  shipment_selected_area: "",
  shipment_selected_date: "",
})
const loading = ref(null)

// ---------------------------------------------------------------
// # Setup Components Data
const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const StepperCustom_items = ref([
  {
    is_active: true,
    name: "Order Received",
    is_complete: false,
  },

  {
    is_active: false,
    name: "Processing",
    is_complete: false,
  },

  {
    is_active: false,
    name: "Ready to Ship",
    is_complete: false,
  },
])
// ## for displays
const order_number = ref("")

const DialogShipmentDetail = ref(null)
// ---------------------------------------------------------------
// Functions For design

const changePage = (paramPage) => {
  page_DataTable.value = paramPage.page + 1
}

const getSeverity = (item) => {
  switch (item) {
    case "OVERDUE":
      return {
        color: "#F3654A",
        backgroundColor: "#F3654A33",
      }

    case "Processing":
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
// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets varables intgrations

// ## resets Components Control for intgrations
// data_users_list.value = []

// ## Watch's for API Integration

watch(current_status, (newVal) => {
  if (newVal) {
    switch (newVal) {
      case "New Order":
        break

      case "Processing":
        StepperCustom_items.value[0].is_active = false
        StepperCustom_items.value[0].is_complete = true
        StepperCustom_items.value[1].is_active = true
        break
      case "Ready to Ship":
        StepperCustom_items.value[0].is_active = false
        StepperCustom_items.value[0].is_complete = true
        StepperCustom_items.value[1].is_active = false
        StepperCustom_items.value[1].is_complete = true

        StepperCustom_items.value[2].is_active = false
        StepperCustom_items.value[2].is_complete = true

        break

      default:
        break
    }
  }
})


// ## Functions For API Integration
function get_id() {
  if (props._id) {
    return props._id
  } else {
    return route.query?._id
  }
}

function formatDate(dateString, format) {
  let date = new Date(dateString)
  let day = date.getDate().toString().padStart(2, "0")
  let month = (date.getMonth() + 1).toString().padStart(2, "0") // Months are zero based
  let year = date.getFullYear()

  // Define months array for converting numeric month to string
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  // Determine the delimiter based on the format string
  let delimiter = format.includes("/") ? "/" : format.includes("-") ? "-" : " "

  // Split the format string into components
  let formatComponents = format.split(delimiter)

  // Create a new date string based on the format
  let formattedDate = formatComponents
    .map((component) => {
      switch (component) {
        case "dd":
          return day
        case "mm":
          return month
        case "MM":
          return months[date.getMonth()]
        case "yyyy":
        case "YYYY":
          return year
        default:
          return component // Return the original component if it's not recognized
      }
    })
    .join(delimiter)

  return formattedDate
}

const Next_Step = () => {

  if (current_status.value == 'Processing') {
    DialogShipmentDetail.value = true
  } else {
    PutOrderStatus({}, get_id(), { status: current_status.value }).then(() => {
      handleApi().then((res) => {
        handleData(res)
      })
    })
  }

}


// Function to create shipment
const Create_shipment = () => {
if(form.shipment_selected_date == '' || form.shipment_selected_area.location_code == '' ){
  toast.add({
      severity: "error",
      summary: "Please fill the required Field",
      detail: "",
      life: 1000
    })
}
if (current_status.value == 'Processing') {
  loading.value = true
  PutOrderStatus({}, get_id(), { status: current_status.value }).then(() => {
    const shipment_body = {
    "delivery_date": form.shipment_selected_date,
    "order_id": get_id(),
    "location_code": form.shipment_selected_area.location_code, 
    "location_name": form.shipment_selected_area.location_name,
    "ready_at_time":"06:00",
    "comments":"handle with care"
  }
    CreateShipment(shipment_body ).then(() => {
      
    handleApi().then((res) => {
      handleData(res)
      toast.add({
      severity: "success",
      summary: "Shipment Created Successfully",
      detail: "",
      life: 1000
    })
      DialogShipmentDetail.value = false
      loading.value = false
    })
  })
  })
} 

}
// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return GetOrder({}, get_id())
}
const address = ref("")
const grand_total = ref("")
const area = ref("")
// const city = ref('');

// handleData for display data from api
const handleData = (res) => {
  // if (data){
  //   return undefined
  // }

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

  // data_users_list.value = data_users_list.value.concat(res.results)
  // data_current_user.value = data_users_list.value.find(
  //   (item) => item._id == route.query._id
  // )

  current_status.value = res.status

  order_number.value = res.order_number
  Cards_list.value[0].value.tag = current_status.value
  Cards_list.value[1].value = `${res.user_list.first_name} ${res.user_list.last_name}`
  Cards_list.value[2].value = res.grand_total
  Cards_list.value[3].value = res.added_method

  // 653a2df3cb6da1f6836e707a

  GetUserByID({}, res.created_by).then((res) => {
    Cards_list.value[4].value = `${res.first_name} ${res.last_name}`
  })
  Cards_list.value[5].value = res.delivery_method
  delivery_method.value = res.delivery_method

  // This code to change the date format

  var date = new Date(res.created_at)
  var options = { day: "numeric", month: "short", year: "numeric" }
  var newDateFormat = new Intl.DateTimeFormat("en-US", options).format(date)

  Cards_list.value[6].value = newDateFormat

  Cards_list.value[7].value = res.payment_method

  // customer_name.value = res?.location?.name
  customer_name.value = `${res?.user_list?.first_name} ${res?.user_list?.last_name}`
  // flat.value = res.location.flat
  // street.value = res.location.street
  area.value = res.location.area
  city.value = res.location.city

  address.value = res?.location?.address
  let _ = `+ ${res?.user_list?.country_code} ${res?.user_list?.mobile}`
  mobile_number.value = _

  sub_total.value = res.sub_total.toFixed(2)
  vat_amount.value = res.vat_amount
  delivery_amount.value = res.delivery_amount.toFixed(2)
  grand_total.value = res.grand_total.toFixed(2)

  data_TableData.value = res.order_products.map((item) => ({
    _id: item.draw_id,
    items: {
      title: item.draw_list.product_list.brand,
      subtitle: item.draw_list.product_list.description,
      image: item.draw_list.product_list.image_urls[0],
    },
    sku_no: item.draw_list.product_list.sku, // NO_API
    draw_id: item.draw_list.code,
    expected_draw_date: formatDate(item.draw_list.draw_date, "yyyy-mm-dd"), // NO_API
    qty: item.quantity,
    price: item.draw_list.product_list.selling_price, // NO_API

    expansion: {
      total_tickets: item.draw_list.tickets.length,
      ticket_lists: item.draw_list.tickets.map((item) => ({
        ticket_no: item.ticket_number,
        issue_on: moment(item.created_at).format("DD MMM YYYY, hh:mm A"),
      })),
    },
  }))

}

onMounted(() => {
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

  // get_Customers_list({}).then((res) => {
  //   // let val = res?.data.map((item) => ({
  //   //   label: item?.matter_name,
  //   //   id: item?.id,
  //   // }));
  // })

  GetOrder({}, get_id()).then((res) => {
    // data_current_user.value = res
  })

})

const toggle = (event) => {
  menu.value.toggle(event)
}

function card_click_action() {
  toast.add({
    severity: "info",
    summary: "Sorry",
    detail: "We are working on this future please wait it until finish",
    life: 3000,
  })

}
</script>
<style lang="scss">
.customer__card {
  min-height: 82vh !important;
  max-height: 82vh !important;
}

.card_ScrollWrapper {
  min-height: 72vh !important;
  max-height: 72vh !important;
  overflow: auto !important;
}

.card_ScrollWrapper::-webkit-scrollbar {
  display: none !important;
}

.custom_card {
  min-height: 80vh !important;
  max-height: 80vh !important;
  overflow: auto !important;
}

.custom_card::-webkit-scrollbar {
  display: none !important;
  /* for Chrome, Safari, and Opera */
}

.p-button-transparent {
  background-color: transparent !important;
  border: 1px solid #e2e7f1 !important;
}

.active {
  background-color: #3494ff !important;

  span {
    color: #ffff !important;
  }
}

.action_wrap {

  // width: 30% !important;
  .custom_search input {
    padding: 0.5rem !important;
    padding-left: 2rem !important;
  }
}

.customer_filter_btn {
  padding: 0.25rem 0.95rem !important;
}

.add_customer_btn {
  width: 11rem;
  height: 100%;
  justify-content: center;
}

.p-tabview-title {
  font-size: 16px !important;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none !important;
}

.p-tabview .p-tabview-panels {
  padding: 0 !important;
}

.customer_dropdown .p-dropdown {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  user-select: none;
  border: none;
  width: 12rem !important;
}

.customer_dropdown .p-dropdown .p-dropdown-label {
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #000000 !important;
}

.customer_dropdown .p-dropdown:not(.p-disabled).p-focus {
  box-shadow: none !important;
}

.customer_dropdown .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  border-radius: 18px !important;
  padding: 18px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #ffff !important;
}

.customer_dropdown .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  border-radius: 18px !important;
  padding: 18px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
}

.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  //justify-content: center;
  font-weight: bold;
  padding: 0 1rem;
}
</style>

<style lang="scss" scoped>
.Card :deep(.p-card-body) {
  width: 100% !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Card :deep(.p-card-content) {
  width: 100%;
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
</style>

<style lang="scss">
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

.Card.p-card {
  background: #f9fafb;
  font-size: small !important;

  h5 {
    font-size: small;
  }
}

.dataTable_image {
  width: 45px;
  height: 45px;
}

.expansion-container {
  width: 100%;
  padding-left: 64px;
  padding-right: 24px;
}

.tickets-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 24px;
  align-items: center;
}

.ticket-details {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-title {
  font-weight: bold;
  color: #000027;
  font-size: 16px;
}

.name-and-address {
  color: #4e4e4e;
  font-size: 14px !important;
  font-weight: 500;
}
</style>
