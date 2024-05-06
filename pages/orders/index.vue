<template lang="">
  <div class="flex flex-column h-full">
    <div class="grid-container">
      <div
        v-for="(item, index) in Cards_list_key" :key="index"
        class="card  flex=-column justify-content-between align-items-center mt-3"
        style="width:11rem"
      >
        <h5 class="gray_text font-bold">{{item}}</h5>
        <h1 class="font-bold">{{Cards_list[item]}}</h1>
      </div>

    </div>

    <div class="mt-3 card flex-grow-1">
      <div class="grid">
        <div class="col">
          <h5 class="font-bold">Orders List</h5>
        </div>
        <div class="col">
          <div class="flex gap-3 justify-content-end">
            <MenuPopFilterSelects
              :icon="'pi pi-sort-alt pi-color'"
              :inherent_attrs="true"
              severity="secondary"
              :items="MenuPopFilterSelects_filter_sort"
              @clear="btn_filter_clear"
              @submit="btn_filter_submit"
            />

            <MenuPopFilterSelects
              :inherent_attrs="true"
              severity="secondary"
              :items="MenuPopFilterSelects_filter"
              @clear="btn_filter_clear"
              @submit="btn_filter_submit"
            />

            <!-- <NuxtLink to="/">
                <Button  class="" icon="pi pi-plus" label="New Order" />
            </NuxtLink> -->
          </div>
        </div>
      </div>

      <div class="deals__leads_details">
        <!-- get change event -->
        <DataTable
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
          <Column
            header="Order No"
            field="oder_no"
            class="font-bold text-center"
            style="color: black"
          >
            <template #body="slotProps">
              <span
                style="color:#8D98A9 ,font-weight: 700;"
                class="font-size-small text-center"
              >
                {{ slotProps.data.oder_no }}
              </span>
            </template>
          </Column>
          <Column
            header="Customer"
            field="customer"
            class="text-center"
            style="color: black"
          >
            Cus-001
          </Column>
          <Column
            header="Customer Contact"
            class="text-center"
            style="color: black"
            field="customer_contact"
          >
            Website
          </Column>

          <Column
            header="Date of Order"
            class="text-center"
            style="color: black"
            field="date_of_order"
          >
          </Column>

          <Column
            header="Delivery Method"
            class="text-center"
            style="color: black"
            field="delivery_method"
          >
            Cus-001
          </Column>

          <Column
            header="Payment Method"
            class="text-center"
            style="color: black"
            field="payment_method"
          >
            Cus-001
          </Column>

          <Column
            header="Amount"
            class="text-center"
            style="color: black"
            field="amount"
          >
            Cus-001
          </Column>
          <Column header="Status" class="text-center" style="color: black">
            <template #body="slotProps">
              <Tag
                class="p-0 font-size-small font-bold"
                :value="slotProps.data.status"
                style="
                  transform: translate(0px, 0px);
                  font-size: 12px !important;
                  min-width: 3.5rem;
                  padding: 3px !important;
                "
                :style="getSeverity(slotProps.data)"
              />
            </template>
          </Column>

          <Column header="Actions" class="text-center" style="color: black">
            <template #body="slotProps">
              <div>
                <Button
                  class="p-2 font-size-small"
                  link
                  style="
                    transform: translate(0px, 0px);
                    text-decoration: underline;
                  "
                  @click="
                    $router.push(
                      `/orders/view_with_details?_id=${slotProps.data._id}`
                    )
                  "
                  >View Details</Button
                >
              </div>
            </template>
          </Column>
        </DataTable>
        <div class="grid">
          <div class="col">
            <Paginator
              class="Paginator"
              :rows="limit_DataTable"
              :first="1"
              :totalRecords="totalRecords_DataTable"
              @page="changePage"
            ></Paginator>
          </div>

          <div class="col flex align-items-center justify-content-end">
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
</template>

<script setup>
// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY
import { data_TableData as i_tb } from "@/dummyData/orders/orders_tb"
import { getDataTable_list, GetStatusCount } from "@/services/orders/index.js"
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
    modelItems: ["New Order", "Processing", "Moved to Logistics"],
    selectedItems: "",
  },
])

const MenuPopFilterSelects_filter_sort = ref([
  {
    label: "Sort",
    modelItems: ["Newest date of order", "Oldest date of order"],
    selectedItems: "Newest date of order",
  },
])

// Data Table
const data_TableData = ref(i_tb)
const limit_DataTable = ref(5)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first = ref(1)

const dd_RowsPerPage = ref(limit_DataTable.value)

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])
// Example
// dd_SellPrice_items = ref([]);

// ## for displays

const Cards_list = ref({
  "New Orders":"27",
  "Orders in Process":"27",
  "Moved to Logistics":"27",
  "Internal Transfers":"27",
});

let Cards_list_key = ref(Object.keys(Cards_list.value))

// ---------------------------------------------------------------
// Functions For design

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

// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets varables intgrations


// ## resets Components Control for intgrations
data_TableData.value = [];


// ## Watch's for API Integration
const inp_SearchDebounced = refDebounced(inp_Search, 500)
watch(
  () => inp_SearchDebounced.value,
  (val) => {
    try {
      handleApi().then((res) => {
        handleData(res)
      })
    } catch (error) {
      alert(error)
    }
  }
)

watch(page_DataTable, () => {
  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }
})


watch(dd_RowsPerPage, (newVal)=>{
  limit_DataTable.value = newVal;

  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }


})

// ## Functions For API Integration

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


const btn_filter_submit = (value) => {
  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }
}

const btn_filter_clear = (value) => {
  MenuPopFilterSelects_filter.value[0].selectedItems = ""
  MenuPopFilterSelects_filter_sort.value[0].selectedItems = ""

  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }
}

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  var sort_by_id = "";
  if (MenuPopFilterSelects_filter_sort.value[0].selectedItems == "Newest date of order") {
    
    sort_by_id = "_id:-1";
  }
  else{
    sort_by_id = "_id:1";
  }


  GetStatusCount().then((res)=>{
    Cards_list.value = res;
    Cards_list_key.value = Object.keys(res);

    // Cards_list_key_res.forEach(key => {
    //   console.log("key:",key)
    //   Cards_list[key] = Cards_list_res[key]
    // });
    console.log("res:",res);
  })

  return getDataTable_list({
    // searchText: inp_Search.value,
    match_values: {
      status: MenuPopFilterSelects_filter.value[0].selectedItems,
    },
    sortBy:sort_by_id,

    page: page_DataTable.value,
    limit: limit_DataTable.value,
  });

};



// handleData for display data from api
const handleData = (data) => {
  // if (data){
  //   return undefined
  // }
  // Example
  // totalRecords_DataTable.value = data[0].totalCount[0].count;
  //   data_TableData.value = data?.results.map((item) => ({
  //     _id: item._id,
  //     customer: {
  //       first_name: item.first_name,
  //       last_name: item.last_name,
  //       image: item?.image,
  //     },
  //     customer_id: item?.code,
  //     registration_source: item?.registration_source, // no api
  //     date_added: new Date(item.createdAt).toISOString().slice(0, 10),
  //     status: item.status,
  //   }))

  //   totalRecords_DataTable.value = data?.totalResults;

  data_TableData.value = data?.results.map((item) => ({
    _id: item._id,
    oder_no: item.order_number,
    customer: `${item.user_list.first_name} ${item.user_list.last_name}`,
    // customer_contact: "+" + item.user_list.country_code +"-"+ item.user_list.mobile.toString().slice(0,2) + " " + item.user_list.mobile.toString().slice(2) ,
    

    customer_contact:  "+" +
          (item.user_list.country_code?.[0] == "+" ? `${item.user_list.country_code.slice(1)}` :item.user_list.country_code) +
          "-" +
          item.user_list.mobile?.toString().slice(0, 2) +
          " " +
          item.user_list.mobile?.toString().slice(2),
    date_of_order: formatDate(item?.created_at ? item?.created_at : item?.created_date, "dd-mm-yyyy"),
    delivery_method: item.delivery_method, // Home delivery // Self Pickup
    amount: `${item.grand_total} AED`,
    payment_method: item.payment_method, // COD // Online
    status: item.status, // New Order // Delivered // In Process // Out for delivery // Draft
  }))

  totalRecords_DataTable.value = data?.totalResults
}

onMounted(() => {
  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }

  // getMatter_list().then((res) => {
  //   let val = res?.data.map((item) => ({
  //     label: item?.matter_name,
  //     id: item?.id,
  //   }));
  //   matter_id.value = val[0]?.id;
  //   dd_matter.value = val[0]?.id;
  //   dd_matter_items.value = val;
  // });
})
</script>

<style lang="scss">
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
  justify-content: center;
  font-weight: bold;
}
</style>
