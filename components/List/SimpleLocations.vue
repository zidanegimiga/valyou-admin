  <template lang="">


  <div class="simple__list_wrap" >
    <div class="sl__category_text">
      <div class="flex">

        <Avatar  shape="circle" :icon="icon" style="color:#0090FF;background: rgb(0 144 255 / 20%);"/>
        <div class="flex flex-column ml-3">
        <span class="ml-1 mt-1"> {{type}} </span>
        <Tag
        v-if="is_default"
          class="mt-2 p-0 font-size-small font-bold"
          value="Default"
          style="
            transform: translate(2px, 0px);
            font-size: 12px !important;
            min-width: 3.5rem;
            padding: 3px !important;
            border-radius: 5px !important;
          "
        />
      </div>
      </div>
    </div>
    <div
      class="sl__text flex algin-items-center gap-3"
      style="align-items: center"
    >
    <div class="simple__list_wrap flex flex-column gap-3" style="border:0">
      <div v-for="(item, index) in list_location" :key="index" class="flex gap-3">
        <span style="color:#8D98A9" >{{item.pram}}</span>
        
      </div>

    </div>

    

    
    </div>

    <div
      class="sl__text flex algin-items-center gap-3"
      style="align-items: center"
    >
    <div class=" flex flex-column gap-3" style="border:0">
      <div v-for="(item, index) in list_location" :key="index" class="flex gap-3">
        <span>{{item.value}}</span>
        
      </div>

    </div>

    

    
    </div>
  </div>


</template>
<script>
export default {
  name: "SimpleList",
  props: {



    icon:{
      type: String,
      default: "pi pi-home"
    },

    type: {
      type: String,
      default: "Home",
    },

    is_default:{
      type: Boolean,
      default:false
    },

    list_location:{
      type: Array,
      default:[
        {
          pram:"Flat / Building",
          value:"Flat # 24, 3rd floor"
        },
        {
          pram:"Street",
          value:"Sheikh Zayed Road"
        },
        {
          pram:"City",
          value:"Dubai"
        },

        {
          pram:"Contact No",
          value:"+971-52 6813408"
        },
      ]
    }


  },
}
</script>
<style lang="scss">
.simple__list_wrap {
  display: grid;
  grid-template-columns: 0.66fr 0.6fr 0.48fr 0.5fr;
  column-gap: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding: 1.28rem;
  padding-left: 0rem;
}
.sl__category_text {
  color: #8d98a9;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: -0.42px !important;
}
.sl__text {
  text-transform: capitalize;
  color: #000;
  font-weight: 600;
  font-size: 0.8rem;
}
</style>
