import {Get_Products_list, Get_Product } from "./shared";
const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


export const get_Products_list = (payload) => {
    return Get_Products_list(payload);
  };

  export const GetProduct = (payload,_id) => {
    return Get_Product(payload,_id)
  };