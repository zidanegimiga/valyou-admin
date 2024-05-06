const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const Get_Orders_list = (payload) => {
  const URL = "admin/orders/list_orders";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const Get_Order = (payload, _id) => {
  const URL = "admin/orders/" + _id;
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    //   body: payload,
  });
};
