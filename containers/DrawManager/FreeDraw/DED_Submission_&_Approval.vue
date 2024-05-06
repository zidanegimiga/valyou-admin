<template lang="">
  <div class="wrapper-column h-full w-full">
    <!-- Heading & add new btn -->
    <div class="item">
      <div class="wrapper-row pt-1">
        <div class="item expand">
          <div class="flex algin-items-center h-full">
            <h3 class="font-bold">Registered Customers for : {{ Draw_id }}</h3>
          </div>
        </div>
        <div class="item">
          <div class="flex algin-items-center h-full gap-3">
            <Button
              v-if="data_TableData.length"
              label="Export & Submit to DED"
              @click="async () => {
                  let res = await Export_Submit_DED({}, route.query?._id)

                  let _ = res.results.map((item) => ({
                    'Customer Name': item.name + ' ' + item.lastName,
                    'Customer ID': item.customerID,
                    'Customer Email ID': item.email,
                    'Ticket ID': item.ticketId,
                    'Customer Contact': `+${item.countryCode}  ${item.mobileNumber}`,
                    'Video Watched': 'Yes', // Update this as per the actual data
                    'Registration Date': moment(
                      new Date(item.created_date)
                    ).format('YYYY-MM-DD'),
                  }))

                  exportMappedDataToXLSX(
                    _,
                    `Registered Customers for ${Draw_id} - ${moment(
                      new Date()
                    ).format('MMMM YYYY')} File.xlsx`
                  )
                }
              "
              outlined
            />
            <Button
              v-if="type != 'Order Draw' && data_TableData.length >= 5"
              label="Proceed Next"
              @click="async () => {
                  await Proceed_Next(
                    {
                      // ticket_id:''
                    },
                    route.query?._id
                  )
                  state.need_refresh = true
                }
              "
            />
            <Button
              v-if="type == 'Order Draw' && sold == threshold"
              label="Proceed Next"
              @click="async () => {
                  await Proceed_Next(
                    {
                      // ticket_id:''
                    },
                    route.query?._id
                  )
                  state.need_refresh = true
                }
              "
            />
          </div>
        </div>
      </div>
    </div>

    <!-- DataTable -->
    <div class="item expand overflow-y-auto">
      <DataTable
        class="mt-3 DataTable"
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
      >
        <Column header="Customer Name" class="text-center" style="color: black">
          <template #body="slotProps">
            <ListAvatar2
              :border_bottom_bool="false"
              :text="slotProps.data.customer.name"
              :image="slotProps.data.customer.link"
              style="transform: translate(45px, 0)"
            />
          </template>
        </Column>
        <Column field="customer_id" header="Customer ID" class="text-center">
        </Column>
        <Column
          field="customer_email_id"
          header="Customer Email ID"
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
        <Column
          field="registration_date"
          header="Registration Date"
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
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from "vue" // for set connection with parents & children's

// ## <- services imports ->

import {
  GetCustomersList,
  Export_Submit_DED,
  Proceed_Next,
} from "@/services/draw_manager/free_draw/details"

// ## <- dummyData imports ->

import { data_TableData as d_td } from "@/dummyData/DrawManger/FreeDraw/free_draw_details_tb"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import * as XLSX2 from "xlsx/xlsx.mjs"
import moment from "moment-timezone"

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />
import { saveAs } from "file-saver"
// import * as XLSX from 'xlsx-style/xlsx.js';
import ExcelJS from "exceljs"

// ## <- containers Async imports ->

const toast = useToast()
const router = useRouter()
const route = useRoute()

// need_refresh
const state = inject("sharedState") // get reactive data from parent
// to be able to interact with both components, whether the parent or the child, any changes you make in one of the components will be updated in the other.
// in parent you should to add
;`
import { reactive, provide } from 'vue';
// set reactive data from parent
const state = reactive({
  // data or variables 
  customer_type:'dog'
});
provide('sharedState', state);
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
  threshold: {
    type: Number,
  },
  sold: {
    type: Number,
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

// ## for displays
const Draw_id = ref("")

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

// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations

// ## resets Components Control for integrations
data_TableData.value = []
// ## Watch's for API Integration

// ## Functions For API Integration

// This function exports the mapped data to XLSX
async function exportMappedDataToXLSX(mappedData, fileName) {
  var workbook = new ExcelJS.Workbook()
  var worksheet = workbook.addWorksheet("People")

  // Get all the keys from the first object to use as headers
  var headers = Object.keys(mappedData[0])

  // Add the headers to the worksheet
  worksheet.columns = headers.map((header) => ({ header, key: header }))

  // Make the headers bold and add a border
  worksheet.getRow(1).font = { bold: true }
  worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" }
  worksheet.getRow(1).eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    }
  })

  // Add the data to the worksheet
  mappedData.forEach((item, index) => {
    const row = worksheet.addRow(item)
    // Add a border to each cell in the row and align text to center
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      }
      cell.alignment = { vertical: "middle", horizontal: "center" }
    })
  })

  // Adjust column width
  worksheet.columns.forEach((column) => {
    let dataMax = 0
    column.eachCell({ includeEmpty: true }, (cell) => {
      let cellValue = cell.value
      let length = (cellValue && cellValue.toString().length) || 0
      if (length > dataMax) {
        dataMax = length
      }
    })
    column.width = dataMax < 20 ? 20 : dataMax
  })

  // Write the file
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), fileName)
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
      // "search":"572890489212",  // ** Conditional
      page: page_DataTable.value,
      limit: dd_RowsPerPage.value,
      sortBy: "_id",
      filter: {
        type: props.type,
      },
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

  Draw_id.value = data?.["draw code"]

  data_TableData.value = data?.results.map((item) => ({
    _id: item.customer_id,
    customer: {
      name: `${item?.name} ${item?.lastName}`,
      link: item?.imageUrl,
    },
    customer_id: item.customerID,
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
    registration_date: moment(item?.created_date).format("YYYY-MM-DD"),
  }))
}

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    // reset API data :
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
}

onAPI_call()

onMounted(() => {
  // onAPI_call()
})
</script>
<style lang="scss"></style>
