import globalServices from "@/services/global"
import {defineStore} from "pinia"
export const globalStore = defineStore('global',{
    state:()=>({

    }),
    getters:{

    },
    actions:{
      convertDocToUrl(file){
            return globalServices.convertDocToUrl(file)
      }    
    }
})