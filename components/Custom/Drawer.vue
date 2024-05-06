<template lang="">
  <SidebarPrime
    v-model:visible="customDrawer"
    class="customWidth"
    position="right"
  >
    <div v-if="status == 'score'">
      <div class="col-12 px-0 py-4 grid flex align-items-center">
        <i
          @click.prevent="close()"
          class="pi pi-arrow-left custom_arrow cursor-pointer"
        ></i>
        <span class="heading_drawer ml-3"> {{ title_score }}</span>
      </div>
      <div class="col-12 p-0 mt-4">
        <span class="black_text font-extraBold score_subtitle">{{
          subtitle
        }}</span>
        <div class="mt-4 Drawer__wrap">
          <Avatar :image="image"></Avatar>
          <div class="li__text_wrap">
            <h3 class="black_text font-bold">Emirates Golf Club | Majlis</h3>
            <p class="font-light font-size-small span_text">20 June 2021</p>
          </div>
        </div>
      </div>
      <!-- Score Table -->
      <DataTable
        class="score_table mt-5"
        :value="score_table.first_round"
        tableStyle="min-width:100%"
      >
        <Column
          field="title"
          header="Hole"
          class="p-2 font-size-table font-bold black_text"
        ></Column>
        <Column field="first" header="1" class="p-2"></Column>
        <Column field="second" header="2" class="p-2"></Column>
        <Column field="third" header="3" class="p-2"></Column>
        <Column field="fourth" header="4" class="p-2"></Column>
        <Column field="fifth" header="5" class="p-2"></Column>
        <Column field="sixth" header="6" class="p-2"></Column>
        <Column field="seventh" header="7" class="p-2"></Column>
        <Column field="eighth" header="8" class="p-2"></Column>
        <Column field="ninth" header="9" class="p-2"></Column>
        <Column
          field="ninth"
          header="out"
          class="font-bold accent1_color p-2"
        ></Column>
      </DataTable>
      <DataTable
        class="score_table mt-2"
        :value="score_table.first_round"
        tableStyle="min-width:100%"
      >
        <Column
          field="title"
          header="Hole"
          class="p-2 font-size-table font-bold black_text"
        ></Column>
        <Column field="first" header="1" class="p-2"></Column>
        <Column field="second" header="2" class="p-2"></Column>
        <Column field="third" header="3" class="p-2"></Column>
        <Column field="fourth" header="4" class="p-2"></Column>
        <Column field="fifth" header="5" class="p-2"></Column>
        <Column field="sixth" header="6" class="p-2"></Column>
        <Column field="seventh" header="7" class="p-2"></Column>
        <Column field="eighth" header="8" class="p-2"></Column>
        <Column field="ninth" header="9" class="p-2"></Column>
        <Column field="ninth" header="out" class="p-2"></Column>
      </DataTable>
      <div
        class="table_footer grid flex align-items-center justify-content-around"
      >
        <div class="flex align-items-center gap-2 custom_footer">
          <span class="black_text font-bold">Score</span>
          <span class="black_text small__text">76/100</span>
        </div>
        <div class="flex align-items-center gap-2">
          <span class="black_text font-bold">Fairways</span>
          <span class="black_text small__text">10/14</span>
        </div>
        <div class="flex align-items-center gap-2">
          <span class="black_text font-bold">Putts</span>
          <span class="black_text small__text">20/29</span>
        </div>
      </div>
    </div>
    <div v-if="status == 'report'">
      <div
        class="col-12 px-0 pt-4 pb-0 grid flex align-items-center justify-content-between"
      >
        <div>
          <i
            @click.prevent="close()"
            class="pi pi-arrow-left custom_arrow cursor-pointer"
          ></i>
          <span class="heading_drawer ml-3"> {{ title_report }}</span>
        </div>
        <div class="flex align-items-center gap-2">
          <Button
            v-for="(item, index) in drawerBtn"
            :class="[
              'p-button customer_filter_btn',
              'p-button-transparent',
              { active: active_btn === index },
            ]"
            @click="handleActionBtn(index)"
          >
            <span class="custom_text">
              {{ item.text }}
            </span>
          </Button>
        </div>
      </div>
      <Divider type="solid" class="mt-3" />
      <vue-pdf-embed :source="report_url" />
    </div>
    <!-- active membership -->
    <div v-if="status == 'Active'">
      <!-- Top Header -->
      <div
        class="col-12 px-0 pt-4 pb-0 grid flex align-items-center justify-content-between"
      >
        <div class="flex align-items-center">
          <i
            @click.prevent="close()"
            class="pi pi-arrow-left custom_arrow cursor-pointer"
          ></i>
          <span class="accent5 font-bold font-size-normal spacing_none ml-3">
            {{ title_report }}</span
          >
        </div>
      </div>
      <!-- body wrapper -->
      <div class="col-12 mt-3">
        <!-- profile section -->
        <div class="col-12 flex justify-content-between">
          <div class="flex align-items-center gap-2">
            <img :src="logo_image" />
            <div class="flex flex-column gap-1">
              <span class="font-extraBold black_text day_title">{{
                membershipDetailObj.name
              }}</span>
              <span class="small__text custom_text">{{
                membershipDetailObj.membership_type
              }}</span>
            </div>
          </div>
          <span class="font-Bolder black_text spacing_none font-size-medium"
            >AED {{ membershipDetailObj.price }}/mo</span
          >
        </div>
        <!-- list -->
        <div class="col-12">
          <div
            v-for="(item, index) in membershipDetailObj.benefits"
            :key="index"
            class="py-1"
          >
            <img
              alt="svg"
              src="/icons/Rectangle.svg"
              class="pointer mr-3"
              ripple
            />
            <span
              v-if="item.description"
              class="custom_text font-medium spacing_none"
            >
              {{ item.description }}
            </span>
            <span v-else class="custom_text font-medium spacing_none">
              N/A
            </span>
          </div>
        </div>
        <!-- Enrolled Customers -->
        <div class="col-12">
          <span class="font-extraBold black_text enrolled_heading">{{
            customer_enrolled
          }}</span>
          <div class="enrolled_list">
            <div
              class="col-12 "
              v-for="(item, index) in membershipDetailObj.sell"
              :key="index"
            >
              <CardProfileNew
                :title="item.customer.name"
                :subtitle="item.customer.email"
                :phone="item.customer.phone_number"
                @click.prevent="handleRoutToCustomer()"
                class="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </SidebarPrime>
</template>
<script setup>
import { useToast } from "primevue/usetoast"
import {
  ref,
  onMounted,
  provide,
  defineEmits,
  computed,
  defineProps,
} from "vue"

const router = useRouter()
const toast = useToast()
const props = defineProps({
  membershipDetailObj: {
    default: {},
    type: Object,
  },

  image: {
    default: "https://randomuser.me/api/portraits/men/32.jpg",
    type: String,
  },
  edit_image: {
    default: "/images/logo_edit.png",
    type: String,
  },
  logo_image: {
    type: String,
    default: "/images/memberLogo.png",
  },
  customer_enrolled: {
    type: String,
    default: "Customer Enrolled",
  },
  day_title: {
    type: String,
    default: "",
  },
  day_status: {
    type: String,
    default: "Premium",
  },
  membership_value: {
    type: String,
    default: "AED 950/mo",
  },
  show: {
    default: null,
    type: Boolean,
  },
  title_score: {
    default: "",
    type: String,
  },
  title_report: {
    default: "",
    type: String,
  },

  status: {
    default: "",
    type: String,
  },
  subtitle: {
    default: "",
    type: String,
  },
  drawerBtn: {
    default: [],
    type: Array,
  },
  score_table: {
    default: {},
    type: Object,
  },
  report_url: {
    type: String,
    default: "",
  },
})
const customDrawer = useState("customDrawer")

const show_uptoAmount = ref(false)
const show_membership = ref(false)
const show_discount = ref(false)
const addNewArray = ref([
  {
    membership_module: "",
    membership_titles: "",
    membership_discountType: "",
    membership_benefits: "",
    membership_uptoAmount: "",
  },
])
const active_btn = ref(3)
//  methods
const handleRoutToCustomer = () => {
  router.push("/customers")
  setTimeout(() => {
    customDrawer.value = false
  }, 2000)
  console.log("clicked")
}
// drawer Buttons
const handleActionBtn = (value) => {
  active_btn.value = value
}
const emits = defineEmits(["close"])
const close = () => {
  emits("close")
}
</script>
<style lang="scss">
.customer_filter_btn {
  padding: 0.25rem 0.95rem !important;
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

.heading_drawer {
  font-size: 1rem !important;
  font-weight: 800 !important;
  color: #000000 !important;
}

.p-sidebar-close {
  display: none !important;
}

.Drawer__wrap {
  display: grid;
  margin-bottom: 3px !important;
  //   padding: 0.6rem;
  border-radius: 10px;
  grid-template-columns: 40px 1fr 20px;

  column-gap: 1.3rem;
  align-items: center;

  .p-avatar {
    width: 50px !important;
    height: 50px !important;
    object-fit: contain;
    border-radius: 10px !important;
    overflow: hidden !important;
  }

  i {
    cursor: pointer;
  }
}

.customWidth {
  width: 650px !important;

  .p-sidebar-header {
    display: none !important;
  }
}

.score_table .p-datatable-table th {
  background-color: #d1f7ea !important;
}

.score_table .p-datatable-table th:first-child {
  border-radius: 5px 0 0 5px !important;
}

.score_table .p-datatable-table th:last-child {
  border-radius: 0 5px 5px 0 !important;
}

.score_table.p-datatable .p-datatable-tbody > tr:first-child {
  color: #b3bccb !important;
}

.score_table.p-datatable .p-datatable-tbody > tr:last-child {
  color: #b3bccb !important;
}

.table_footer {
  width: 100% !important;
  background: #e2e7f1 !important;
  border-radius: 0px 0px 8px 8px !important;
  margin-top: 1px !important;

  .custom_footer {
    padding: 10px !important;
  }
}

.day_title {
  letter-spacing: -0.28px !important;
  font-size: 0.875rem !important;
}

.day_status {
  letter-spacing: -0.24px !important;
}

.enrolled_heading {
  letter-spacing: -0.28px !important;
}

.enrolled_list {
  max-height: 42vh !important;
  min-height: 42vh !important;
  overflow-y: auto !important;
}

.enrolled_list::-webkit-scrollbar {
  display: none !important;
  /* for Chrome, Safari, and Opera */
}

.score_subtitle {
  letter-spacing: -0.28px !important;
}
</style>
