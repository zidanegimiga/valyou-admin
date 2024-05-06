import {defineStore} from "pinia"
import leadsServices from "@/services/leads"
export const leadsStore = defineStore('leads',{
    state:()=>({
        selectedLeads:null
    }),
    getters:{

    },
    actions:{
        getAllLeads(){
            return leadsServices.getAlllLeads()
        },
        markContact(id){
            return leadsServices.markContacted(id)
        },
        moveForward(payload){
            return leadsServices.moveForward(payload,this.selectedLeads._id)
        },
        checkConflict(){
            return leadsServices.checkConflict(this.selectedLeads._id)
        },
        getDocumentForLeads(){
            return leadsServices.getDocumentForLeads(this.selectedLeads._id)

        },
        getNextId(){
            return leadsServices.getNextId()
        },
        getClients(){
            return leadsServices.getClients()
        },
        // skipPorposal(){
        //     return leadsServices.skipPorposal({module:'leads', id:this.selectedLeads._id})
        // }
    }
})