<template lang="">
  <SidebarPrime
    v-model:visible="addNewDrawer"
    class="customWidth"
    position="right"
  >
    <form @submit.prevent="submitMembershipForm">
      <div class="grid">
        <!-- Top Header -->
        <div
          class="col-12 py-3 grid flex align-items-center justify-content-between"
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
        <Divider class="my-1 mx-1" />
        <div class="col-12 mb-2">
          <!-- profile section -->
          <div class="leads__avatar_wrap">
            <!-- <img :src="image" v-if="image" class="mr-2" width="100" /> -->
            <img
              :src="selectedImageUrl"
              v-if="selectedImage"
              class="mr-2"
              width="100"
            />
            <div class="p-3 bg_color" v-else>
              <img src="/icons/empty_logo.svg" />
            </div>
            <!-- upload button -->
            <span class="p-ripple add_edit_btn p-3" v-ripple>
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="addMembershipLogo"
              />
              <i class="pi pi-pencil" @click="addMembershipLogo"></i>
            </span>
          </div>
        </div>
        <!-- body -->
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Membership Name">
            <template v-slot>
              <InputText
                id="membership_name"
                v-bind="membership_name"
                type="text"
                aria-describedby="membership_name-error"
                placeholder="eg: name"
                :class="{ 'p-invalid': errors.membership_name }"
              />
              <small
                class="p-error p-min-error"
                v-if="errors.membership_name"
                id="membership_name-error"
                >{{
                  useRegexUnderScore(errors.membership_name) || "&nbsp;"
                }}</small
              >
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Membership Type">
            <template v-slot>
              <Dropdown
                id="membership_type"
                v-bind="membership_type"
                :options="membership_typeDropdown"
                aria-describedby="membership_type-error"
                placeholder="eg: type"
                :class="{ 'p-invalid': errors.membership_type }"
              />
              <small
                class="p-error p-min-error"
                v-if="errors.membership_type"
                id="membership_type-error"
                >{{
                  useRegexUnderScore(errors.membership_type) || "&nbsp;"
                }}</small
              >
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Price">
            <template v-slot>
              <InputText
                id="membership_price"
                v-bind="membership_price"
                type="number"
                aria-describedby="membership_price-error"
                placeholder="eg: price"
                :class="{ 'p-invalid': errors.membership_price }"
              />
              <small
                class="p-error p-min-error"
                v-if="errors.membership_price"
                id="membership_price-error"
                >{{
                  useRegexUnderScore(errors.membership_price) || "&nbsp;"
                }}</small
              >
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Total">
            <template v-slot>
              <InputText
                id="membership_total"
                v-bind="membership_total"
                type="number"
                aria-describedby="membership_total-error"
                placeholder="eg: total"
                :class="{ 'p-invalid': errors.membership_total }"
              />
              <small
                class="p-error p-min-error"
                v-if="errors.membership_total"
                id="membership_total-error"
                >{{
                  useRegexUnderScore(errors.membership_total) || "&nbsp;"
                }}</small
              >
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Utility">
            <template v-slot>
              <InputText
                id="membership_utility"
                v-bind="membership_utility"
                type="text"
                aria-describedby="membership_utility-error"
                placeholder="eg: utility"
                :class="{ 'p-invalid': errors.membership_utility }"
                disabled
              />
              <small
                class="p-error p-min-error"
                v-if="errors.membership_utility"
                id="membership_utility-error"
                >{{
                  useRegexUnderScore(errors.membership_utility) || "&nbsp;"
                }}</small
              >
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 py-0">
          <InputTextAreaCustom
            label="Description"
            id="_description"
            v-bind="_description"
            type="text"
            aria-describedby="_description-error"
            placeholder="eg: Type Description.."
            :class="{ 'p-invalid': errors._description }"
          />
          <small
            class="p-error p-min-error"
            v-if="errors._description"
            id="_description-error"
            >{{ useRegexUnderScore(errors._description) || "&nbsp;" }}</small
          >
        </div>
        <div class="col-12 py-0">
          <span class="font-bold spacing_none black_text"
            >Member Exclusive Benefits</span
          >
        </div>
        <div class="col-12 p-0 addRow_list">
          <div
            class="col-12 grid"
            v-for="(item, index) in addNewArray"
            :key="index"
          >
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Module">
                <template v-slot>
                  <Dropdown
                    v-model="item.membership_module"
                    :options="membership_service"
                    optionLabel="name"
                    placeholder="eg: Booking/Apparels"
                    @change="selectedFilter(item.membership_module)"
                  />
                </template>
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-4" v-if="show_membership">
              <CustomInputContainer label="Membership Services">
                <template v-slot>
                  <Dropdown
                    v-model="item.membership_product"
                    :options="membership_serviceTitles"
                    optionLabel="name"
                    placeholder="eg: Reg"
                  />
                </template>
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Benefit Type">
                <template v-slot>
                  <Dropdown
                    v-model="item.membership_discountType"
                    :options="discount_type"
                    optionLabel="name"
                    placeholder="eg: Hours / discount"
                    @change="selectedFilter(item.membership_discountType)"
                  />
                </template>
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-4" v-if="show_discount">
              <CustomInputContainer label="Benefits">
                <template v-slot>
                  <InputNumber
                    v-model="item.membership_benefits"
                    placeholder="eg: add number"
                  />
                </template>
              </CustomInputContainer>
            </div>
            <div
              class="col-12 md:col-4"
              v-if="show_discount || show_uptoAmount"
            >
              <CustomInputContainer label="Upto Amount">
                <template v-slot>
                  <InputNumber
                    v-model="item.membership_uptoAmount"
                    placeholder="eg: add amount"
                  />
                </template>
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-8">
              <InputTextAreaCustom
                v-model="item.membershipBenefit_description"
                label="Description"
                placeholder="Type Description.."
              />
            </div>
          </div>
        </div>

        <div class="col-12 my-2">
          <span
            class="primary underline cursor-pointer"
            @click.prevent="handleAddNewRow"
            >+Add new row</span
          >
        </div>
        <div class="col-12 flex align-items-center justify-content-between">
          <Button
            class="col-12 md:col-5 custom_text py-3 block mx-1"
            outlined
            @click.prevent="close()"
            >Discard</Button
          >
          <Button
            @click.prevent="createMembership"
            class="col-12 md:col-5 py-3 block"
          >
            Add Membership</Button
          >
        </div>
      </div>
    </form>
    <Toast position="top-center" />
  </SidebarPrime>
</template>
<script setup>
definePageMeta({
  layout: "default",
})
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useRegexUnderScore } from "@/composables/regex"
import { useToast } from "primevue/usetoast"
import {
  ref,
  onMounted,
  provide,
  defineEmits,
  computed,
  defineProps,
} from "vue"

import { membership_typeDropdown } from "@/config/membership"
import { membership_service } from "@/config/membership"
import { membership_serviceTitles } from "@/config/membership"
import { discount_type } from "@/config/membership"

const router = useRouter()
const toast = useToast()
const props = defineProps({
  selected_membership: {
    default: "",
    type: String,
  },
  image: {
    default: "",
    type: String,
  },
  logo_image: {
    type: String,
    default: "/images/memberLogo.png",
  },
  day_title: {
    type: String,
    default: "Weekday",
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
})
const addNewDrawer = useState("addNewDrawer")
const show_uptoAmount = ref(false)
const show_membership = ref(false)
const show_discount = ref(false)
membership_service
membership_serviceTitles
membership_typeDropdown
discount_type
const membership_profileLogo = ref("")

// logo image upload
const selectedImage = ref(null)
const selectedImageUrl = ref("")
// handle upload membership logo
const addMembershipLogo = async (event) => {
  // Trigger the file input element directly
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.click()
  }
  if (event.target.files) {
    const file = event.target.files[0]
    // Display the selected image preview
    selectedImage.value = file
    selectedImageUrl.value = URL.createObjectURL(file)
    try {
      var formdata = new FormData()
      formdata.append("document", selectedImage.value, selectedImage.value.name)

      const response = await useMyFetch(`client/generic/simpleupload`, {
        method: "POST",
        body: formdata,
      })
      const { data } = response
      membership_profileLogo.value = data.value[0]
      // console.log(membership_profileLogo.value);
    } catch (err) {
      toast.add({
        severity: "error",
        summary: "updated failed",
        detail: "",
        life: 3000,
      })
    }
  }
}

const addNewArray = ref([
  {
    membership_module: "",
    membership_product: "",
    membership_discountType: "",
    membership_benefits: "",
    membership_uptoAmount: "",
    membershipBenefit_description: "",
  },
])

// validation handling
const {
  handleSubmit,
  resetForm,
  meta,
  defineInputBinds,
  errors,
  defineComponentBinds,
} = useForm({
  validationSchema: yup.object({
    membership_name: yup.string().min(4).required("membership name required"),
    membership_price: yup.string().min(1).required("membership price required"),
    membership_total: yup.string().min(1).required("membership total required"),
    _description: yup
      .string()
      .min(2)
      .required("membership description required"),
    membership_type: yup.string().min(2).required("membership type required"),
  }),
})
const membership_name = defineComponentBinds("membership_name")
const membership_price = defineComponentBinds("membership_price")
const membership_total = defineComponentBinds("membership_total")
const _description = defineComponentBinds("_description")
const membership_type = defineComponentBinds("membership_type")

const createMembership = handleSubmit((values) => {
  if (values && Object.keys(values).length > 0) {
    submitMemberShipForm(values)
  }
})
// Add new membership
const submitMemberShipForm = async (value) => {
  try {
    const membershipType = membership_type.value.modelValue
    const membershipName = membership_name.value.modelValue
    const membershipPrice = membership_price.value.modelValue
    const membershipTotal = membership_total.value.modelValue
    const membershipUtility = membership_utility.value.modelValue
    const membershipDescription = _description.value.modelValue
    const tempArray = addNewArray.value.map((item) => {
      const { name: membership_module } = item.membership_module
      const { id: membership_product_id } = item.membership_product
      const { name: membership_discountType } = item.membership_discountType
      return {
        service: membership_module,
        product: membership_product_id ?? "",
        type: membership_discountType,
        benefit: item.membership_benefits ?? 0,
        upto_amount: item.membership_uptoAmount ?? 0,
        description: item.membershipBenefit_description ?? 0,
      }
    })
    const payload = {
      name: membershipName ?? "",
      membership_type: membershipType ?? "Standard",
      price: membershipPrice ?? "",
      total: membershipTotal ?? "",
      utility: membershipUtility ?? 0,
      description: membershipDescription ?? "",
      image: membership_profileLogo.value ?? "",
      benefits: tempArray,
      status: "Active",
    }
    const response = await useMyFetch(`/admin/membership`, {
      method: "POST",
      body: payload,
    })
    const data = response
    if (data.status.value == "success") {
      toast.add({
        severity: "success",
        summary: "added successfully",
        detail: "",
        life: 3000,
      })
      setTimeout(() => {
        addNewDrawer.value = false
      }, 3000)
    }
  } catch (err) {
    console.log(err)
    toast.add({
      severity: "error",
      summary: " membership Creation failed ",
      detail: err,
      life: 3000,
    })
  } finally {
  }
}
// methods
const selectedFilter = (value) => {
  if (value.id == "booking") {
    show_membership.value = true
    show_discount.value = true
  } else if (value.id == "apparels") {
    show_membership.value = false
    show_discount.value = true
  } else if (value.id == "apparels") {
    show_membership.value = false
  } else if (value.id == "discount") {
    show_discount.value = true
  } else if (value.id == "hours") {
    show_discount.value = false
    show_uptoAmount.value = true
  }
}
// add new row
const handleAddNewRow = () => {
  addNewArray.value = [
    ...addNewArray.value,

    {
      membership_module: "",
      membership_product: "",
      membership_discountType: "",
      membership_benefits: "",
      membership_uptoAmount: "",
      membershipBenefit_description: "",
    },
  ]
  console.log(addNewArray.value)
}

const emits = defineEmits(["close"])
const close = () => {
  emits("close")
  selectedImage.value = null
}
// mounted
onMounted(() => {})
</script>
<style lang="scss">
.leads__avatar_wrap {
  position: relative;
}

.add_edit_btn {
  width: 35px;
  height: 35px;
  position: absolute !important;
  bottom: -20px;
  right: -0.3rem;
  background: #fff;
  box-shadow: 2px 5px 5px #cdcccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 4px !important;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  i {
    transition: all 0.4s ease-in-out;
    font-size: 0.75rem;
    color: #7c7b7b;
  }

  &:hover {
    box-shadow: 2px 5px 5px #3493ff3a;

    i {
      color: #3494ff;
    }
  }
}

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

.addRow_list {
  max-height: 24vh !important;
  min-height: 24vh !important;
  overflow-y: auto !important;
}

.addRow_list::-webkit-scrollbar {
  display: none !important;
  /* for Chrome, Safari, and Opera */
}
</style>
