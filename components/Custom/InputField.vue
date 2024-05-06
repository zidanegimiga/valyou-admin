<template lang="">
  <div class="field mb-2">
    <!-- Label for the input field -->
    <label :for="label_text" class=" ">
      <div class="cursor-pointer l-color inline mr-2">
        {{ label_text }}
      </div>
      <small
        class="p-error p-min-error font-bold"
        v-if="error_msg"
        style="display: inline-block; transform: scale(1.05)"
      >
        {{ useRegexUnderScore(error_msg) || "&nbsp;" }}
      </small>
    </label>
    <div class="relative">
      <!-- If the input type is password, use the Password component -->
      <template v-if="type == 'password'">
        <span class="p-input-icon-right login_field">
          <Password
            label="Password*"
            type="password"
            v-model="value"
            :placeholder="placeholder"
            toggleMask
            class="login_field cursor-pointer p-inputtext-this"
            :feedback="false"
            :class="{ 'p-invalid': error_msg }"
          />
        </span>
      </template>

      <!-- For other input types, use the InputText component -->
      <template v-else>
        <InputText
          class="p-inputtext-this"
          :id="label_text"
          :type="type"
          v-model="value"
          :placeholder="placeholder"
          :class="{ 'p-invalid': error_msg }"
        />

        <!-- If an icon is provided, display it on the right side of the input field -->
        <div
          v-if="icon && icon_visible"
          class="h-full absolute top-0 right-0 flex flex-column justify-content-center"
          style="translate: -10px"
        >
          <i :class="icon" :style="{ color: icon_color }"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRegexUnderScore } from "@/composables/regex"

// Define props for the component
const props = defineProps({
  modelValue: {
    default: "",
  },

  label_text: {
    type: String,
    default: "This is label",
  },

  type: {
    type: String,
    default: "text",
  },

  placeholder: {
    default: "Enter your text",
    type: String,
  },

  icon: {
    type: String,
    default: null,
  },

  icon_color: {
    type: String,
    default: "#1C9939",
  },

  icon_visible: {
    type: Boolean,
    default: false,
  },

  error_msg: {
    type: String,
    default: "",
  },
})

// On component mount, set the id of the password input field to the label text
onMounted(() => {
  var input_password = document.querySelector(".p-inputtext-this > input")
  input_password.id = props.label_text
})
</script>

<script>
export default {
  name: "CustomInputField",
  emits: ["update:modelValue"],
  computed: {
    // Create a two-way binding for modelValue
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
  },
}
</script>

<style lang="css">
/* CSS styles for the component */
.l-color {
  letter-spacing: 0px;
  color: #181b20;
  font-weight: bold;
}

.p-inputtext-this {
  border-width: 1px !important;
}

.p-inputtext-this:hover,
.p-inputtext-this:focus {
  border-color: #0a94ff !important;
}

.p-inputtext-this > * {
  border-width: 1px !important;
}

.p-inputtext-this > *:hover,
.p-inputtext-this > *:focus {
  border-color: #0a94ff !important;
}
</style>
