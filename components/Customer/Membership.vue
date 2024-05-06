<template lang="">
  <!-- data Table membership -->
  <div class="mb-6">
    <!-- Memberships -->
    <div
      class="col-12 p-0 grid flex align-items-center justify-content-between"
    >
      <span class="small__text font-bold custom_text custom_spacing uppercase"
        >MEMBERSHIP</span
      >
    </div>
    <!-- Membership Table -->
    <div class="col-12 p-0 mt-3 mb-7">
      <DataTable
        class="membership_table"
        :value="customerMemberships"
        tableStyle="min-width:100%"
      >
        <Column header="Membership Name" class="accent font-medium">
          <template #body="slotProps">
            <span v-if="slotProps.data.membershipName" class="small__text font-medium spacing_none">{{
              slotProps.data.membershipName
            }}</span>
             <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template>
        </Column>
        <Column header="price" class="accent font-medium">
          <template #body="slotProps">
            <span v-if="slotProps.data.price" class="small__text font-medium spacing_none">AED {{
              slotProps.data.price
            }}</span>
             <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template>
        </Column>
        <Column header="Purchased On" class="accent font-medium">
          <template #body="slotProps">
            <span v-if="slotProps.data.createdAt" class="small__text font-medium spacing_none">
            {{ extractDate(slotProps.data.createdAt) }}
          </span>
             <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template></Column
        >
        <Column header="Invoice" class="accent font-medium ">
          <template #body="slotProps">
            <span v-if="slotProps.data.invoice"
              class="small__text font-medium spacing_none primary underline cursor-pointer"
              
              >{{ slotProps.data.invoice }}</span
            >
            <span v-else class="small__text font-medium spacing_none accent3"
              >N/A</span
            >
          </template></Column
        >
      
        <Column field="status" header="Status" class="accent font-medium">
          <template #body="slotProps">
            <div class="flex align-items-center justify-content-between">
              <CustomTagRounded
              v-if="slotProps.data.isActive"
                class=""
                :color="'#FFB536'"
                :value="'Active'"
              />
              <CustomTagRounded
              v-if="!slotProps.data.isActive"
                class=""
                :color="'#1AD598'"
                :value="'Completed'"
              />
              <CustomTagRounded
              v-if="slotProps.data.is_deleted"
                class=""
                :color="'#8D98A9'"
                :value="'Canceled'"
              />
              <i
                class="p-ripple pi pi-ellipsis-v cursor-pointer custom_text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.prevent="(e) => membershipMenu(e, slotProps.data)"
                v-ripple
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>
      <p
        v-if="!customerMemberships.length"
        class="font-bold font-size-normal m-auto mt-3 text-center"
      >
        No data to preview
      </p>
    </div>
    <Menu
      ref="membership_menu"
      id="overlay_menu"
      :model="items"
      :popup="true"
    />
    <viewMembership
    @renewMembership="handleRenew"
      @close="closeDrawer"
      :title_membership="'Back'"
    />
    <DialogRenewMembership v-model="renew_membership" @submit="handleRenewMembership" />
  </div>
</template>
<script setup>
import { ref, onMounted, inject, } from "vue"
name: "CustomerMembership"
import { useToast } from "primevue/usetoast"
import viewMembership from "@/containers/Membership/viewMembership"
const toast = useToast()
const props = defineProps({
  image: {
    default: "https://randomuser.me/api/portraits/men/32.jpg",
    type: String,
  },

  drawerBtn: {
    default: "",
    type: Array,
  },
})
const membershipView = useState('membershipView', () => false)

// inject selected customer id
const selectedCustomer = inject("selected_customer")
const selectedCustomerEmail = inject("selected_customerEmail")
const membership_menu = ref()
const customerMemberships = ref([]);
const membership_type = ref("");
const membershipID = ref("");
const membership_status = ref(null);

const renew_membership = ref(false)

// const membershipCancel_status = ref(null);
const membershipPrice = ref("");
const items = ref([
  {
    label: "View",
    command: () => {
      viewMembershipAction()
    }
  },
  {
    label: "Upgrade Membership",
    command: () => {
      // handleMembershipAction("Update-Purchase")

    }
  },
  // {
  //   label: "Renew Membership",
  //   command: () => {
  //     // handleMembershipAction("Auto-Renewed")

  //   }
  // },
  {
    label: "Cancel Membership",
    command: () => {
      handleCancelMembershipStatus()

    }
  },
])
// watch on  id changed
watch(selectedCustomer, (newVal) => {
  if (newVal) {
    customerMembershipDetails()
  }
})
// watch on email changed
watch(selectedCustomerEmail, (newVal) => {
  if (newVal) {
    customerMembershipDetails()
  }
})
// api methods
// customerBookings Details on id
const customerMembershipDetails = async () => {
  try {
    const { detail_table } = props
    const response = await useMyFetch(
      `client/purchase/transaction/${selectedCustomer?.value}`
    )
    const { data } = response
    customerMemberships.value = data.value;
  } catch (err) {
    console.log("error Response:", err)
  }
};
const extractDate = (dateString) => {
  return dateString.slice(0, 10);
};
const data = ref([
  { createdAt: '2023-09-26T12:16:18.660Z' },
  { createdAt: '2023-09-26T12:16:38.339Z' },

])


// mounted
onMounted(() => {
  customerMembershipDetails()
})
// methods
const membershipMenu = (event, value) => {
  membership_menu.value.toggle(event)
  membershipID.value = value.membership_id;
  membershipPrice.value = value.price;
  membership_status.value = value.isActive
  // console.log('satus',membershipID.value);
}
// renew membership
const handleMembershipAction = async (val) => {
  try {
    membership_type.value = val
    const payload = {
      customer_id: selectedCustomer.value,
      membership_id: membershipID.value ,
      price: membershipPrice.value,
      type: membership_type.value,
    }
    const response = await useMyFetch(
      `/client/purchase`,
      {
        method: "POST",
        body: payload,
      }
    )
    const { data } = response
    if (response.status.value == "success") {
      if (membership_type.value == "Update-Purchase") {
        toast.add({
          severity: "success",
          summary: "Upgrade Membership",
          detail: "",
          life: 2000,
        })
      } else {
        toast.add({
          severity: "success",
          summary: "Renewed Membership",
          detail: "",
          life: 2000,
        })
      }
    }
    customerMembershipDetails()



  } catch (err) {
    console.log("error Response:", err)
    toast.add({
      severity: "error",
      summary: err,
      detail: "failed to  update membership",
      life: 3000,
    })
  }
}
// cancel membership
const handleCancelMembershipStatus =  async () =>{
  if (membership_status.value) {
    try {
    const payload = {
      cancel_Object: {
        reason:"",
        description:"",
    },
    isActive: false,
    is_deleted: true,
    }
    // console.log(payload);
    const { data } = await useMyFetch(`/client/purchase/${membershipID.value}`, {
      method: "PATCH",
      body: payload,
    })
  customerMembershipDetails()
  } catch (err) {
    console.log("error Response:", err)
    toast.add({
          severity: "error",
          summary: "Failed",
          detail: "",
          life: 2000,
        })
  }
  toast.add({
          severity: "success",
          summary: "Membership Canceled",
          detail: "",
          life: 2000,
        })
  }
  else{
       toast.add({
      severity: "error",
      summary: "Membership is already completed",
      detail: '',
      life: 2000,
    })
  };
};
const viewMembershipAction = ()=> {
  membershipView.value = true
};
// close drawer
const closeDrawer = () => {
  membershipView.value = false
};
const handleRenew = () => {
  membershipView.value = false
  renew_membership.value = true
};
const handleRenewMembership = () =>{
};


</script>
<style lang="scss">
.membership_table .p-datatable-table th {
  color: #8d98a9 !important;
  font-size: 0.75rem !important;
  letter-spacing: 0 !important;
  font-weight: 400 !important;
}
.membership_table .p-datatable-table td{
  padding: 1rem 1rem !important;
}
</style>
