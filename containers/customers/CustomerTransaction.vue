<template lang="">
  <div class="grid h-full">
    <div class="col-12 flex gap-4">
      <Card class="Card shadow-1 w-4 p-3">
        <template #content>
          <div class="flex align-items-center gap-3">
            <div class="flex">
              <Avatar
                icon="pi pi-wallet"
                style="color: #0090ff; background: #0090ff26"
              />
            </div>
            <div class="flex flex-column">
              <h6 class="text-gray">Available Valyou Points</h6>
              <h3 class="font-bold">1540 Points</h3>
            </div>
          </div>
        </template>
      </Card>

      <Card class="Card shadow-1 w-4 p-3">
        <template #content>
          <div class="flex align-items-center gap-3">
            <div class="flex">
              <Avatar
                icon="pi pi-dollar"
                style="color: color: rgb(26, 213, 152);background: rgb(26 213 152 / 17%);"
              />
            </div>
            <div class="flex flex-column">
              <h6 class="text-gray">Total Lifetime Savings</h6>
              <h3 class="font-bold">AED 178</h3>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-12">
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
      >
        <Column field="transaction_no" header="Transaction No" class="text-center">
        </Column>

        <Column
          header="Payment Method"
          class="text-center"
          style="color: black"
          field="payment_method.name"
        >
          <!-- <template #body="slotProps">
            <div class="w-full text-center">
              <ListAvatar2
                :border_bottom_bool="false"
                text="name"
                :is_circle="false"
                style="transform: translate(33px, 0)"
              />
            </div>
          </template> -->
        </Column>
        <Column field="amount" header="Amount" class="text-center"> </Column>

        <Column field="quantity" header="Status" class="text-center">
          <template #body="slotProps">
            <div class="w-full text-center">
              <Tag
                class="p-0 font-size-small font-bold"
                :value="'safsadf'"
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
                @click=""
                >View Invoice</Button
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

import {  data_order_list as d_ol} from "@/dummyData/orders/containers/order_transaction";

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))


// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template
// <Toast position="top-right" />

const toast = useToast();
const router = useRouter();
const route = useRoute();


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
});

const emit = defineEmits(["update:data"]);
const container_Data = computed({
  // getter
  get() {
    return props.data
  },
  // setter
  set(newValue) {
    emit("update:data", newValue)
    
  }
});


watch(container_Data, (newVal) => {
  emit("update:data", newVal)
});

const route_query_id = computed(()=>route.query?._id)
watch(route_query_id, (val)=>{
  onAPI_call()
})

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


// <- Data Table settings ->
const data_TableData = ref(d_ol)
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


// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form

// ## onMounted // when we call the api


const handleApi = () => {
  // handel data here from input controls before send it

	
  // return function from services as $fetch Promise 
  // Example 
  //  return get_data_from_api();

  return Promise.resolve();
};

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
};

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi ) {

    // handleApi().then((res) => {
    //     handleData(res?.data);
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

onAPI_call()

onMounted(() => {
  // onAPI_call()
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
</style>
