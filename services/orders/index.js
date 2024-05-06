
import {Get_Orders_list } from "./shared";
const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


export const getDataTable_list = (payload) => {
  
  return Get_Orders_list(payload);
};



export const GetStatusCount = (payload) => {
  const URL = "admin/orders/get_status_count";
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};