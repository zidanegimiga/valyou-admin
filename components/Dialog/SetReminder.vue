<template lang="">
  <Dialog v-model:visible="value" modal :style="{ 'min-width': '28vw' }">
    <template #header>
      <h5 class="font-extraBold">Set Reminder</h5>
    </template>
    <div class="flex align-items-start">
      <div class="flex align-items-center">
          <Checkbox
            v-model="setReminderBeforeMeeting"
            inputId="'inputId'"
            :binary="true"
            @change="changeValue(item, index)"
            class="filter__checkbox"
          />
          
        </div>
      <div>
        <div class="flex flex-column ml-3">
          <label for="'inputId'" class="font-extraBold mb-2">
            Before Meeting
          </label>
          <Dropdown
          v-model="meeting_ahead"
          :options="meeting_ahead_items"
          placeholder="Select a reminder"
          class="w-full md:w-15rem ml"
          :disabled="setReminder !== 'specificTime'"
          />
        </div>
      </div>
    </div>
    <div class="flex align-items-start mt-4">
      <div class="flex align-items-center">
          <Checkbox
            v-model="setReminderSpecificTime"
            inputId="'inputId'"
            :binary="true"
            @change="changeValue(item, index)"
            class="filter__checkbox"
          />
          
        </div>
      <div>
        <div class="flex flex-column ml-3">
          <label for="'inputId'" class="font-extraBold mb-2">
            Specific Time
          </label>
          <div
      class="flex gap-2 align-items-center justify-content-between reminder_input_wrap"
    >
      <CustomInputContainer label="">
        <template v-slot>
          <DatePicker
            showIcon
            class="custom__inner_date_picker"
            placeholder="DDMMYYYY"
            v-model="date"
            dateFormat="dd MM yy"
          :disabled="setReminder === 'specificTime'"

          />
        </template>
      </CustomInputContainer>
      <CustomInputContainer label="">
        <template v-slot>
          <DatePicker
            timeOnly
            placeholder="00:00 PM"
            v-model="time"
            hourFormat="12"
          :disabled="setReminder === 'specificTime'"

          />
        </template>
      </CustomInputContainer>
    </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2 mt-4 justify-content-end">
      <Button outlined @click.prevent="value = !value">Cancel</Button>
      <Button @click.prevent="handleSubmit" :disabled="disableSet">Set</Button>
    </div>
  </Dialog>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: "ReminderDialog",
  props: {
    modelValue: {
      default: false,
    },
  },
  emits: ["submit", "update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
    disableSet() {
      return !this.meeting_ahead && ( !this.date || !this.time)
    },
  },
  data() {
    return {
      date: null,
      time: null,
      setReminderSpecificTime:false,
      setReminderBeforeMeeting:true,
      setReminder:'specificTime',
      meeting_ahead_items: [
        "15 minutes",
        "1 hour",
        "2 hour",
      ],
      meeting_ahead: '15 minutes',
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.date = null
          this.time = null
          this.meeting_ahead = '15 minutes'
        }
      },
    },
    setReminderSpecificTime:{
      handler(newVal){
        console.log(newVal)
        if(newVal){
          this.setReminder = 'beforeMeeting'
          this.setReminderBeforeMeeting = ''
          this.meeting_ahead = ''
        }
      }
    },
    setReminderBeforeMeeting:{
      handler(newVal){
        if(newVal){
          this.setReminder = 'specificTime'
          this.setReminderSpecificTime = ''
          this.date= '' 
          this.time=''
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      var date = this.date  && this.time ? `${dayjs(this.date).format('YYYY-MM-DDT')}${dayjs(this.time).format('HH:mm:ssZ')}` : '' 
      this.$emit("submit", {
        reminder_time: date ,
        set_reminder_time:this.meeting_ahead
      })
      this.value = !this.value
    },
  },
}
</script>
<style lang="scss">
.reminder_input_wrap {
  & > div:first-child {
    flex: 2;
  }
  & > div:last-child {
    flex: 1;
  }
  .p-calendar {
    width: 100%;
  }
}
</style>
