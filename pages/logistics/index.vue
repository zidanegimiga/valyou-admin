<template lang="">
  <div class="wrapper-column gap-3 overflow-y-auto">
    <div class="item">card space</div>
    <div class="item expand">
      <div class="wrapper-column card">
        <div class="item wrapper-row">
          <div class="item expand flex align-items-center">
            <h5 class="font-bold">All Shipments</h5>
          </div>
        </div>
        <!-- display datatable and msg -->
        <div class="item expand">
          <!-- msg there is no data -->
          <div
            v-if="there_is_NoData"
            class="h-full flex align-items-center justify-content-center"
          >
            <div
              style="
                background: #f4f6f8;
                border: 1px solid #f4f6f8;
                border-radius: 5px;
              "
              class="p-4 text-center"
            >
              <h4 class="font-bold mb-2">No Shipment Created</h4>
              <p>
                There is no shipment created yet. Please create and add orders in
                it to deliver to the respective customer.
              </p>
              <p>
                You can select orders from list below and add it in shipment to
                proceed.
              </p>
            </div>
          </div>
          <div class="pt-3 h-full overflow-y-auto">
            <DataTable
              class="DataTable h-full"
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
              <Column
                field="shipment_id"
                header="Shipment Id"
                class="text-center"
              >
              </Column>
              <Column
                field="awb_number"
                header="AWB Number"
                class="text-center"
              >
              </Column>
              <Column
                field="date_of_shipment"
                header="Shipment Date"
                class="text-center"
              >
              </Column>
  
              <Column field="status" header="Status" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Tag
                      class="p-0 font-size-small font-bold"
                      :value="slotProps.data.carrier_status"
                      style="
                        font-size: 12px !important;
                        min-width: 3.5rem;
                        padding: 3px !important;
                        padding-left: 6px !important;
                        padding-right: 6px !important;
                      "
                      :style="getSeverity('slotProps.data')"
                    />
                  </div>
                </template>
              </Column>
              <Column field="carrier_status" header="Sky Express Status" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Tag
                      class="p-0 font-size-small font-bold"
                      :value="slotProps.data.carrier_status"
                      style="
                        font-size: 12px !important;
                        min-width: 3.5rem;
                        padding: 3px !important;
                        padding-left: 6px !important;
                        padding-right: 6px !important;
                      "
                      :style="getSeverity('slotProps.data')"
                    />
                  </div>
                </template>
              </Column>
              <Column field="carrier_status" header="Sync Status" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Tag
                      class="p-0 font-size-small font-bold"
                      :value="slotProps.data.sync_status"
                      style="
                        font-size: 12px !important;
                        min-width: 3.5rem;
                        padding: 3px !important;
                        padding-left: 6px !important;
                        padding-right: 6px !important;
                      "
                      :style="getSeverity('slotProps.data')"
                    />
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
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
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section

// ## <- services imports ->

// import {
//   get_Customers_list,
//   GetCustomer,
// } from "@/services/customers/view_with_details"

// ## <- dummyData imports ->

import { data_TableData as d_td } from "@/dummyData/logistics/shipments_tb"
import { getDataTable_list } from "@/services/logistics/index.js"
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

// ## for displays
const there_is_NoData = ref(false)

// <- Data Table settings ->
const data_TableData = ref(d_td) // or  [1, 2, 3, 4]
const limit_DataTable = ref(5)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first_DataTable = ref(1)
const dd_RowsPerPage = ref(limit_DataTable.value)

const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

// const Menu_table = ref(null);

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

// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // var sort_by_id = "";
  // if (MenuPopFilterSelects_filter_sort.value[0].selectedItems == "Newest date of order") {
    
  //   sort_by_id = "_id:-1";
  // }
  // else{
  //   sort_by_id = "_id:1";
  // }


  // GetStatusCount().then((res)=>{
  //   Cards_list.value = res;
  //   Cards_list_key.value = Object.keys(res);

  //   // Cards_list_key_res.forEach(key => {
  //   //   console.log("key:",key)
  //   //   Cards_list[key] = Cards_list_res[key]
  //   // });
  //   console.log("res:",res);
  // })

  return getDataTable_list({
    searchText: '',
    match_values: {
      // status: MenuPopFilterSelects_filter.value[0].selectedItems,
    },
    // sortBy:sort_by_id,

    page: page_DataTable.value,
    limit: limit_DataTable.value,
  });

};

// handleData for display data from api
const handleData = (data) => {
  console.log(data,"results")
  data_TableData.value = data?.results.map((item) => ({
    _id: item._id,
    shipment_id: item.shipment_number,
    awb_number : item.awb_number,
    date_of_shipment: formatDate(item?.created_at ? item?.created_at : item?.created_date, "dd-mm-yyyy"),
    status: item.status,
    carrier_status: item.carrier_status,
    sync_status: item.sync_status
  }))
}

function formatDate(dateString, format) {
    let date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero based
    let year = date.getFullYear();

    // Define months array for converting numeric month to string
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Determine the delimiter based on the format string
    let delimiter = format.includes('/') ? '/' : format.includes('-') ? '-' : ' ';

    // Split the format string into components
    let formatComponents = format.split(delimiter);

    // Create a new date string based on the format
    let formattedDate = formatComponents.map(component => {
        switch(component) {
            case 'dd':
                return day;
            case 'mm':
                return month;
            case 'MM':
                return months[date.getMonth()];
            case 'yyyy':
            case 'YYYY':
                return year;
            default:
                return component; // Return the original component if it's not recognized
        }
    }).join(delimiter);

    return formattedDate;
}

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    // handleApi().then((res) => {
    //     handleData(data);
    //   });
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

// onAPI_call()

onMounted(() => {
  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }
})
</script>
<style lang="scss">
button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-outlined.custom__icon_btn.shady-btn {
  color: #ced6e3;
}

span.p-button-icon.pi.pi-filter {
  color: #878e99;
}
</style>

<!-- data table -->
<style lang="scss">
.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
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
