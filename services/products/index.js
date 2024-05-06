
import {Get_Products_list } from "./shared";
const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


export const getDataTable_list = (payload) => {
  
  return Get_Products_list(payload);
};