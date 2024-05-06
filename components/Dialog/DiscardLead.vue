<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    header="State Discard Reason"
    :style="{ 'min-width': '25vw' }"
  >
    <div class="flex flex-wrap flex-column gap-3">
      <div class="flex align-items-center">
        <RadioButton
          v-model="reason"
          inputId="reason1"
          name="reason"
          value="Price Too high"
        />
        <label for="reason1" class="ml-2">Price Too high</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="reason"
          inputId="reason2"
          name="reason"
          value="Just Wanted To Enquire"
        />
        <label for="reason2" class="ml-2">Just Wanted To Enquire</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="reason"
          inputId="reason3"
          name="reason"
          value="Unqualified Lead"
        />
        <label for="reason3" class="ml-2">Unqualified Lead</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="reason"
          inputId="reason4"
          name="reason"
          value="Not Registered Company"
        />
        <label for="reason4" class="ml-2">Not Registered Company</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="reason"
          inputId="reason5"
          name="reason"
          value="other Reason"
        />
        <label for="reason5" class="ml-2">Enter Other Reasons</label>
      </div>
      <Textarea
        v-model="other"
        rows="5"
        cols="30"
        placeholder="Type your Message"
        :disabled="reason !== 'other Reason'"
      />
      <Button
        severity="danger"
        class="discard__lead_btn"
        :disabled="disable_btn"
        @click.prevent="handleSubmit"
        >Discard Lead</Button
      >
    </div>
  </Dialog>
</template>
<script>
export default {
  name: "DiscardLeadDialog",
  props: {
    modelValue: {
      default: false,
    },
  },
  data() {
    return {
      other: "",
      reason: "",
    };
  },
  emits: ["submit", "update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    disable_btn: {
      get() {
        return (
          !this.reason.length 
        );
      },
    },
  },
  data() {
    return { reason: "" };
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.reason = "";
          this.other = '';
        }
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", {
        reason: this.reason === "other Reason" ? this.other : this.reason,
      });
      this.value = !this.value;
    },
  },
};
</script>
<style lang="scss">
.discard__lead_btn {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>
