<template lang="">
  <!-- Top log section -->
  <div
    class="flex align-items-center justify-content-between mb-6 custom__column"
  >
    <div class="flex align-items-center gap-2">
      <div class="flex flex-column align-items-center logo_wrap">
        <Avatar
          v-if="selectedImage"
          :image="selectedImageUrl"
          shape="circle"
          class="custom_avatar"
        >
        </Avatar>
        <div v-else>
          <Avatar
            v-if="customerAllDetail.profile_image"
            :image="customerAllDetail.profile_image"
            shape="circle"
            class="custom_avatar"
          >
          </Avatar>
          <Avatar
            v-else
            :image="'https://randomuser.me/api/portraits/women/96.jpg'"
            shape="circle"
            class="custom_avatar"
          ></Avatar>
        </div>
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
          {{ customerAllDetail.first_name }}
        </h1>
        <span class="cc__chip">{{ customerAllDetail.customer_type }}</span>
        <!-- <span v-else class="inactive__chip">Inactive</span> -->
      </div>
    </div>
    <CustomChip :value="customerAllDetail.status" />
  </div>
  <!-- data Table  -->
  <div class="col-12">
    <div class="grid flex align-items-center justify-content-between">
      <span class="small__text black_text custom_spacing font-Bolder text_upper"
        >CUStOMER DETAILS</span
      >
      <Button
        class="p-button customer_filter_btn p-button-transparent"
        v-if="!isEditable"
        @click.prevent="isEdit"
      >
        <span class="primary font-bold"> Edit </span>
      </Button>
      <Button
        class="p-button customer_filter_btn p-button-transparent"
        v-if="isEditable && customerAllDetail.customer_type === 'Corporate'"
        @click.prevent="updateCusDetails"
        :disabled="
          !customerAllDetail?.first_name ||
          !customerAllDetail?.email ||
          !isEmailValid ||
          !isPhoneNumberValid ||
          !isWebsiteValid ||
          !customerAllDetail.phone_number ||
          !cus_details?.address
        "
      >
        <span class="primary font-bold"> Save </span>
      </Button>
      <Button
        class="p-button customer_filter_btn p-button-transparent"
        v-if="isEditable && customerAllDetail.customer_type === 'Individual'"
        @click.prevent="updateCusDetails"
        :disabled="
          !customerAllDetail?.first_name ||
          !customerAllDetail?.email ||
          !isEmailValid ||
          !customerAllDetail.phone_number
        "
      >
        <span class="primary font-bold"> Save </span>
      </Button>
    </div>

    <div class="col-12 p-2 detail_table_wrap">
      <ListSimple :category_text="'Customer Name'">
        <template v-slot:content>
          <InputText
            id="name"
            v-model="customerAllDetail.first_name"
            placeholder="Enter your name"
            class="edit_input"
            v-if="isEditable"
          />
          <span v-else>{{ customerAllDetail.first_name }}</span>
        </template>
      </ListSimple>
      <ListSimple :category_text="'Email Address'">
        <template v-slot:content>
  <InputText
    id="email"
    v-model="customerAllDetail.email"
    placeholder="Enter your mail"
    class="edit_input"
    :class="{ invalid: !isEmailValid }"
    @input="validateEmail"
    v-if="isEditable"
  />
  <div v-if="!isEmailValid" class="error-message">Invalid email address</div>
  <span class="text_normal" v-if="!isEditable">{{
    customerAllDetail.email
  }}</span>
</template>
      </ListSimple>
      <ListSimple :category_text="'Phone Number'">
        
        <template v-slot:content>
  <vue-tel-input
    :onCountryChanged="countryChangedEvent"
    v-model="customerAllDetail.phone_number"
    :preferredCountries="['AE']"
    :enabledCountryCode="true"
    :defaultCountry="'AE'"
    :selectedCountryCode="true"
    autocomplete="off"
    name="telephone"
    wrapperClasses="m-4 p-4"
    inputClasses="w-full"
    :maxLen="25"
    :disabledFetchingCountry="false"
    :disabled="false"
    :disabledFormatting="false"
    :placeholder="'Enter a phone number'"
    @onClose="onClose"
    @onInput="changePhone"
    mode="international"
    :inputOptions="{
      showDialCode: true,
    }"
    v-if="isEditable"
    class="edit_input"
  />
  <small class="p-error p-min-error" v-if="phoneErr" id="phone_number-error">{{
    phoneErr
  }}</small>
  <span v-if="!isEditable">{{ customerAllDetail.phone_number }}</span>
</template>
      </ListSimple>
      <ListSimple
        v-if="customerAllDetail.customer_type === 'Corporate'"
        :category_text="'Business Address'"
      >
        <template v-slot:content>
  <InputText
    v-model="cus_details.address"
    placeholder="Enter your text"
    class="edit_input"
    v-if="isEditable"
  />
  <span v-else>{{ cus_details.address }}</span>
</template>
      </ListSimple>

      <ListSimple
        v-if="customerAllDetail.customer_type === 'Corporate'"
        :category_text="'Website'"
      >
        <template v-slot:content>
  <InputText
    id="website"
    v-model="cus_details.website"
    placeholder="Enter your text"
    class="edit_input"
    v-if="isEditable && cus_details.website"
    @input="validateWebsite"
    :class="{ invalid: !isWebsiteValid }"
  />
  <div v-if="!isWebsiteValid" class="error-message">website must be valid</div>
  <span class="text_normal" v-if="!isEditable">{{ cus_details.website }}</span>
</template>
      </ListSimple>

      <ListSimple
        v-if="customerAllDetail.customer_type === 'Corporate'"
        :category_text="'City'"
      >
        <template v-slot:content>
  <InputText
    v-model="cus_details.city"
    placeholder="Enter your text"
    class="edit_input"
    v-if="isEditable && cus_details?.city"
  />
  <span v-else>{{ cus_details?.city }}</span>
</template>
      </ListSimple>
    </div>
    <span class="small__text black_text custom_spacing font-Bolder text_upper"
      >Additional DETAILS</span
    >
    <div class="col-12 p-2 detail_table_wrap">
      <ListSimple :category_text="'Handicap'">
        <template v-slot:content>
  <InputNumber
    v-model="cus_details.handicap"
    placeholder="Enter your text"
    class="edit_input"
    v-if="isEditable && cus_details?.handicap"
  />
  <span v-if="!isEditable">{{ cus_details?.handicap }}</span>
</template>
      </ListSimple>
      <ListSimple :category_text="'Golf Club'">
        <template v-slot:content>
  <InputText
    v-model="cus_details.golf_club"
    placeholder="Enter your text"
    class="edit_input"
    v-if="isEditable && cus_details?.golf_club"
  />
  <span v-if="!isEditable">{{ cus_details?.golf_club }}</span>
</template>
      </ListSimple>
    </div>
  </div>
  <Toast position="top-center" />
</template>
<script setup>
import { ref, inject, defineEmits, onMounted } from "vue"
import "vue-tel-input/vue-tel-input.css"

import { useToast } from "primevue/usetoast"
const toast = useToast()
const props = defineProps({
  image: String,
  customer_activated: Boolean,
})
const phoneErr = ref("")
const country_code = ref("")
const tel_phone = ref("")
const tel_valid = ref(false)
const changePhone = (tel, obj) => {
  country_code.value = obj.countryCallingCode
  tel_phone.value = obj.number
  tel_valid.value = obj.valid
  if (!obj.valid) {
    document.querySelector(".vti__input").classList.add("phone-err")
    document.querySelector(".vti__input").classList.remove("phone-valid")

    phoneErr.value = "phone is not valid"
  } else {
    document.querySelector(".vti__input").classList.remove("phone-err")
    document.querySelector(".vti__input").classList.add("phone-valid")

    phoneErr.value = "phone valid"

    phoneErr.value = ""
  }
}

const selectedCustomer = inject("selected_customer");
const isEmailValid = ref(true)
const isPhoneNumberValid = ref(true)
const isWebsiteValid = ref(true)
const cus_details = ref({})
const customerAllDetail = ref({})
const isEditable = ref(false)
const customer_profile = ref("")
// image edit
const selectedImage = ref(null);
const selectedImageUrl = ref("");
// const handleImageUpload = async (event) => {
//   // Trigger the file input element directly
//   const fileInput = document.querySelector('input[type="file"]')
//   if (fileInput) {
//     fileInput.click()
//   }
//   if (event.target.files) {
//     const file = event.target.files[0]
//     // Display the selected image preview
//     selectedImage.value = file
//     selectedImageUrl.value = URL.createObjectURL(file)
//     try {
//       var formdata = new FormData()
//       formdata.append("document", selectedImage.value, selectedImage.value.name)

//       const response = await useMyFetch(`client/generic/simpleupload`, {
//         method: "POST",
//         body: formdata,
//       })
//       const { data } = response
//       customer_profile.value = data.value[0]
//       updateProfile()
//     } catch (err) {
//       toast.add({
//         severity: "error",
//         summary: "updated failed",
//         detail: "",
//         life: 3000,
//       })
//     }
//   }
// }
// customer update on id
// const updateProfile = async () => {
//   try {
//     const payload = {
//       profile_image: customer_profile?.value,
//     }
//     const response = await useMyFetch(
//       `/client/customer/${selectedCustomer.value}`,
//       {
//         method: "PATCH",
//         body: payload,
//       }
//     )
//     const { data } = response
//     listUpdate()
//     if (response.status.value == "success") {
//       toast.add({
//         severity: "success",
//         summary: "Profile image uploaded successfully",
//         detail: "",
//         life: 1000,
//       })
//     }
//   } catch (err) {
//     console.log(err)
//     toast.add({
//       severity: "error",
//       summary: "updated failed failed",
//       detail: "",
//       life: 3000,
//     })
//   }
// }
watch(selectedCustomer, (newVal) => {
  if (newVal) {
    // customerDetails()
    selectedImage.value = props.customer_activated
    isEditable.value = props.customer_activated
    isEmailValid.value = !props.customer_activated
    isPhoneNumberValid.value = !props.customer_activated
    isWebsiteValid.value = !props.customer_activated
    phoneErr.value = ""
  }
})
// email validation
const validateEmail = () => {
  // You can use a regular expression or other validation methods here
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailPattern.test(email.value)
}
const validatePhoneNumber = () => {
  const phonePattern = /^\+971\d{9}$/
  isPhoneNumberValid.value = phonePattern.test(phone.value)
}
const validateWebsite = () => {
  const websitePattern =
    /^(https?:\/\/)?www\.[a-zA-Z0-9.-]+\.[a-z]{2,}(:[0-9]+)?(\/\S*)?$/
  isWebsiteValid.value = websitePattern.test(website.value)
}
// customer update on id
const phone_number = ref("")
// const updateCusDetails = async () => {
//   if (!tel_valid.value) {
//     phoneErr.value = "Phone Number is required"
//     return
//   }
//   try {
//     const payload = {
//       first_name: customerAllDetail.value?.first_name ?? "",
//       last_name: customerAllDetail.value?.last_name ?? "",
//       email: customerAllDetail.value?.email ?? "",
//       phone_number: customerAllDetail.value?.phone_number ?? "",
//       profile_image: "",
//       customer_details: {
//         handicap: cus_details.value?.handicap ?? "",
//         golf_club: cus_details.value?.golf_club ?? "",
//         website: cus_details.value?.website ?? "",
//         city: cus_details.value?.city ?? "",
//         address: cus_details.value?.address ?? "",
//       },
//       additional_details: {},
//       notes: "",
//     }
//     const response = await useMyFetch(
//       `/client/customer/${selectedCustomer.value}`,
//       {
//         method: "PATCH",
//         body: payload,
//       }
//     )
//     const { data } = response
//     if (response.status.value == "success") {
//       toast.add({
//         severity: "success",
//         summary: "updated successfully",
//         detail: "",
//         life: 3000,
//       })
//     }
//     customerDetails()
//     listUpdate()
//     isEditable.value = !isEditable.value
//   } catch (err) {
//     toast.add({
//       severity: "error",
//       summary: "updated failed",
//       detail: "",
//       life: 3000,
//     })
//   }
// }
const emits = defineEmits(["listUpdate"])
const listUpdate = () => {
  emits("listUpdate")
}
// customer details on id
// const customerDetails = async () => {
//   try {
//     const response = await useMyFetch(
//       `client/customer/${selectedCustomer?.value}`
//     )
//     const { data } = response
//     customerAllDetail.value = data.value
//     cus_details.value = customerAllDetail.value.customer_details
//   } catch (err) {
//     toast.add({
//       severity: "error",
//       summary: " failed",
//       detail: "",
//       life: 5000,
//     })
//   }
// }
//editable
const isEdit = () => {
  isEditable.value = !isEditable.value
}
// mounted
// onMounted(() => {
//   customerDetails()
// })
</script>
<style lang="scss">
.invalid {
  border-color: red;
  /* Add custom styling for invalid input */
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
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
  }
}
.cc__chip {
  color: white;
  font-size: 0.6rem !important;
  padding: 2px 6px;
  border-radius: 0px;
  background-color: #1ad598 !important;
  position: relative;
  bottom: 0.4rem;
  border-radius: 4px;
  font-weight: 400;
}
.inactive__chip {
  color: white;
  font-size: 0.6rem !important;
  padding: 2px 6px;
  border-radius: 0px;
  background-color: #8d98a9 !important;
  position: relative;
  bottom: 0.4rem;
  border-radius: 4px;
  font-weight: 400;
}
.customer_filter_btn {
  padding: 0.25rem 0.95rem !important;
  background-color: #fff !important;
}
.edit_input {
  width: 50% !important;
}
</style>
