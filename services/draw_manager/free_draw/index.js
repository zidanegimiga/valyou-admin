const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

export const GetFreeDrawList = (payload) => {
    const URL = "admin/draw/freedraw/List";
    return $fetch(URL, {
      baseURL,
      method: "POST",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };