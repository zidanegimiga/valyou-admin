const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;

// Update Ticket for Prize flow
  export const Publish_btn =  (payload) => {
    const URL = "admin/draw/notifications/process/";
    return $fetch(URL, {
      baseURL,
      method: "POST",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };