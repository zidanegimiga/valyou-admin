<template>
   <Dialog
    v-model:visible="value"
    modal
    header="Add New Request"
    :style="{ 'min-width': '25vw' }"
  >
  <div class="flex   justify-content-between gap-3">
    <!-- dropdown -->
    <CustomInputContainer label="Requested By">
    <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>
<CustomInputContainer label="Request Type">
<Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>
</div>
<div class="flex  justify-content-between gap-3">
    <CustomInputContainer label="Project Name">
<Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer>
<CustomInputContainer label="Client Name">
<Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown>
</CustomInputContainer></div> <div class="flex gap-3"><CustomInputContainer label="Requested By"><Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown></CustomInputContainer><CustomInputContainer label="Assigned To"><Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
   
</Dropdown></CustomInputContainer></div>
<div  class="my-3">
    <CustomInputContainer label="Description">
    <InputText type="text" v-model="value" />
</CustomInputContainer>

</div>

        <div class="col-12 ">
          <UploadFile v-model="files"/>
        </div>
     
<div class="flex gap-2  justify-content-end">
      <Button outlined @click.prevent="value = !value" color="red">Discard</Button>
      <Button @click.prevent="handleSubmit">Save</Button>
    </div>
   </Dialog>
</template><script>
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