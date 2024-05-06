const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const Get_Shipments_list = (payload) => {
  const URL = "admin/shipment/list_shipment";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const Get_Shipment = (payload, _id) => {
  const URL = "admin/shipment/" + _id;
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    //   body: payload,
  });
};
