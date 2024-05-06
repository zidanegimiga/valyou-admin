<template lang="">
  <!-- Top cards -->
  <div class="my-2">
    <div class="grid flex gap-6" v-if="paid_amount.length>0">
      <div
        class="col-12 p-0 md:col-4"
        v-for="(item, index) in paid_amount"
      >
        <CardCount
          :is_colored="true"
          :count="item.totalAmount"
          :label="item._id"
        />
      </div>
    </div>
    <div class="grid flex gap-6" v-else>
      <div
        class="col-12 p-0 md:col-4"
        v-for="(item, index) in payments_topCard"
      >
        <CardCount
          :is_colored="true"
          :count="'000'"
          :label="item.title"
        />
      </div>
    </div>
  </div>
  <!-- data Table Payments -->
  <div class="my-4">
    <div
      class="col-12 p-0 grid flex align-items-center justify-content-between"
    >
      <span class="small__text font-bold custom_text custom_spacing uppercase"
        >INVOICES</span
      >
    </div>
    <!-- Payments Table -->
    <div class="col-12 p-0 mt-3 mb-7">
      <DataTable
        class="payment_table"
        :value="payments"
        tableStyle="min-width:100%"
      >
        <Column header="Invoice No." class="accent font-medium">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.booking_id"
              class="small__text font-medium spacing_none accent3"
              >{{ slotProps.data.booking_id }}</span
            >
            <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template>
        </Column>
        <Column header="CLG Service" class="accent font-medium">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.clg_service"
              class="small__text font-medium spacing_none accent3"
              >{{ slotProps.data.clg_service }}</span
            >
            <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template>
        </Column>
        <Column header="Service type" class="accent font-medium ">
          <template #body="slotProps">
            <div class="flex flex-column gap-1">
              <span
                v-if="slotProps.data.services"
                class="small__text font-medium spacing_none accent3"
                >{{ slotProps.data.services }}</span
              >
              <span v-else class="small__text font-medium spacing_none accent3"
                >N/A</span
              >
              <span
                v-if="slotProps.data.category"
                class="small__text font-medium spacing_none custom_text"
                >{{ slotProps.data.category }}</span
              >
              <span
                v-else
                class="small__text font-medium spacing_none custom_text"
                >N/A</span
              >
            </div>
          </template></Column
        >
        <Column header="Price" class="accent font-medium">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.total_amount"
              class="small__text font-medium spacing_none accent3"
              >AED {{ slotProps.data.total_amount }}</span
            >
            <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template></Column
        >
        <Column
          field="payment_status"
          header="Status"
          class="accent font-medium"
        >
          <template #body="slotProps">
            <div class="flex align-items-center justify-content-between">
              <CustomTagRounded
                class=""
                :color="fetchStyle(slotProps.data.status)"
                :value="handleStatusPayments(slotProps.data.status)"
              />
              <i
                v-if="slotProps.data.status == 'completed' || slotProps.data.status == 'booked' "
                class="p-ripple pi pi-ellipsis-v cursor-pointer custom_text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.prevent="(e) => paidMenu(e, slotProps.data)"
                v-ripple
              ></i>
              <i
              v-if="slotProps.data.status == 'in progress' || slotProps.data.status == 'pending' "
                class="p-ripple pi pi-ellipsis-v cursor-pointer custom_text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.prevent="(e) => unpaidMenu(e, slotProps.data)"
                v-ripple
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>
      <p
        v-if="!payments.length"
        class="font-bold font-size-normal m-auto mt-3 text-center"
      >
        No data to preview
      </p>
    </div>
    <!-- <CustomDrawer
      :title_report="'Fitting Report Jul 24, 2023'"
      @close="closeDrawer"
      :show="show_scoreDrawer"
      :status="drawer_status"
      :drawerBtn="drawerBtn"
    /> -->
    <Menu ref="paid_menu" id="overlay_menu" :model="paid_items" :popup="true" />
    <Menu
      ref="unpaid_menu"
      id="overlay_menu"
      :model="unpaid_items"
      :popup="true"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from "vue"
import { useToast } from "primevue/usetoast"
const toast = useToast()
name: "CustomerPayments"
const props = defineProps({
  image: {
    default: "https://randomuser.me/api/portraits/men/32.jpg",
    type: String,
  },
  payments_topCard: {
    default: "",
    type: Array,
  },
})
// selected customer id
const selectedCustomer = inject("selected_customer")
const selectedCustomerEmail = inject("selected_customerEmail")

const payments_details = ref({})
const payments = ref([])
const paid_amount = ref([])
const show_scoreDrawer = ref(false)
const drawer_status = ref("")
const cus_email = ref("")
const cus_services = ref("")
const cus_category = ref("")
const cus_price = ref("")

const paid_menu = ref()
const unpaid_menu = ref()
const paid_items = ref([
  {
    label: "View Document",
  },
])
const unpaid_items = ref([
  {
    label: "Notify Client",
    command: () => {
      handleNotifyEmail()

    }
  },
])
// watch on  id changed
watch(selectedCustomer, (newVal) => {
  if (newVal) {
    customerPaymentsDetails()
  }
});
// watch on email changed
watch(selectedCustomerEmail, (newVal) => {
  if (newVal) {
    customerPaymentsDetails()
  }
});
const handleStatusPayments = (data) => {
      let status = data
      if (status == "pending" || status =="in progress") {
        return "unpaid"
      } else if (status == "booked" || status == "completed") {
        return "paid"
      }
      else  {
        return status
      }
    };
// api methods
// customerBookings Details on id
const customerPaymentsDetails = async () => {
  try {
    const response = await useMyFetch(
      `/client/customer/booking/${selectedCustomer?.value}`
    )
    const { data } = response
    payments_details.value = data.value
    payments.value = payments_details.value.booking
    paid_amount.value = payments_details.value.paidAmount
    
  } catch (err) {
    console.log("error Response:", err)
  }
};

// mounted
onMounted(() => {
  customerPaymentsDetails()
})
// methods
const unpaidMenu = (event, data) => {
  unpaid_menu.value.toggle(event)
  console.log(data);
  cus_email.value = data.customer_email;
  cus_services.value = data.services;
  cus_category.value = data.category;
  // cus_price.value = data.price;

}
const paidMenu = (event, data) => {
  paid_menu.value.toggle(event)
  console.log(data);
}
// client notify email
const handleNotifyEmail = async () =>{
  try {
    const payload = {
      email: cus_email.value?? "",
      service_name: cus_services.value?? "",
      category_name: cus_category.value?? "",
      price: "1299"?? ""
    }
    const { data } = await useMyFetch(`/client/customer/payment/notify`, {
      method: "POST",
      body: payload,
    })
    if (data.value == "email sended successfully.") {
      toast.add({
          severity: "success",
          summary: data.value,
          detail: "",
          life: 2000,
        })
    }
    customerPaymentsDetails
  } catch (err) {
    console.log("error Response:", err)
    toast.add({
          severity: "error",
          summary: "email failed.",
          detail: "",
          life: 2000,
        })
  }
};
// Tag Styled Color
const fetchStyle = (value) => {
  let task = value
  if (task === "booked" || task == 'completed') {
    return "#1AD598"
  } else if (task === "pending" || task == "in progress") {
    return "#F3654A"
  } else if (task === "png") {
    return "#FFB536"
  }
}
</script>
<style lang="scss">
.payment_table .p-datatable-table th {
  font-weight: bold !important;
}
 .payment_table .p-datatable-table tbody > tr > td {
  font-size: 0.8rem !important;
  padding: 1rem 1rem !important;
}


</style>
