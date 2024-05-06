<template lang="">
  <!-- Top log section -->
  <!-- <template>
    <div
      class="flex align-items-center justify-content-between mb-6 custom__column"
    >
      <div class="flex align-items-center gap-2">
        <div class="flex flex-column align-items-center logo_wrap mt-2">
          <Avatar
            v-if="selectedImage"
            :image="selectedImageUrl"
            shape="circle"
            class="custom_avatar"
          >
          </Avatar>
          <template v-else>
            <Avatar
              v-if="image_src"
              :image="image_src"
              shape="circle"
              class="custom_avatar"
            >
            </Avatar>
            <Avatar
              v-else
              :label="first_name[0].toUpperCase() + last_name[0].toUpperCase()"
              shape="circle"
              class="custom_avatar"
              style="background: #5c9aa4; color: #fff"
            />
          </template>
          <div
            v-ripple
            class="edt_btn flex align-items-center justify-content-center p-ripple"
          >
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleImageUpload"
            />
            <i
              class="pi pi-pencil"
              style="font-size: 1rem"
              @click="handleImageUpload"
            ></i>
          </div>
        </div>

        
        <div class="mt-2">
          <h1 class="mb-2 black_text font-weight-large capsize">
            {{ `${first_name} ${last_name}` }}
          </h1>
        </div>
      </div>
    </div>
  </template> -->

  <div class="grid">
    <div class="col-12 lg:col-6">
      <BrandShow :images="images_src" />
    </div>

    <div class="col-12 lg:col-6 mt-4">
      <div class="flex flex-column justify-content-between">
        <h1>{{ product_name }}</h1>
        <p class="mt-5">
          <span class="font-bold">Description :</span>
          <span v-html="product_description"></span>
        </p>
      </div>
    </div>
  </div>

  <!-- data Table  -->
  <div class="col-12">
    <div class="grid flex align-items-center justify-content-between">
      <span class="small__text black_text custom_spacing font-Bolder text_upper"
        >Product information</span
      >
      <Button
        v-if="from !== 'inventory'"
        class="p-button customer_filter_btn p-button-transparent"
        @click="$router.push(`/products/SaveProduct?_id=${route.query?._id}`)"
      >
        <span class="font-bold text-black-alpha-90"> Edit </span>
      </Button>
    </div>

    <div class="col-12 p-2 detail_table_wrap">
      <ListSimple2 category_text="SKU" :name="sku" class="mb-2" />
      <ListSimple2 category_text="Category" :name="category" class="mb-2" />
      <ListSimple2 category_text="Unit" :name="unit" class="mb-2" />

      <!-- <ListSimple2
        category_text="Preferred Language"
        :list_names="preferred_language"
      /> -->
      <ListSimple2 category_text="UPC" :name="upc" />
      <ListSimple2 category_text="Weight" :name="weight" />
      <ListSimple2 category_text="Manufacturer" :name="manufacturer" />
    </div>
    <div class="grid">
      <div class="col-4">
        <ListSimple2 category_text="Length" :name="length" />
      </div>
      <div class="col-4">
        <ListSimple2 category_text="Width" :name="width" />
      </div>
      <div class="col-4">
        <ListSimple2 category_text="Height" :name="height" />
      </div>
    </div>

    <!-- <template>
      
      <div class="simple__list_wrap">
        <div class="sl__category_text">Mobile Number</div>
        <div
          class="sl__text flex algin-items-center gap-3"
          style="align-items: center"
        >
          <TextAutoFlagNumber v-model="mobile_number.number" />
        </div>
        <div class="sl__text">
          <span
            class="font-bold"
            v-if="mobile_number.is_verified"
            style="color: #1ad598"
            >Verified</span
          >
        </div>
      </div>
    </template> -->

    <span class="small__text black_text custom_spacing font-Bolder text_upper"
      >Sales information</span
    >
    <div class="col-12 p-2 detail_table_wrap">
      <ListSimple2 category_text="Selling Price" :name="selling_price" />
      <ListSimple2 category_text="Sales Account" :name="sales_account" />
      <ListSimple2 category_text="Description" :name="description_sales" />
    </div>

    <span class="small__text black_text custom_spacing font-Bolder text_upper"
      >Purchase information</span
    >
    <div class="col-12 p-2 detail_table_wrap">
      <ListSimple2 category_text="Cost Price" :name="cost_price" />
      <ListSimple2 category_text="Purchase Account" :name="purchase_account" />
      <ListSimple2 category_text="Description" :name="description_purchase" />
      <!-- <ListSimple2 category_text="Preferred vendor" :name="preferred_vendor" /> -->
    </div>
  </div>
  <Toast position="top-center" />
</template>
<script setup>
// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { ref, inject, defineEmits, onMounted } from "vue"

import { useToast } from "primevue/usetoast"
import { number, object } from "yup"

const router = useRouter()
const route = useRoute()

const props = defineProps({
  from: {
    type: String,
    default: "",
  },
  image_src: {
    type: String,
    default: "https://placehold.co/500",
  },

  mobile_number: {
    type: Object,
    default: {
      number: "+971-52 6813408",
      is_verified: true,
    },
  },

  images_src: {
    type: Array,
    default: [
      "https://placehold.co/500",
      "https://placehold.co/500",
      "https://placehold.co/500",
      "https://placehold.co/500",

      "https://placehold.co/500",
      "https://placehold.co/500",
      "https://placehold.co/500",
    ],
  },

  // GENERAL INFORMATION
  product_name: {
    type: String,
    default: "Pepsodent T / Paste G Advanced with mint formula",
  },
  product_description: {
    type: String,
    default:
      "M18 FUEL™ ½” Hammer Drill Driver is the Industry's Most Powerful Hammer Drill, delivering the capability to drill the largest holes at high speed into the densest materials. Our cordless drill is the Most Compact solution in its class and features AutoStop™ Control Mode for Enhanced Safety. The POWERSTATE™ Brushless motor delivers the most pow.",
  },

  // PRODUCT INFORMATION

  category: {
    type: String,
    default: "Health & Nutrition",
  },
  unit: {
    type: String,
    default: "Kilogram",
  },

  upc: {
    type: String,
    default: "-",
  },

  weight: {
    type: String,
    default: "12.5 Kg",
  },

  manufacturer: {
    type: String,
    default: "Stephen Doe",
  },

  length: {
    type: String,
    default: "5cm",
  },

  width: {
    type: String,
    default: "12cm",
  },

  height: {
    type: String,
    default: "3.2ft",
  },

  // SALES INFORMATION
  selling_price: {
    type: [Number, String],
    default: "22.50",
  },
  sales_account: {
    type: String,
    default: "-",
  },
  description_sales: {
    type: String,
    default: "-",
  },

  // PURCHASE INFORMATION
  cost_price: {
    type: [Number, String],
    default: "12.50",
  },

  purchase_account: {
    type: String,
    default: "-",
  },
  description_purchase: {
    type: String,
    default: "-",
  },
  preferred_vendor: {
    type: String,
    default: "Shawn Paul",
  },

  sku: {
    type: String,
    default: "-",
  },
})

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

// ---------------------------------------------------------------
// Functions For design

// for edit Image
const selectedImage = ref(null)
// image edit

const selectedImageUrl = ref("")

// Kept it for handle Upload an Image but this not the best practices
const handleImageUpload = async (event) => {
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

      // Upload to API
      // const response = await useMyFetch(`client/generic/simpleupload`, {
      //   method: "POST",
      //   body: formdata,
      // })
      let response = null
      const { data } = response

      // customer_profile.value = data.value[0]
      // updateProfile()
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

// ---------------------------------------------------------------
// Watch's for For design

const toast = useToast()

// const selectedCustomer = inject("selected_customer")
const isEmailValid = ref(true)
const isPhoneNumberValid = ref(true)
const isWebsiteValid = ref(true)
const cus_details = ref({})
const customerAllDetail = ref({})

const customer_profile = ref("")
</script>

<style lang="scss">
.simple2 {
  .sl__text {
    margin: 0.5rem 0;
  }
  .sl__category_text {
    margin: 0.5rem 0;
  }
}

.custom__column {
  display: flex !important;
  gap: 0.625rem !important;
  flex-wrap: wrap !important;
}
.details_table .p-datatable-table th {
  background-color: #fff !important;
  display: none !important;
}
.logo_wrap {
  position: relative !important;
  .edt_btn {
    width: 1.8rem !important;
    height: 1.8rem !important;
    position: absolute !important;
    background-color: #fff !important;
    border-radius: 50% !important;
    box-shadow: 0.2px 0.2px 3px 0.2px;
    z-index: 11;
    bottom: -15px !important;
    // right: -10px !important;
    right: 0 !important;
    cursor: pointer !important;
    transform: translate(0px, -13px);
  }
}

.customer_filter_btn {
  padding: 0.25rem 0.95rem !important;
  background-color: #fff !important;
}

.custom_avatar {
  span.p-avatar-text {
    font-size: xx-large !important;
  }
}
</style>
