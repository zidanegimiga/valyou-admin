<template>
  <LeadDiscard
    :showDiscard="showDiscard"
    :discardId="currentLead?._id"
    :hiddenConfirmModal="hiddenConfirmModal"
    @close="showDiscard = false"
  />
  <PaymentDetails v-if="showPaymentDetails" :leadById="leadById" />
  <div class="mt-3 border-round-lg bg-white p-4" v-else>
    <div class="grid send-email ">
      <div class="col-12 flex justify-content-between">
        <h2 class="font-bold">
          Email {{ currentLead.customers.first_name }}
          {{ currentLead.customers.last_name }}
        </h2>
        <div class="buttons">
          <Button class="text-center mr-2 justify-content-center align-items-center" outlined @click="showDiscard = true"
            >Discard</Button
          >
          <Button class="text-center justify-content-center align-items-center" @click="submitPayment">Send</Button>
        </div>
      </div>
      <div class="col-12">
        <CustomInputContainer label="From" class="w-30rem">
          <template v-slot>
            <InputText
              id="from"
              v-model="formData.from"
              placeholder="Enter Email"
              type="email"
              disabled
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Send To" class="w-30rem">
          <template v-slot>
            <InputText
              id="to"
              v-model="formData.sendTo"
              placeholder="Enter Email"
              type="email"
              disabled
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Cc" class="w-30rem">
          <template v-slot>
            <InputText
              id="cc"
              v-model="formData.cc"
              placeholder="Enter Email"
              type="email"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Subject" class="w-30rem">
          <template v-slot>
            <InputText
              id="subject"
              v-model="formData.subject"
              placeholder="Enter subject"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 attachments">
        <p>Attachments</p>
        <UploadFile v-model="attachments" class="w-30rem" />
      </div>
      <div class="col-12">
        <span></span>
        <Editor
          v-model="formData.body"
          style="'overflow-y: scroll'"
          editorStyle="height: 150px"
        />
      </div>
      <div class="col-12">
        <h2>
          <strong>Payment Link : </strong>
          <span class="text-primary"
            ><a :href="formData.payment" target="_blank">{{
              formData.payment
            }}</a>
          </span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPaymentLink, emailSender, getImageURL,leadByLead } from "@/services/leads"
import LeadDiscard from "../../components/Modals/LeadDiscard.vue"
import PaymentDetails from "../../containers/Leads/Leads/Sections/PaymentDetails.vue"
const props = defineProps({
  currentLead: {
    type: Object,
  },
})
const hiddenConfirmModal = ref(false)
const showDiscard = ref(false)
const attachments = ref([])
const showPaymentDetails = ref(false)
const formData = reactive({
  from: "zaheer@nathandigital.com",
  sendTo: "",
  subject: "testing",
  body: "testing",
  cc: [],
  attachments: [],
  payment: "payment",
  toEmail:''
})
console.log(props.currentLead)
if (props.currentLead.lead_type !== "Event") {
  console.log(props.currentLead)
  getPaymentLink(props.currentLead.customers._id).then((res) => {
    for (let prop in res.data.value) {
      formData[prop] = res.data.value[prop]
    }
  })
}
const leadById = ref({})
const submitPayment = async () => {
  const imgs= ref([])
  for(let prop in attachments.value){
    const formdata = new FormData()
    formdata.append('document',attachments.value[prop],attachments.value[prop].name)
    imgs.value.push(formdata)
  }
  if (imgs.value.length > 0) {
    await getImageURL(imgs.value).then((res) => {
      console.log(res.data.value)
      res.data.value?.forEach((item)=>{
        formData.attachments.push(item)
      })
    })
  }
  try {
     const {data , error,status} = await emailSender(formData,props.currentLead.customers._id)
     console.log(status.value)
     if(status.value === "success"){
       const {data:lead} = await leadByLead(props.currentLead._id)     
       leadById.value = lead.value
       showPaymentDetails.value = true
    }
       } catch (error) {
    console.log(error)
   }
  // .then((res)=>{
  //    leadByLead(props.currentLead._id).then((res)=>{
  //     console.log(res.data.value)
  //   })
  // })
}
const from = ref()
const to = ref()
const cc = ref()
const subject = ref("")
const editor = ref("")
</script>

<style lang="scss">
.send-email {
  .cic__input_wrap {
    display: flex;
    align-items: center;
    p {
      min-width: 5rem;
    }
  }
  .attachments {
    display: flex;
    align-items: center;
    p {
      min-width: 5rem;
    }
  }
  .buttons {
    button {
      min-width: 10rem;
    }
  }
}
</style>
