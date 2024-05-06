<template lang="">
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
                        <h3 class="font-bold mt-2">All Configurator's</h3>
                      </div>
                    </div>
                    <div class="item pr-2">
                      <!-- <NuxtLink to="/customers/SaveCustomer">
                        <Button label="New" />
                      </NuxtLink> -->
                    </div>
                  </div>

                  <!-- <div class="col-12">
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
                  </div> -->
                </div>
              </div>

              <div class="item expand overflow-y-auto pl-2 pr-2 mt-2">
                <div class="custom_list">
                  <!--  -->
                  <template v-for="(item, index) in data_list" :key="index">
                    <ListInfo
                      class=""
                      :name="item.name"
                      :is_active="item.name == route.query?._type"
                      @click="set_current_active(item)"
                      :Image_bool="false"
                      :showActive="true"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Data -->
      <div class="item" style="flex: 2">
        <div class="card h-full">
          
          <template v-if="route.query._type == 'Categories Configurator' && !(route.query?.action)">
            <keep-alive :max="10">
              <lazyComponent class="h-full" :super_lazy="true">
                <CategoriesConfigurator />
              </lazyComponent>
            </keep-alive>
          </template>

          <template v-if="route.query._type == 'Categories Configurator' && route.query?.action">
            <keep-alive :max="10">
              <lazyComponent class="h-full" :super_lazy="true">
                <CategoriesConfiguratorSave />                
              </lazyComponent>
            </keep-alive>
          </template>

          <template v-if="route.query._type == 'Manufacturers Configurator' && !(route.query?.action)">
            <keep-alive :max="10">
              <lazyComponent class="h-full" :super_lazy="true">
                <ManufacturersConfigurator/>
              </lazyComponent>
            </keep-alive>
          </template>

          <template v-if="route.query._type == 'Content Management System' && !(route.query?.action)">
            <keep-alive :max="10">
              <lazyComponent class="h-full overflow-y-scroll pr-4" :super_lazy="true">
                <ContentManagementSystemFlow/>                
              </lazyComponent>
            </keep-alive>
          </template>

          <template v-if="route.query._type == 'Brands Configurator' && !(route.query?.action)">
            <keep-alive :max="10">
              <lazyComponent class="h-full overflow-y-scroll pr-4" :super_lazy="true">
                <BrandsConfigurator/>                
              </lazyComponent>
            </keep-alive>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, provide, inject } from "vue"
import { useToast } from "primevue/usetoast"

const CategoriesConfigurator = defineAsyncComponent(() =>
  import("@/containers/Settings/CategoriesConfigurator/index.vue")
)
const CategoriesConfiguratorSave = defineAsyncComponent(() =>
  import("@/containers/Settings/CategoriesConfigurator/save.vue")
)

const ContentManagementSystemFlow = defineAsyncComponent(() =>
  import("@/containers/Settings/ContentManagementSystemFlow")
)

const ManufacturersConfigurator = defineAsyncComponent(() =>
  import("@/containers/Settings/ManufacturerConfigurator")
)

const BrandsConfigurator = defineAsyncComponent(() =>
  import("@/containers/Settings/BrandsConfigurator")
)

const toast = useToast()
const router = useRouter()
const route = useRoute()

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
// edit banner, create banner, all banners


watch(container_Data, (newVal) => {
  emit("update:data", newVal)
})

const route_query_id = computed(() => route.query?._id)
watch(route_query_id, (val) => {
  onAPI_call()
})

const data_list = [
  {
    name: "Categories Configurator",
  },

  {
    name: "Logistics Configurator",
  },
  {
    name: "Manufacturers Configurator",
  },
  {
    name: "Brands Configurator",
  },

  {
    name: "Content Management System",
  },
]

// ## for displays
// const SideBarVisible = ref(false)

// ---------------------------------------------------------------
// # Setup Validation

// ---------------------------------------------------------------
// Functions For design

const set_current_active = (item) => {
  router.replace({ query: { _type: item.name } })
}

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

const handleApi = async () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return Promise.resolve()
}

// handleData for display data from api
const handleData = async (data) => {
  // if (data == undefined){
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
}

// <- call api ->

const onAPI_call = async () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    // reset API data :
    // data_TableData.value = [];
    // await handleApi().then( async (res) => {
    //     await handleData(res);
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
  router.replace({ query: { _type: data_list[0].name } })
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
}
</style>
