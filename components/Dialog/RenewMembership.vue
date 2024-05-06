<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    :style="{ 'min-width': '10vw', 'max-width': '35rem' }"
  >
    <template #header>
      <h5 class="font-extraBold p-2">Select payment method</h5>
    </template>
    <div class="grid">
      <!-- select credits available -->
      <div class="col-12">
        <CardBgCard
          :bgcolor="'#F9FAFC'"
          class="cursor-pointer"
          @click="toggleSelectCredit"
        >
          <template v-slot:score_card>
            <div class="col-12 grid">
              <!-- check box -->
              <div class="col-12 md:col-6 flex align-items-center gap-3 p-0">
                <RadioButton
                v-model="select_payment"
                inputId="select_payment1"
                name="select_payment"
                value="credit"
              />
                <!-- checkbox-label -->
                <div for="select_credit" class="flex flex-column">
                  <span class="accent5 small__text spacing_none font-extraBold"
                    >Available Credits
                  </span>
                  <span class="accent5 small__text spacing_none font-medium"
                    >Via credits
                  </span>
                </div>
              </div>
              <div
                class="col-12 md:col-6 flex align-items-center justify-content-end p-0"
              >
                <span class="font-Bolder accent5 spacing_none font-size-normal"
                  >AED 1000</span
                >
              </div>
            </div>
          </template>
        </CardBgCard>
      </div>
      <!-- select payments method available -->
      <div class="col-12">
        <CardBgCard
          :bgcolor="'#F9FAFC'"
          class="cursor-pointer"
          @click="togglePaymentMethod"
        >
       
          <template v-slot:score_card>
            <div class="col-12 grid">
              <!-- check box -->
              <div class="col-12 flex align-items-center gap-3 p-0">
                <RadioButton
                v-model="select_payment"
                inputId="select_payment2"
                name="select_payment"
                value="stripe"
              />
              
                <!-- checkbox-label -->
                <div for="select_payment" class="flex flex-column">
                  <span class="accent5 small__text spacing_none font-extraBold"
                    >Offline Payment
                  </span>
                  <span class="accent5 small__text spacing_none font-medium"
                    >If customer used any other methods to pay
                  </span>
                </div>
              </div>
            </div>
          </template>
        </CardBgCard>
        <!-- select payment -->
        <div v-if="select_payment == 'stripe'"
          class="col-12 flex align-items-center gap-3 pt-3"
        >
          <div class="flex gap-2 col-12 md:col-7">
            <Button
              v-for="(item, index) in paymentsBtn"
              :class="[
                'p-button customer_filter_btn',
                'p-button-transparent',
                { active: active_btn === item },
              ]"
              class=""
              :outlined="active_btn !== item ? true : false"
              :severity="active_btn !== item ? 'secondary' : 'primary'"
              @click="selectedPayment(item)"
            >
              <img
                alt="svg"
                :src="active_btn !== item ? item.activeSrc : item.src"
                class="pointer"
                ripple
              />
              <span class="">
                {{ item.name }}
              </span>
            </Button>
          </div>
          <div class="col-12 md:col-5">
            <InputNumber
              v-bind="transaction_number"
              placeholder="Enter transaction number"
              class="w-full"
              :useGrouping="false"
              aria-describedby="transaction_number-error"
              :class="{ 'p-invalid': errors.transaction_number }"
            />
            <small
              class="p-error p-min-error"
              v-if="errors.transaction_number"
              id="transaction_number-error"
              >{{
                useRegexUnderScore(errors.transaction_number) || "&nbsp;"
              }}</small
            >
          </div>
        </div>
      </div>
      <!-- select payments method using phone number -->
      <div class="col-12">
        <CardBgCard
          :bgcolor="'#F9FAFC'"
          class="cursor-pointer"
          @click="toggleViaMembership"
        >
      
          <template v-slot:score_card>
            <div class="col-12 grid">
              <!-- check box -->
              <div class="col-12 flex align-items-center gap-3 p-0">
               
                <RadioButton
                v-model="select_payment"
                inputId="select_payment3"
                name="select_payment"
                value="phone"
              />
                <!-- checkbox-label -->
                <div for="via_membership" class="flex flex-column">
                  <span class="accent5 small__text spacing_none font-extraBold"
                    >Viya Membership
                  </span>
                  <span class="accent5 small__text spacing_none font-medium"
                    >Using mobile number
                  </span>
                </div>
              </div>
            </div>
          </template>
        </CardBgCard>
        <!-- select payment -->
        <div v-if="select_payment == 'phone'"
          
          class="col-12 flex align-items-center gap-3 pt-3"
        >
          <div class="col-12 md:col-12">
            <vue-tel-input
              :onCountryChanged="countryChangedEvent"
              v-model="phone_number"
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
              class="edit_input"
            />
            <small
              class="p-error p-min-error"
              v-if="phoneErr"
              id="phone_number-error"
              >{{ phoneErr }}</small
            >
          </div>
        </div>
      </div>

      <div class="col-12 flex justify-content-end gap-2">
        <Button
          outlined
          @click.prevent="cancel"
          class="font-extraBold w-8rem align-items-center text-center flex justify-content-center custom_text"
        >
          <span class="black_text spacing_none small__text">Close</span>
        </Button>
        <Button
          @click.prevent="submitHandler"
          class="font-extraBold w-8rem align-items-center text-center flex justify-content-center"
         >Continue</Button
        >
      </div>
    </div>
  </Dialog>
</template>
<script setup>
import { ref, computed } from "vue"
import { getCustomersOnDropdown } from "@/services/customers"
import { useQuery } from "@tanstack/vue-query"
import { useForm } from "vee-validate"
import { useRegexUnderScore } from "@/composables/regex"
import * as yup from "yup"
import "vue-tel-input/vue-tel-input.css"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue", "submit"])
const {
  handleSubmit,
  resetForm,
  meta,
  defineInputBinds,
  errors,
  defineComponentBinds,
} = useForm({
  validationSchema: yup.object({
    transaction_number: yup.string().min(4).max(10).required(),
  }),
})
const transaction_number = defineComponentBinds("transaction_number")
const select_credit = ref(false)
const select_payment = ref('')
const via_membership = ref(false)
const phone_number = ref('')
const active_btn = ref("")
const paymentsBtn = ref([
  {
    name: "Pay Cash",
    _id: "#pay_cash",
    value: "pay_cash",
    activeSrc: "/icons/cash_primary.svg",
    src: "/icons/cash_white.svg",
  },
  {
    name: "Pay by card",
    _id: "#pay_byCard",
    value: "pay_byCard",
    activeSrc: "/icons/credit_primary.svg",
    src: "/icons/credit_white.svg",
  },
])
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
};
const selectedPayment = (value) => {
  active_btn.value = value
}
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})
watch(value, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
const cancel = () => {
  value.value = false
}
const toggleSelectCredit = () => {
  select_payment.value = 'credit'
}
const togglePaymentMethod = () => {
  select_payment.value = 'stripe'
  resetForm()
}
const toggleViaMembership = () => {
  select_payment.value = 'phone'

};
const submitHandler = (select_payment) => {
  // let payload = {
  //     payment: select_payment.value ?? "",
  //     phone_number: phone_number.value?? "",
  //     activity_type: type.value,
  //     call_date: call_date.value,
  //     // reminder_time: String(time.value).substr(16, 17),
  //     reminder_time: time.value,
  //     activity_object: {},
  //   }
  emit("submit", payload)
 
  resetForm()
  value.value = false

}
</script>
<style lang="scss"></style>
