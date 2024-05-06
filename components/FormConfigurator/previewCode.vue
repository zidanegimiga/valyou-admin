<script setup>
import { GridLayout, GridItem } from "grid-layout-plus"
const props = defineProps({
  layoutGridProp: {
    type: Object,
  },
  labelBtn: {
    type: String,
  },
  module: {
    type: String,
  },
  show:{
    type:Boolean
  },
  emitType:{
    type:String
  }
})
const emits = defineEmits(["update:name", "update:module"])
const { layoutGridProp } = toRefs(props)
const layoutGrid = ref()
watch(
  () => layoutGridProp.value,
  (val) => {
    layoutGrid.value = val
    
  }
,{immediate:true})
const submitForm = () => {
  console.log("done")
  console.log(layoutGrid.value)
}
const checkRules = (value, message, event) => {
  if (!value) {
    return
  }
  console.log(event.target.value)
  const checkResult = RegExp(value).test(event.target.value)
  if (checkResult) {
    event.target.classList.add("valid")
    event.target.classList.remove("invalid")
    event.target.nextElementSibling.textContent = ""
  } else {
    event.target.classList.add("invalid")
    event.target.classList.remove("valid")
    event.target.nextElementSibling.textContent = message
  }
}
const checked = ref(false)
</script>
<template>

  <form action="" @submit.prevent="submitForm" class="w-full p-3 mt-4">
    <GridLayout v-model:layout="layoutGrid" :col-num="12" :row-height="30">
      <GridItem
        v-for="item in layoutGrid"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :is-draggable="false"
        :is-resizable="false"
        :class="[
          'flex',
          {
            'flex-column': item.obj?.cssAttrs?.labelPosition === 'top',
            'flex-row': item.obj?.cssAttrs?.labelPosition === 'left',
            'flex-row-reverse': item.obj?.cssAttrs?.labelPosition === 'right',
            'align-items-center': item.obj.cssAttrs?.labelPosition === 'left',
            'align-items-center': item.obj.cssAttrs?.labelPosition === 'right',
          },
        ]"
      >
        <div
          v-if="item.obj?.type === 'textlabel'"
          :style="{
            fontSize: item.obj?.cssAttrs?.size?.size,
          }"
          :class="[
            'relative',
            {
              'font-bold': item.obj?.cssAttrs?.boldText,
              'font-italic': item.obj?.cssAttrs?.italicText,
              underline: item.obj?.cssAttrs?.underlineText,
            },
          ]"
        ></div>

        <label
          v-else
          :for="`input${item.obj?.id}`"
          :class="[
            'relative',
            {
              'font-bold': item?.obj?.cssAttrs?.boldLabel,
              'font-italic': item?.obj?.cssAttrs?.italicLabel,
              underline: item?.obj?.cssAttrs?.underlineLabel,
            },
          ]"
          :style="{
            width: item?.obj?.cssAttrs?.widthLabel + 'px',
            fontSize:
              item?.obj?.cssAttrs?.sizeLabel?.size !== 'label'
                ? item?.obj?.cssAttrs?.sizeLabel?.size
                : '0.9rem',
            marginBottom: item.obj?.cssAttrs.gapBetweenLabelAndInput + 'px',
          }"
          >{{ item?.obj?.htmlAttrs?.label }}
          <span
            v-if="item?.obj?.rules[0]?.required"
            class="req-star absolute text-red-600"
            >*</span
          ></label
        >
        <div v-if="item.obj?.type === 'text'">
          <div
            class="flex border-1 border-gray-400 border-round-md p-0"
            v-if="item.obj?.htmlAttrs.icon"
          >
            <div
              class="border-right-1 border-gray-400 px-2 flex justify-content-center align-items-center"
            >
              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-800" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4ZM20 8l-7.475 4.675q-.125.075-.263.113t-.262.037q-.125 0-.263-.037t-.262-.113L4 8v10h16V8Zm-8 3l8-5H4l8 5ZM4 8v.25v-1.475v.025V6v.8v-.012V8.25V8v10V8Z"/></svg> -->
              <span v-html="item.obj?.htmlAttrs.icon"></span>
            </div>
            <InputText
              :id="`input${item.obj?.id}`"
              class="py-2 text-black border-none"
              type="text"
              :placeholder="item.obj?.htmlAttrs.placeholder"
              :pattern="item.obj?.rules[0].RegExp"
              v-model="item.obj.keys.value"
              :disabled="show"
              @input="
                checkRules(
                  item.obj?.rules[0].RegExp,
                  item.obj?.rules[0].message,
                  $event
                )
              "
            />
          </div>
          <InputText
            :id="`input${item.obj?.id}`"
            v-else
            type="text"
            :disabled="show"
            :placeholder="item.obj?.htmlAttrs.placeholder"
            :pattern="item.obj?.rules[0].RegExp"
            v-model="item.obj.keys.value"
            @input="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-sm my-1 text-red-400 font-bold"></div>
        </div>
        <div
          class="card flex justify-content-center"
          v-else-if="item.obj?.type === 'password'"
        >
          <div
            class="flex border-1 border-gray-400 border-round-md p-0 w-full"
            v-if="item.obj?.htmlAttrs.icon"
          >
            <div
              class="border-right-1 border-gray-400 px-2 flex justify-content-center align-items-center"
            >
              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-800" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4ZM20 8l-7.475 4.675q-.125.075-.263.113t-.262.037q-.125 0-.263-.037t-.262-.113L4 8v10h16V8Zm-8 3l8-5H4l8 5ZM4 8v.25v-1.475v.025V6v.8v-.012V8.25V8v10V8Z"/></svg> -->
              <span v-html="item.obj?.htmlAttrs.icon"></span>
            </div>
            <Password
              v-model="item.obj.keys.value"
              :toggleMask="item.obj?.htmlAttrs.showPassIcon"
              :inputId="item.obj?.id"
              :placeholder="item.obj?.htmlAttrs.placeholder"
              :required="item.obj?.rules[0].required"
              :disabled="show"
              @input="
                checkRules(
                  item.obj?.rules[0].RegExp,
                  item.obj?.rules[0].message,
                  $event
                )
              "
              class="border-0 w-full"
            />
          </div>
          <Password
            v-model="item.obj.keys.value"
            :toggleMask="item.obj?.htmlAttrs.showPassIcon"
            :inputId="item.obj?.id"
            :placeholder="item.obj?.htmlAttrs.placeholder"
            :required="item.obj?.rules[0].required"
            :disabled="show"
            @input="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
            v-else
            class="w-full"
          />
        </div>

        <div v-else-if="item.obj?.type === 'number'">
          <InputNumber
            v-model="item.obj.keys.value"
            :inputId="item.obj?.id"
            :min="item.obj?.htmlAttrs.min"
            :max="item.obj?.htmlAttrs.max"
            mode="decimal"
            showButtons
            :disabled="show"
            :placeholder="item.obj?.htmlAttrs.placeholder"
            :required="item.obj?.rules[0].required"
            @input="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-red-400 font-bold"></div>
        </div>
        <div
          class="flex flex-wrap gap-3"
          v-else-if="item.obj?.type === 'radio'"
        >
          <div
            class="flex align-items-center"
            v-for="(option, i) in item.obj?.options"
            :key="i"
          >
            <RadioButton
              v-model="item.obj.keys.value"
              :inputId="option.label"
              :name="option.label"
              :value="option.value"
              :disabled="show"
              @change="
                checkRules(
                  item.obj?.rules[0].RegExp,
                  item.obj?.rules[0].message,
                  $event
                )
              "
            />
            <label :for="option.label" class="ml-2">{{ option.label }}</label>
          </div>
          <div class="error-msg text-red-400 font-bold"></div>
        </div>

        <div v-else-if="item.obj?.type === 'checkbox'">
          <Checkbox
            v-model="item.obj.keys.value"
            :inputId="`input${item.obj?.id}`"
            :binary="true"
            :required="item.obj?.rules[0].required"
            :disabled="show"
            @change="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-sm text-red-400 font-bold"></div>
        </div>
        <div v-else-if="item.obj?.type === 'date'">
          <Calendar
            :inputId="`input${item.obj?.id}`"
            v-model="item.obj.keys.value"
            :required="item.obj?.rules[0].required"
            :disabled="show"
            class="w-full"
            @change="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-red-400 font-bold"></div>
        </div>
        <div v-else-if="item.obj?.type === 'time'">
          <Calendar
            :inputId="`input${item.obj?.id}`"
            :required="item.obj?.rules[0].required"
            v-model="item.obj.keys.value"
            :disabled="show"
            class="w-full"
            timeOnly
            @change="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-red-400 font-bold"></div>
        </div>
        <div v-else-if="item.obj?.type === 'switch'">
          <InputSwitch
            :inputId="`input${item.obj?.id}`"
            :required="item.obj?.rules[0].required"
            v-model="item.obj.keys.value"
            :disabled="show"
            @change="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-red-400 font-bold"></div>
        </div>
        <div v-else-if="item.obj?.type === 'textarea'">
          <Textarea
            :id="`input${item.obj?.id}`"
            :required="item.obj?.rules[0].required"
            v-model="item.obj.keys.value"
            :disabled="show"
            autoResize
            :placeholder="item.obj?.htmlAttrs.placeholder"
            :rows="item.obj?.htmlAttrs.rows"
            :cols="item.obj?.htmlAttrs.rows"
            @input="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-red-400 font-bold"></div>
        </div>
        <div v-else-if="item.obj?.type === 'select'">
          <Dropdown
            :id="`input${item.obj?.id}`"
            :required="item.obj?.rules[0].required"
            v-model="item.obj.keys.value"
            :options="item.obj?.options"
            optionLabel="label"
            :placeholder="item.obj?.htmlAttrs.placeholder"
            :disabled="show"
            @change="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
          <div class="error-msg text-red-400 font-bold"></div>
        </div>
        <div v-else-if="item.obj?.type === 'rate'">
          <Rating
            :inputId="`input${item.obj?.id}`"
            :required="item.obj?.rules[0].required"
            :stars="parseInt(item.obj?.htmlAttrs.numOfStars)"
            v-model="item.obj.keys.value"
            :disabled="show"
            :cancel="false"
            @input="
              checkRules(
                item.obj?.rules[0].RegExp,
                item.obj?.rules[0].message,
                $event
              )
            "
          />
        </div>
        <div class="error-msg text-red-400 font-bold"></div>
      </GridItem>
    </GridLayout>
    <Button class="mt-3 w-6 mx-auto block" v-if="emitType !== 'show'" :label="labelBtn" type="submit" />
  </form>
</template>
<style scoped>
input:focus {
  box-shadow: none !important;
  border: 1px solid #ced4da !important;
}

form {
  width: 100%;
  margin: 0px auto;
  background-color: #fff;
  padding: 20px 40px;
}

form input {
  transition: all 0.3s ease-in-out;
}

input.invalid {
  color: red;
  box-shadow: 0 0 4px 2px rgba(255, 0, 0, 0.5) !important;
  border: none !important;
}

input.valid {
  border-color: 1px solid #ced4da;
}

.custom-form .p-inputtext.p-password-input {
  border: none !important;
}
</style>
