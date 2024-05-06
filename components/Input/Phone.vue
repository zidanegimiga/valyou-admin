<template lang="">
  <div class="simple__input_wrap">
    <p v-if="label" class="accent2 font-size-small">{{ label }}</p>
    <div class="flex"  >
      <Dropdown
        v-model="this_dialCode"
        :options="countries"
        filter
        optionLabel="dial_code"
        placeholder="eg: +971"
        class="w-6rem dropdown__dialCode "
        :class="input_class"
      >
        <template #value="slotProps">
          <div
            v-if="slotProps.value"
            class="flex align-items-center dialCode__wrap_value"
          >
            <img
              :alt="slotProps.value.name"
              :src="slotProps.value.image"
              :class="`mr-2 flag flag-${slotProps.value.code}`"
              style="width: 18px"
            />
            <div class="dialCode_label">{{ slotProps.value.dial_code }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <img
              :alt="slotProps.option.name"
              :src="slotProps.option.image"
              :class="`mr-2 flag flag-${slotProps.option.code}`"
              style="width: 18px"
            />
            <div class="dialCode_label">{{ slotProps.option.dial_code }}</div>
          </div>
        </template>
      </Dropdown>
      <InputNumber
        v-model="value"
        :placeholder="placeholder"
        class="phone__input_custom"
        :class="input_class"
        :useGrouping="false"
        :disabled="disabled"

      />
    </div>
  </div>
</template>


<script>
import countries from "@/json/countries.json";
import { watch } from 'vue';

export default {
  name: "PhoneInput",
  setup(props, { emit }) {
    const this_dialCode = ref(null);
    // const countries = ref(countries);

    watch(() => props.this_dialCode, (newVal) => {
      emit('update:dialCode', newVal.dial_code);
    });

    // return { this_dialCode };

  },
  props: {
    label: {
      default: "",
      type: String,
    },
    placeholder: {
      default: "eg: 5641234567",
      type: String,
    },
    modelValue: {
      default: null,
    },
    dialCode: {
      default: "",
    },
    disabled:{
      type:Boolean,
      default:false
    },
    input_class:{
    type:Object,
    default:""
  }
  },
  emits: ["update:modelValue", "update:dialCode"],
  mounted() {
    if(this.dialCode === ''){
      this.$emit('update:dialCode', this.countries[0])
    }

    this.this_dialCode = this.countries.find((item)=>item.dial_code == this.dialCode);
  },
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

  watch: {
    dialCode(newVal) {
      if(newVal === ''){
        this.$emit('update:dialCode', newVal);
      }
      else if(newVal != '' || typeof newVal === 'string'){
        this.this_dialCode = this.countries.find((item) => item.dial_code == newVal);
      }
      else{
        this.$emit('update:dialCode', newVal);
      }
      
    },

    this_dialCode(newVal){
      if(newVal != undefined){
        this.$emit('update:dialCode', newVal.dial_code);
      }
    }
  },
  
  data() {
    return {
      countries,
      this_dialCode: null
    };
  },
};
</script>


<style lang="scss">
.simple__input_wrap {
  p {
    font-size: 0.7rem !important;
    font-weight: 300;
    padding-bottom: 0.4rem;
    // padding-left: 0.4rem;
    position: relative;
  }
}
.dialCode__wrap_value {
  font-size: 0.725rem;
}
.dropdown__dialCode {
  border-right: 0px;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  .p-dropdown-trigger {
    display: none;
  }
}
.dialCode_label {
  color: #485057;
}
.phone__input_custom {
  position: relative;
  // right: 0.8rem;

  .p-inputnumber-input {
    padding: 0.5rem;
    font-size: 0.725rem;
    background: transparent;
    border-left: 0px;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    width: 100%;
  }
}
</style>
