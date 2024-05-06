const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const Get_Products_list = (payload) => {
  const URL = "admin/product/list_product";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

export const Get_Product = (payload, _id) => {
  const URL = "admin/product/" + _id;
  return $fetch(URL, {
    baseURL,
    method: "GET",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    //   body: payload,
  });
};
