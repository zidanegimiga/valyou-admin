import {Get_Customers_list, Get_Customer, Edit_Customer } from "./shared";
const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


export const get_Customers_list = (payload) => {
    return Get_Customers_list(payload);
  };

  export const GetCustomer = (payload,_id) => {
    return Get_Customer(payload,_id)
  };


  export const EditCustomer = (payload,_id) => {
    return Edit_Customer(payload,_id)
  };