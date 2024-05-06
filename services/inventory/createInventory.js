const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const CreateInventory = (payload) => {
  const URL = "admin/inventory/create";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};