<template><Dialog
v-model:visible="value"
modal
header="Add new meeting"
:style="{ 'min-width': '20vw' }"
>
<div v-if="true" class="m-0">
    <div class=" gap-2  mb-2 grid_1" >
       <div >
    <CustomInputContainer label="Assigned to" >
    <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>
</div>
<CustomInputContainer label="Meeting Duration" >
    <InputText type="text" v-model="value" />
</CustomInputContainer>


</div>
<div class="mb-2 grid_1 gap-2 meeting_date">
<CustomInputContainer label="Meeting Date"  >
        <template v-slot>
          <DatePicker
            showIcon
            style="width: 100%;"
            class="custom__inner_date_picker"
            placeholder="DDMMYYYY"
            v-model="date"
            dateFormat="dd MM yy"
          />
        </template>
      </CustomInputContainer>
      <CustomInputContainer label="Slot"  >
    <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>

    </div>
    <CustomInputContainer label="Description" class="pa-2">
    <InputText type="text" v-model="value" />
</CustomInputContainer>
<div class="flex gap-2 mt-3 justify-content-end ">
      <Button outlined @click.prevent="value = !value">Cancel</Button>
      <Button @click.prevent="handleSubmit">Done</Button>
    </div>

</div>
<div v-else>
   <div class="flex gap-3 justify-content-between mb-1 grid_1">
    <CustomInputContainer label="Description">
    <InputText type="text" v-model="value" />
</CustomInputContainer><CustomInputContainer label="Description">
    <InputText type="text" v-model="value" />
</CustomInputContainer>

   </div>
   <div class="mb-1">
    <CustomInputContainer label="Meeting Date">
        <template v-slot>
          <DatePicker
            showIcon
            class="custom__inner_date_picker"
            placeholder="DDMMYYYY"
            v-model="date"
            dateFormat="dd MM yy"
          />
        </template>
      </CustomInputContainer>
   </div>
   <div class="flex gap-1 justify-content-between mb-1 grid_1">
    <CustomInputContainer label="Description">
    <InputText type="text" v-model="value" />
</CustomInputContainer><CustomInputContainer label="Description">
    <InputText type="text" v-model="value" />
</CustomInputContainer>

   </div>
   
   
     
        <div class="col-12 mb-3">
          <UploadFile v-model="files"/>
        </div>
      
   
<div class="flex gap-2 justify-content-end">
      <Button outlined @click.prevent="value = !value" color="red">Discard</Button>
      <Button @click.prevent="handleSubmit">Save</Button>
    </div>
</div>
</Dialog>
</template>
<script>
export default {
  name: "AddNewRequestDialog",
  props: {
    modelValue: {
      default: false,
    },
  },
  emits: ["submit",'update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  data() {
    return {
      date: null,
      time: null,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.date = null;
          this.time = null;
        }
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", {
        date: this.date,
        time: this.time?.toLocaleTimeString() ?? null,
      });
      this.value = !this.value
    },
  },
};
</script>
<style>


.grid_1{
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
}
.meeting_date{
    .p-calendar {
width: 100% !important;
    }
}
</style>