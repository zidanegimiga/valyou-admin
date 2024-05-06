<template lang="">
  <div class="wrapper-column">
    <!-- Heading & add new btn -->
    <div class="item card">
      <div class="wrapper-row">
        <div class="item">
          <div class="flex align-items-center h-full">
            <h3 class="font-bold">Customers List</h3>
          </div>
        </div>
        <div class="item expand"></div>
        <div class="item">
          <div class="flex align-items-center h-full">
            <NuxtLink to="/customers/SaveCustomer">
              <Button label="New Customer" icon="pi pi-plus" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="item mt-3 expand card">
      <div class="wrapper-column">
        <div class="item">
          <div class="flex align-items-center h-full">
            <div class="wrapper-row gap-2 align-items-center">
              <div class="item">
                <span
                  id="inp_Search"
                  style="width: 240px"
                  class="p-input-icon-left"
                >
                  <i class="pi pi-search" />
                  <InputText
                    v-model="inp_Search"
                    placeholder="Search by customer name"
                  />
                </span>
              </div>
              <div class="item">
                <MenuPopFilterSelects
                  :inherent_attrs="true"
                  severity="secondary"
                  :items="MenuPopFilterSelects_filter"
                  @clear="btn_filter_clear"
                  @submit="btn_filter_submit"
                />
              </div>
              <div class="item expand"></div>
              <div class="item"></div>
            </div>
          </div>
        </div>

        <div class="item mt-2 expand min-h-[650px]" style="minHeight: 650px">
          <PrimeUpdateDataTable
          
            class="customers_table"
            wrapper_class="pr-2"
            stripedRows
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            :value="data_TableData"
            :rows="limit_DataTable"
            tableStyle="min-width: 30rem"
            @update:rows="(d_rows) => (limit_DataTable = d_rows)"
            @update:first="
              (d_first) => {
                page_DataTable = d_first / limit_DataTable + 1
                first = d_first
              }
            "
          >
            <Column header="Customer Name" style="color: black">
              <template #body="slotProps">
                {{ slotProps.data.customer.first_name }}
                {{ slotProps.data.customer.last_name }}
                <!-- <ListAvatar2
                  :first_name="slotProps.data.customer.first_name"
                  :last_name="slotProps.data.customer.last_name"
                  :image="slotProps.data.customer.image"
                  style="transform: translate(57px, 0)"
                /> -->
              </template>
            </Column>
            <Column
              header="Customer ID"
              field="customer_id"
              style="color: black"
            >
            </Column>

            <Column
              header="Registration Source"
              field="registration_source"
              style="color: black"
            >
            </Column>
            <Column header="Date Added" field="date_added">
              <template #body="slotProps">
                <p style="font-size: 14px !important">
                  {{ slotProps.data.date_added }}
                </p>
              </template>
            </Column>

            <Column header="Status">
              <template #body="slotProps">
                <!-- transform: translate(-22px, 0px); -->
                <Tag
                  class="p-0 font-size-small font-bold"
                  :value="slotProps.data.status"
                  style="
                    font-size: 12px !important;
                    min-width: 3.5rem;
                    padding: 3px !important;
                    padding-left: 6px !important;
                    padding-right: 6px !important;
                  "
                  :style="getSeverity(slotProps.data)"
                />
              </template>
            </Column>

            <Column header="Action" style="color: black">
              <template #body="slotProps">
                <div>
                  <Button
                    class="p-2 font-size-small"
                    link
                    style="
                      transform: translate(-13px, 0px);
                      text-decoration: underline;
                    "
                    @click="
                      $router.push(
                        `/customers/view_with_details?_id=${slotProps.data._id}`
                      )
                    "
                    >View Details</Button
                  >

                  <Button
                    class="p-2 font-size-small"
                    link
                    style="
                      transform: translate(-13px, 0px);
                      text-decoration: underline;
                    "
                    @click="
                      $router.push(
                        `/customers/SaveCustomer?_id=${slotProps.data._id}`
                      )
                    "
                    >Edit</Button
                  >
                </div>
              </template>
            </Column>
          </PrimeUpdateDataTable>
        </div>

        <!-- Paginator -->
        <div class="item">
          <div class="wrapper-row">
            <div class="item">
              <Paginator
                class="Paginator"
                :rows="limit_DataTable"
                :first="first_DataTable"
                :totalRecords="totalRecords_DataTable"
                @page="changePage"
              />
            </div>
            <div class="item expand"></div>
            <div class="item">
              <div class="flex h-full align-items-center">
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
    </div>
  </div>
</template>

<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from "vue" // for set connection with parents & children's
import moment from "moment-timezone"

// ## <- services imports ->

import { getDataTable_list } from "@/services/customers/index.js"

// ## <- dummyData imports ->

import { data_TableData as i_tb } from "@/dummyData/customers/customers_tb"

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
// const CustomerOrder = defineAsyncComponent(()=>import("@/containers/customers/CustomerOrder.vue"));

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

const inp_Search = ref("")
const MenuPopFilterSelects_filter = ref([
  {
    label: "Status",
    modelItems: ["Active", "Inactive"],
    selectedItems: "",
  },
])

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

// ## for displays

// <- Data Table settings ->
const data_TableData = ref(i_tb) // or  [1, 2, 3, 4]

const limit_DataTable = ref(16) // Rows per Pages
const page_DataTable = ref(route.query?._page ? route.query?._page : 1) // the of data table Page
const totalRecords_DataTable = ref(100) // total Records to set the page

const first_DataTable = computed(
  () => page_DataTable.value * limit_DataTable.value - limit_DataTable.value
)

const dd_RowsPerPage = ref(limit_DataTable.value)

watch(dd_RowsPerPage, (newVal) => {
  if (limit_DataTable.value != newVal) {
    limit_DataTable.value = newVal
  }
})

const dd_RowsPerPage_items = ref([limit_DataTable.value, 10, 25, 50])

// const Menu_table = ref(null);

const changePage = (paramPage) => {
  console.log("Params: ", paramPage)
  page_DataTable.value = paramPage.page + 1
  onAPI_call()
  router.replace({
    path: route.path,
    query: { _page: page_DataTable.value, _limit: limit_DataTable.value },
  })
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

watch(dd_RowsPerPage, () => {
  onAPI_call()
  router.replace({
    path: route.path,
    query: { _page: page_DataTable.value, _limit: limit_DataTable.value },
  })
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

// ## Watch's for API Integration
const inp_SearchDebounced = refDebounced(inp_Search, 500)
watch(
  () => inp_SearchDebounced.value,
  (val) => {
    onAPI_call()
  }
)

// ## Functions For API Integration
const btn_filter_submit = (value) => {
  onAPI_call()
}

const btn_filter_clear = (value) => {
  MenuPopFilterSelects_filter.value[0].selectedItems = ""

  onAPI_call()
}
// ## Submit Form

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return getDataTable_list({
    searchText: inp_Search.value,
    match_values: {
      status: MenuPopFilterSelects_filter.value[0].selectedItems,
    },

    page: page_DataTable.value,
    limit: limit_DataTable.value,
  })
}

function handleDateFormatting(date) {
  const formattedDate = new Date(date)
  const day = formattedDate.getDate().toString().padStart(2, "0")
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0")
  const year = formattedDate.getFullYear()
  console.log(`Date: ${day}-${month}-${year}`)

  return `${day}-${month}-${year}`
}

// handleData for display data from api
const handleData = (data) => {
  if (data == undefined) {
    return undefined
  }

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

  data_TableData.value = data?.results.map((item) => ({
    _id: item._id,
    customer: {
      first_name: item.first_name,
      last_name: item.last_name,
      image: item?.image_url ? item?.image_url : "",
    },
    customer_id: item?.code,
    registration_source: item?.registration_source, // no api
    date_added: moment(item.createdAt).format("DD-MM-YYYY"),
    status: item.status,
  }))

  totalRecords_DataTable.value = data?.totalResults
}

// <- call api ->

const onAPI_call = async () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    // reset API data :
    data_TableData.value = []

    await handleApi().then(async (res) => {
      await handleData(res)
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

<style lang="scss">
.customers_table {
  &.p-datatable .p-column-header-content {
    justify-content: flex-start !important;
    padding-inline: 1rem !important;
  }
  .p-datatable-table tbody > tr > td {
    padding: 0.1rem 1rem !important;
  }
}
.deals__leads_details {
  margin-top: 1rem;
}

.deals__section_wrap {
  display: flex;
  flex-direction: column;
}

.default_btn {
  border-color: #e2e7f1 !important;
  color: #000 !important;
}

.primary_btn {
  background: #3394ff !important;
  color: #fff !important;
  border-color: #3394ff !important;
}

#inp_Search {
  i.pi.pi-search {
    color: #8d98a9;
    transform: scale(0.72);
  }

  input.p-inputtext.p-component::placeholder {
    color: #8d98a9;
  }
}

button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-outlined.custom__icon_btn.shady-btn {
  color: #ced6e3;
}

span.p-button-icon.pi.pi-filter {
  color: #878e99;
}

span.p-tag.p-component.p-0.font-size-small.font-bold {
  padding: 5px !important;
  border-radius: 5px;
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

  button:focus {
    box-shadow: 0px 1px 3px #00000029;
  }

  button.p-highlight {
    color: #fff !important;
    background: #0090ff !important;
  }
}

// .DataTable {

// }

.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  // justify-content: center;
  font-weight: bold;
}

// DataTable fix height

.p-datatable-thead {
  position: sticky;
  top: 0;
}

.p-resizable-column {
  background-color: red !important;
}
</style>
