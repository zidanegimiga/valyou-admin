<template lang="">
  <!-- customer list && details -->
  <div class="wrapper-column h-full w-full">
    <div class="wrapper-row h-full gap-3">
      <!-- List items -->
      <div class="item" style="flex: 0.98">
        <div class="h-full">
          <div class="card h-full">
            <div class="wrapper-column gap-2">
              <div class="item">
                <div class="grid">
                  <div class="wrapper-row">
                    <div class="item expand pl-2">
                      <div class="flex w-full h-full align-items-center">
                        <h5 class="font-bold">Customers</h5>
                      </div>
                      
                    </div>
                    <div class="item pr-2">
                      <NuxtLink to="/customers/SaveCustomer">
                        <Button label="New" />
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="flex align-items-center action_wrap">
                      <span
                        id="inp_Search"
                        style=""
                        class="p-input-icon-left w-full"
                      >
                        <i class="pi pi-search" />
                        <InputText
                          v-model="inp_Search"
                          placeholder="Search by customer name"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item expand overflow-y-auto pl-2 pr-2">
                <div class="custom_list">
                  <div v-if="data_users_list.length == 0 && !(state?.data_current_user) && !(state?.keep_current_user)  " class="flex justify-content-center">
                    <span class="w-full text-center font-bold">No Data</span>
                  </div>
                  <!-- This code to hide the current user after searching or clicking on another user -->
                  <template v-for="(item, index) in [state?.data_current_user].concat(data_users_list) " :key="index" >
                    <div v-if="state?.data_current_user._id == item._id && index == 0" >                      
                      <ListInfo                      
                        class="keep_current_user"
                        v-if="state?.keep_current_user"
                        @click="()=>{
                          router.replace({ query: { _id: state?.keep_current_user._id } })                        
                        }"
                        :subtitle="state?.keep_current_user.code"
                        :first_name="state?.keep_current_user.first_name"
                        :last_name="state?.keep_current_user.last_name"
                        :image="state?.keep_current_user.image"
                        :is_active="state?.keep_current_user._id == route.query?._id"
                        :showActive="true"
                      />
                      <ListInfo
                        class="data_current_user"
                        v-else-if="state?.keep_current_user != '' && state?.data_current_user && !first_select_done"
                        @click="()=>{}"
                        :subtitle="item.code"
                        :first_name="item.first_name"
                        :last_name="item.last_name"
                        :image="item._id == route.query?._id ? (state.current_image_url ? state.current_image_url : item.image) :item.image"
                        :is_active="item._id == route.query?._id"
                        :showActive="true"
                      />
                    </div>
                    <div  v-else-if="state?.data_current_user._id != item._id">

                      <ListInfo                      
                        class="users_not_same_id"
                        @click="()=>{
                          if (first_select_done == false) {
                            state.keep_current_user = state?.data_current_user
                          }
                          first_select_done = true
                          
                          router.replace({ query: { _id: item._id } })
                        }"
                        :subtitle="item.code"
                        :first_name="item.first_name"
                        :last_name="item.last_name"
                        :image="item._id == route.query?._id ? (state.current_image_url ? state.current_image_url : item.image) :item.image"
                        :is_active="item._id == route.query?._id"
                        :showActive="state?.keep_current_user?._id != item._id"
                        :image_clickable="false"
                      />
                    </div>
                    <div v-else-if="state?.data_current_user._id == item._id && first_select_done " >
                      <ListInfo                      
                        class="users_same_id"
                        @click="()=>{
                          first_select_done = true
                          router.replace({ query: { _id: item._id } })
                          
                        }"
                        :subtitle="item.code"
                        :first_name="item.first_name"
                        :last_name="item.last_name"
                        :image="item._id == route.query?._id ? (state.current_image_url ? state.current_image_url : item.image) :item.image"
                        :is_active="item._id == route.query?._id"
                        :showActive="state?.keep_current_user?._id != item._id"
                      />

                    </div>
                  </template>

                  <!-- spinner -->
                  <div
                    v-if="isLoading"
                    class="flex justify-content-center align-items-center"
                  >
                    <ProgressSpinner
                      style="width: 50px; height: 50px"
                      strokeWidth="6"
                      fill="transparent"
                    />
                  </div>

                  <div ref="target" >
                    <p style="visibility: hidden">.</p>
                    <!--OBSERVER-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Data -->
      <div class="item" style="flex: 2">
        <div class="card h-full">
          <TabView>
            <!-- Details Tab -->

            <TabPanel header="General">
              <div class="wrapper-column w-full h-full">
                <div class="item expand">
                  <keep-alive :max="10">
                    <lazyComponent :super_lazy="true">
                      <CustomerDetail />
                    </lazyComponent>
                  </keep-alive>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Order History">
              <div class="col">
                <keep-alive :max="10">
                  <lazyComponent :super_lazy="true">
                    <CustomerOrder />
                  </lazyComponent>
                </keep-alive>
              </div>
            </TabPanel>
            <!-- <TabPanel header="Draw Overview">
              <div class="col">Draw Overview</div>
            </TabPanel> -->
            <TabPanel header="Transaction History">
              <div class="col">
                <keep-alive :max="10">
                  <lazyComponent :super_lazy="true">
                    <CustomerTransaction />
                  </lazyComponent>
                </keep-alive>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from 'vue'; // for set connection with parents & children's 


// ## <- services imports ->

import { get_Customers_list } from "@/services/customers/view_with_details"


// ## <- dummyData imports ->

import {
  data_current_user as d_cu,
  data_user_list as d_ul,
} from "@/dummyData/customers/customers_detail"

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
const CustomerOrder = defineAsyncComponent(() =>
  import("@/containers/customers/CustomerOrder.vue")
)
const CustomerTransaction = defineAsyncComponent(() =>
  import("@/containers/customers/CustomerTransaction.vue")
)
const CustomerDetail = defineAsyncComponent(() =>
  import("@/containers/customers/CustomerDetail")
)

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



const state = reactive({
  // data or variables 
  current_image_url: '',
  data_current_user: ''
});
provide('sharedState', state);



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

  }
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


  // <- User list Observer ->
  `
  <div class="custom_list">
    <div v-if="data_users_list.length == 0 && !(state?.data_current_user) && !(state?.keep_current_user)  " class="flex justify-content-center">
      <span class="w-full text-center font-bold">No Data</span>
    </div>
    <!-- This code to hide the current user after searching or clicking on another user -->
    <template v-for="(item, index) in [state?.data_current_user].concat(data_users_list) " :key="index" >
      <div v-if="state?.data_current_user._id == item._id && index == 0" >
        
      <ListInfo
      
      class="keep_current_user"
        v-if="state?.keep_current_user"
        @click="()=>{
          router.replace({ query: { _id: state?.keep_current_user._id } })                        
        }"
        :subtitle="state?.keep_current_user.code"
        :first_name="state?.keep_current_user.first_name"
        :last_name="state?.keep_current_user.last_name"
        :image="state?.keep_current_user.image"
        :is_active="state?.keep_current_user._id == route.query?._id"
        :showActive="true"
      />
      <ListInfo

        class="data_current_user"
        v-else-if="state?.keep_current_user != '' && state?.data_current_user && !first_select_done"
        @click="()=>{}"
        :subtitle="item.code"
        :first_name="item.first_name"
        :last_name="item.last_name"
        :image="item._id == route.query?._id ? (state.current_image_url ? state.current_image_url : item.image) :item.image"
        :is_active="item._id == route.query?._id"
        :showActive="true"
      />
    </div>
    <div  v-else-if="state?.data_current_user._id != item._id">
      <ListInfo
      
        class="users_not_same_id"
        @click="()=>{
          if (first_select_done == false) {
            state.keep_current_user = state?.data_current_user
          }
          first_select_done = true
          
          router.replace({ query: { _id: item._id } })
        }"
        :subtitle="item.code"
        :first_name="item.first_name"
        :last_name="item.last_name"
        :image="item._id == route.query?._id ? (state.current_image_url ? state.current_image_url : item.image) :item.image"
        :is_active="item._id == route.query?._id"
        :showActive="state?.keep_current_user?._id != item._id"
        :image_clickable="false"
      />
    </div>
    <div v-else-if="state?.data_current_user._id == item._id && first_select_done " >
      <ListInfo
      
        class="users_same_id"
        @click="()=>{
          first_select_done = true
          router.replace({ query: { _id: item._id } })
          
        }"
        :subtitle="item.code"
        :first_name="item.first_name"
        :last_name="item.last_name"
        :image="item._id == route.query?._id ? (state.current_image_url ? state.current_image_url : item.image) :item.image"
        :is_active="item._id == route.query?._id"
        :showActive="state?.keep_current_user?._id != item._id"
      />

    </div>

    </template>

    <!-- spinner -->
    <div
      v-if="isLoading"
      class="flex justify-content-center align-items-center"
    >
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="6"
        fill="transparent"
      />
    </div>

    <div ref="target" >
      <p style="visibility: hidden">.</p>
      <!--OBSERVER-->
    </div>
 </div>

`

// Initialize search input with an empty string
const inp_Search = ref("")

// Initialize users list with the provided data (d_ul)
const data_users_list = ref(d_ul)

// Initialize page number to 1
const data_page = ref(1)

// Initialize target to null
const target = ref(null)

// Initialize target visibility to false
const targetIsVisible = ref(false)

// Initialize loading state to false
const isLoading = ref(false)

// Initialize first select state to false
const first_select_done = ref(false);

// Function to reset the observer
const reset_Observer = () => {
  // Clear the users list
  data_users_list.value = []

  // Set target visibility to false
  targetIsVisible.value = false

  // Reset page number to 1
  data_page.value = 1
}

// Debounce the search input to limit API calls
const inp_SearchDebounced = refDebounced(inp_Search, 500)

// Watch the debounced search input
watch(
  () => inp_SearchDebounced.value,
  async (val) => {
    // Reset the observer when the search input changes
    nextTick(()=>{
      state.keep_current_user = state.data_current_user;
    })

    // Reset the observer when the search input changes
    await reset_Observer()

    // Reset target visibility
    targetIsVisible.value = false
    targetIsVisible.value = true
  }
)

// Use Intersection Observer to detect when the target is visible
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    // Update target visibility
    targetIsVisible.value = isIntersecting
  }
)

// Watch the target visibility
watch(
  () => targetIsVisible.value,
  async (newVal) => {
    let data_list_length = null;

    // If the target is visible
    if (targetIsVisible.value) {
      const func = async () => {
        
        // While the target is visible
        while (targetIsVisible.value) {
          // If the target is not visible, break the loop
          if (!(targetIsVisible.value)) {
            break;
          }

          // get before length
          data_list_length = data_users_list.value.length;
          

          // Call the API
          await onAPI_call()

          // Wait for 10 milliseconds
          await new Promise(resolve => setTimeout(resolve, 10));

          // Increment the page number
          data_page.value = data_page.value + 1

          // If the users list is empty, break the loop
          if (data_users_list.value.length === 0) {
            break;
          }

          

          // If the target is not visible, break the loop
          if (!(targetIsVisible.value)) {
            break;
          }

          
          // if before list length it's same break
          if (data_list_length == data_users_list.value.length) {
            break;
          }

        }
      }

      
      // Call the function
      await func()
      
    }
  }
)




// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

// ## for displays


// <- Data Table settings ->
// const data_TableData = ref(i_tb) // or  [1, 2, 3, 4]

// const limit_DataTable = ref(5) // Rows per Pages
// const page_DataTable = ref(route.query?._page ? route.query?._page :1) // the of data table Page
// const totalRecords_DataTable = ref(100) // total Records to set the page

// const first_DataTable = computed( ()=> (page_DataTable.value * limit_DataTable.value) - limit_DataTable.value )

// const dd_RowsPerPage = ref( limit_DataTable.value)

// watch(dd_RowsPerPage, (newVal)=>{
//   if (limit_DataTable.value != newVal) {
//     limit_DataTable.value = newVal
//   }
// })


// const dd_RowsPerPage_items = ref( [limit_DataTable.value, 10, 25 , 50])

// // const Menu_table = ref(null);

// const changePage = (paramPage) => {
//   page_DataTable.value = paramPage.page + 1
//   onAPI_call()
//   router.replace({path:route.path, query:{_page:page_DataTable.value, _limit:limit_DataTable.value}})

// }


// should to be two type from this "global" & local
// the best it's to set it one time as global & import it
// const getSeverity = (item) => {
//   switch (item.status) {
//     case "OVERDUE":
//       return {
//         color: "#F3654A",
//         backgroundColor: "#F3654A33",
//       }

//     case "APPROVAL":
//       return {
//         color: "#FFB536",
//         backgroundColor: "#FFB53633",
//       }

//     case "PAYMENT":
//       return {
//         color: "#FFB536",
//         backgroundColor: "#FFB53633",
//       }

//     case "PAID":
//       return {
//         color: "#1AD598",
//         backgroundColor: "#D1F7EA",
//       }

//     default:
//       return {
//         color: "#fff",
//         backgroundColor: "#1AD598",
//       }
//   }
// }

// watch(dd_RowsPerPage, () => {
//   onAPI_call();
//   router.replace({path:route.path, query:{_page:page_DataTable.value, _limit:limit_DataTable.value}})
// })

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
data_users_list.value = []

// ## Watch's for API Integration



// ## Functions For API Integration

// ## Submit Form

// ## onMounted // when we call the api


const handleApi = async () => {
  isLoading.value = true
  // handel data here from input controls before send it



  // return function from services as $fetch Promise 
  // Example 
  //  return get_data_from_api();

  return get_Customers_list({
    searchText: inp_Search.value,
    page: data_page.value,
    limit: 5,
  })

  return Promise.resolve();
};

// handleData for display data from api
const handleData = async (data) => {
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

  let _res = data?.results?.map((item) => ({
    _id: item._id,
    code: item.code,
    first_name: item.first_name,
    last_name: item.last_name,
    image: item.image_url ? item.image_url : ''
  }));

  // remove the id in this please

  data_users_list.value = data_users_list.value.concat(_res)
  isLoading.value = false
};

// <- call api ->

const onAPI_call = async () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    // reset API data :
    // data_TableData.value = [];

    await handleApi().then(async (res) => {
      await handleData(res);
    });

    isLoading.value = false

    // getMatter_list().then((res) => {
    //   let val = res?.data.map((item) => ({
    //     label: item?.matter_name,
    //     id: item?.id,
    //   }));
    //   matter_id.value = val[0]?.id;
    //   dd_matter.value = val[0]?.id;
    //   dd_matter_items.value = val;
    // });

    if (!(route.query?._id)) {
    nextTick(()=>{
      setTimeout(() => {
        document.querySelector('.users_not_same_id').click();
      }, 100);
    });
  }
  }
}

// onAPI_call()

onMounted(() => {
  // onAPI_call()
})
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
</style>

<!-- TabView support -->
<style lang="scss">
.p-tabview {
  display: flex;
  flex-direction: column;
  height: 100%;

  .p-tabview-nav-container {
    flex-grow: 0;
    /* This means the item will not expand to take up extra space */
  }

  .p-tabview-panels {
    flex-grow: 1;
    /* This means the item will expand to take up extra space */
    overflow-y: auto;

    .p-tabview-panel {
      height: 100%;
    }
  }
}</style>
