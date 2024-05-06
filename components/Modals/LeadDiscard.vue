
import { emit } from 'process';
<script setup>
import Modal from "../Common/Modal.vue"
import { useToast } from "primevue/usetoast";
const emits =defineEmits(['close'])
const toast = useToast();

const props = defineProps({
  showDiscard: { type: Boolean },
  hiddenConfirmModal:{type:Boolean},
  discardId:{type:String}
})
const { showDiscard } = toRefs(props)
const showDiscardModal = ref(false)
watch(
  () => showDiscard.value,
  (val) => {
    console.log(val)
    showDiscardModal.value = val
  }
)
const { hiddenConfirmModal } = toRefs(props)
const discardCustomer = () => {
  showDiscardModal.value = true
}
const reason = ref("price too high")
const other_reason = ref("")
const showConfirmModal = ref(false)
watch(
  () => hiddenConfirmModal.value,
  (val) => {
    console.log(val)
    showConfirmModal.value = val
  }
)
const err = ref('')
const discardLead = ()=>{
    useMyFetch(`/admin/leads/discard/${props.discardId}`,{method:"PATCH",body:{reason:reason.value === 'other'?other_reason.value : reason.value}}).then((res)=>{
      showConfirmModal.value = false
      emits('close')
      toast.add({ severity: 'error', summary: 'Discarded', detail: 'Added to Discarded Leeds', life: 3000 })
      setTimeout(() => {
        navigateTo('discarded-leads')
      }, 2000);
    })
}

const checkReason = ()=>{
  if(reason.value === 'other'){
    if(!other_reason.value){
      err.value ='Value is Required'
      return
    }else{
    showConfirmModal.value  = true
      
    }
  }else{
    showConfirmModal.value  = true
  }
}
watch(()=> reason.value , (val)=>{
  if(val.length > 0){
    err.value = ''
  }
})
</script>
<template>
  <div>

    <Toast />
    
      <Dialog
      v-model:visible="showConfirmModal"
      modal
      :style="{ 'min-width': '15vw'}"
      @update:visible="showConfirmModal = false"
      >
      <template #header>
      </template>
      <h5 class="font-extraBold p-2 text-center">Are you sure <br> you would like to discard this lead?</h5>
      <slot />
      <div class="col-12 flex justify-content-end gap-2">
        <Button
        outlined
        @click.prevent="showConfirmModal = false"
        class="font-extraBold w-7rem align-items-center text-center flex justify-content-center"
        >Cancel</Button
        >
        <Button
        @click.prevent="discardLead"
        :class="['font-extraBold w-7rem align-items-center text-center flex justify-content-center' , btnStyle ? btnStyle : '' ]"
        >Yes, Discard</Button
        >
      </div>
    </Dialog>
    <Modal
    :show="showDiscardModal"
    @close="$emit('close')"
    :btnStyle="'bg-red-100 text-red-400 border-none'"
    title="Select Reason To Discard"
    @submit="checkReason"
  >
  <div class="flex flex-column gap-4 mb-4">
    <div class="flex align-items-center">
      <RadioButton
      v-model="reason"
      inputId="reason1"
      name="priceTooHigh"
      value="price too high"
      />
      <label for="reason1" class="ml-2 text-sm font-bold"
      >Price Too High</label
        >
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="reason"
          inputId="reason2"
          name="exploringEvents"
          value="exploring events"
          />
          <label for="reason2" class="ml-2 text-sm font-bold"
          >Exploring Events</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
          v-model="reason"
          inputId="reason3"
          name="NotLookingAtTheMoment"
          value="not looking at the moment"
          />
          <label for="reason3" class="ml-2 text-sm font-bold"
          >Not Looking at the moment</label
          >
        </div>
      <div class="flex align-items-center">
        <RadioButton
        v-model="reason"
        inputId="reason4"
        name="other"
        value="other"
        />
        <label for="reason4" class="ml-2 text-sm font-bold">Other</label>
        <InputText
        type="text"
        :disabled="reason !== 'other'"
        class="ml-2"
        v-model="other_reason"
        placeholder="Enter Reason"
        />
      </div>
      <p class="text-sm text-red-600">{{ err }}</p>
    </div>
  </Modal>
</div>
</template>
