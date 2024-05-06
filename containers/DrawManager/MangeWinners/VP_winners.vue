<template lang="">
    <div class="wrapper-column">
  
      <!-- DataTable -->
      <div class="item expand overflow-y-auto">
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
        <template #empty> 
          <h2 class="text-center">No data found.</h2> </template>
        <Column header="Winner Name" style="color: black">
              <template #body="slotProps">
                <ListAvatar2
                  :border_bottom_bool="false"
                  :first_name="slotProps.data.winner_name.first_name"
                  :last_name= "slotProps.data.winner_name.last_name"
                  :image="slotProps.data.winner_name.image"
                  style="transform: translate(0px, 0)"
                />
              </template>
            </Column>
          <Column field="customer_id" header="Customer ID" class="text-center">
          </Column>
          <Column field="ticket_id" header="Ticket ID" class="text-center"> </Column>
          <Column field="valyou_point" header="Valyou Point" class="text-center"> </Column>
          <Column field="claim" header="Claim" class="text-center"> </Column>
          <Column field="claim_details" header="Claim Details" class="text-center">
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-center h-full w-full">
                
  
                <Button
                    v-if="slotProps.data.claim_details"
                    class="p-2 font-size-small"
                    link
                    style="
                      transform: translate(0px, 0px);
                      text-decoration: underline;
                    "
                    >View Details</Button
                  >
  
                  <span style="color:black" v-else>
                  NA
                </span>
  
              </div>
            </template>
          </Column>
  
          <Column field="quantity" header="SM Post" class="text-center" v-if="type !== 'Order Draw'"> 
              <template #body="slotProps">
                <div class="w-full text-center flex align-items-center justify-content-center gap-2">
                  
  
                  <!-- <Button
                    class="p-2 font-size-small"
                    link
                    style="
                      transform: translate(0px, 0px);
                      text-decoration: underline;
                    "
                    @click=""
                    >View Link</Button> -->

                    <Button
                  class="p-2 font-size-small"
                  link
                  style="
                    transform: translate(0px, 0px);
                    text-decoration: underline;
                  "
                  @click="DialogScreenShot = true; screenShot_url = slotProps.data?.social_url?.[0];"
                  >View Screenshot</Button>
                </div>
              </template>
          </Column>
        </DataTable>
      </div>
  
      <!-- Paginator -->
      <div class="item" v-if="data_TableData.length">
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
      <Dialog v-model:visible="DialogScreenShot" modal header="View Screenshot" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="mt-0" v-if="!(screenShot_url)">...</p>
    <div v-else class="flex align-items-center justify-content-center">
        <Image :src="screenShot_url ? screenShot_url : 'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg'" alt="Image" height="250" style="width:min-content" preview  />
      </div>

  </Dialog>
    </div>
  </template>
  <script setup>
  // ---------------------------------------------------------------
  // # Imports Section
  import { reactive, provide, inject } from 'vue'; // for set connection with parents & children's 
  
  
  // ## <- services imports ->
  
  import {
  GetVPAnnouncementList,
} from "@/services/draw_manager/free_draw/details"
  
  // ## <- dummyData imports ->
  
  import {
    data_TableData as d_td
  } from "@/dummyData/DrawManger/MangeWinners/vp_winners_list_tb"
  
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
  
  
  const toast = useToast();
  const router = useRouter();
  const route = useRoute();
  
  // const state = inject('sharedState'); // get reactive data from parent
  // to be able to interact with both components, whether the parent or the child, any changes you make in one of the components will be updated in the other. 
  // in parent you should to add 
  `
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
    type: {
      type: String,
      default: '',
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
      
    }
  })
  
  
  watch(container_Data, (newVal) => {
    emit("update:data", newVal)
  })
  
  
  const route_query_id = computed(()=>route.query?._id)
  watch(route_query_id, (val)=>{
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
  const DialogScreenShot = ref(false);
  const screenShot_url = ref('');
  
  // <- Data Table settings ->
  const data_TableData = ref(d_td) // or  [1, 2, 3, 4]
  const limit_DataTable = ref(5)
  const page_DataTable = ref(1)
  const totalRecords_DataTable = ref(100)
  const first_DataTable = ref(1)
  const dd_RowsPerPage = ref(limit_DataTable.value)
  
  const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])
  
  const Menu_table = ref(null);
  
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
  data_TableData.value = [];
  
  // ## Watch's for API Integration
  
  // ## Functions For API Integration
  
  // ## Submit Form
  
  // ## onMounted // when we call the api
  
const handleApi = () => {
  // handel data here from input controls before send it

	
  // return function from services as $fetch Promise 
  // Example 
  //  return get_data_from_api();

  return GetVPAnnouncementList( 
    {
      page: page_DataTable.value,
      limit: dd_RowsPerPage.value,
      sortBy: "created_date",
    }
    ,
    route.query?._id
    );
};

// handleData for display data from api
const handleData = (data) => {
  if (data == undefined){
    return undefined
  }

  // Example
  totalRecords_DataTable.value = data.valyou.totalResults;

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
  


  if (data.valyou) {
    data_TableData.value = data.valyou.results.map((item) => ({
      _id: item.user_id,
      winner_name: {
        first_name: item.name,
        last_name: item.lastName,
        image: item.imageUrl,
      },

      customer_id: item.customer_id,
      ticket_id: item.ticket_Number,
      valyou_point: `${item?.prize_amount} VP`,
      claim: "In person", // Online // NoAPI
      claim_details: "", // NoAPI
      // sm_post:"",

      social_url: item?.social_url,

      ticket_id_ob: item?.ticket_id,
    }))
  }else{
    data_TableData.value = []
  }
};

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi ) {

    handleApi().then((res) => {
        handleData(res);
      });

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
  
  </style>
  