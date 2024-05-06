<template lang="">
  <div class="grid h-full">
    <div class="col-12">
      <!-- {{data_TableData.results}} -->
      <DataTable
        class="DataTable"
        stripedRows
        :lazy="true"
        resizableColumns
        columnResizeMode="fit"
        showGridline
        :value="data_TableData?.results"
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
        <template #empty>
          <p style="text-align: center; font-size: 14px !important">No data</p>
        </template>
        <Column header="Order No" class="text-center">
          <template #body="slotProps">
            <p class="order-number">{{ slotProps.data.order_number }}</p>
          </template>
        </Column>
        <Column
          field="delivery_method"
          header="Delivery Method"
          class="text-center"
        >
        </Column>
        <Column header="Date of Order" class="text-center">
          <template #body="slotProps">
            {{ moment(slotProps?.data?.created_at).format("DD-MM-YYYY") }}
          </template>
        </Column>

        <!-- API NOT AVAILABLE FOR DELIVERY DATE -->
        <!-- <Column
          field="delivery_date"
          header="Delivery Date"
          class="text-center"
        >
        </Column> -->

        <Column field="status" header="Status" class="text-center">
          <template #body="slotProps">
            <div class="w-full text-center">
              <Tag
                class="p-0 font-size-small font-bold"
                :value="slotProps?.data?.status"
                style="
                  font-size: 12px !important;
                  min-width: 3.5rem;
                  padding: 3px !important;
                  padding-left: 6px !important;
                  padding-right: 6px !important;
                "
                :style="getSeverity(slotProps?.data?.status)"
              />
            </div>
          </template>
        </Column>
        <Column field="quantity" header="Actions" class="text-center">
          <template #body="slotProps">
            <div class="w-full text-center">
              <Button
                class="p-2 font-size-small"
                link
                style="
                  transform: translate(0px, 0px);
                  text-decoration: underline;
                "
                @click="
                  () => {
                    order_no = slotProps?.data?.order_number
                    order_id = slotProps?.data?._id
                    SideBarVisible = !SideBarVisible
                  }
                "
                >View Order</Button
              >
            </div>
          </template>
        </Column>
      </DataTable>
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
    <SidebarPrime
      v-model:visible="SideBarVisible"
      position="right"
      :showCloseIcon="false"
      class="proposalSidebar InvoicesSideBar"
      style="width: 52%"
      :pt="{
        header: {
          style: 'justify-content: start',
        },
      }"
    >
      <template #header>
        <div class="flex align-items-center gap-2 w-full">
          <TextIconTitle
            icon_x="0px"
            icon_y="2px"
            text_class="font-bold"
            :text="order_no"
            @click="SideBarVisible = false"
          />
        </div>
      </template>
      <div class="separator"></div>
      <keep-alive :max="5">
        <lazyComponent :super_lazy="true">
          <Orders_View :_id="order_id" :sidebar_view="true" />
        </lazyComponent>
      </keep-alive>
    </SidebarPrime>
    <!-- <Toast position="top-right" /> -->
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

// import {
//   data_current_user as d_cu,
//   data_user_list as d_ul,
// } from "@/dummyData/customers/customers_detail"

import { data_order_list as d_old_ol } from "@/dummyData/orders/containers/order_history"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

const Orders_View = defineAsyncComponent(() =>
  import("@/pages/orders/view_with_details.vue")
)

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY
import { ref } from "vue"
import { useToast } from "primevue/usetoast"
import { getDataTable_list } from "@/services/orders"
import moment from "moment"
// You should to make shore this Components added to your template
// <Toast position="top-right" />

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
    emit("update:data", newValue)
  },
})

watch(container_Data, (newVal) => {
  emit("update:data", newVal)
})

watch(
  () => route.query?._id,
  async (val) => {
    onAPI_call()
  }
)

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

// const inp_Search = ref("");

// <- Data Table settings ->
const data_TableData = ref() // or  [1, 2, 3, 4]
const limit_DataTable = ref(10)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first_DataTable = ref(1)
const dd_RowsPerPage = ref(limit_DataTable.value)

watch(dd_RowsPerPage, (newVal) => {
  if (limit_DataTable.value != newVal) {
    limit_DataTable.value = newVal
    onAPI_call()
  }
})

const dd_RowsPerPage_items = ref([limit_DataTable.value, 10, 20, 30])

// const Menu_table = ref(null);

const changePage = (paramPage) => {
  page_DataTable.value = paramPage.page + 1

  onAPI_call()
}

const getSeverity = (item) => {
  switch (item) {
    case "Delivered":
      return {
        color: "#1AD598",
        backgroundColor: "#1AD59820",
      }

    case "In Process":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53620",
      }

    default:
      return {
        color: "#1AD598",
        backgroundColor: "#1AD59820",
      }
  }
}

// This makes it recursive
watch(page_DataTable, () => {
  // onAPI_call()
})

watch(dd_RowsPerPage, () => {
  onAPI_call()
  router.replace({
    path: route.path,
    query: {
      _page: page_DataTable.value,
      _limit: limit_DataTable.value,
      _id: route.query?._id,
    },
  })
})

// ## for displays
const SideBarVisible = ref(false)
const order_id = ref(null)
const order_no = ref("")

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

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();
  if (route.query?._id) {
    const data = getDataTable_list({
      match_values: {
        user_id: route.query?._id,
      },
      limit: limit_DataTable.value,
      page: page_DataTable.value,
      sortBy: "_id:-1",
      searchText: "",
    })
    return data
  }

  return Promise.resolve()
}

// handleData for display data from api
const handleData = (data) => {
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

  data_TableData.value = data
  totalRecords_DataTable.value = data?.totalResults
}

// <- call api ->

const onAPI_call = async () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this

  if (!props.disableApi) {
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

// onAPI_call()

onMounted(() => {
  onAPI_call()
})
</script>

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

.order-number {
  text-decoration: underline;
  color: #0090ff;
  font-weight: 600;
  font-size: 14px !important;
}

.separator {
  transform: scaleX(1.2);
  border-bottom: solid 1px #e2e7f1;
}
</style>
