const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


  export const GetDrawID =  (payload,_id) => {
    const URL = "admin/draw/freedraw/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "GET",
      headers: {
        Authorization: token || useAuth().token.value,
      },
    //   body: payload,
    });
  };

  // for stage 1 & 2
  export const GetCustomersList = (payload,_id) => {
    const URL = "admin/draw/freedraw/customer_list/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "POST",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };

  export const GetVPAnnouncementList = (payload,_id) => {
    const URL = "admin/draw/valyou_point/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "POST",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };

  export const Export_Submit_DED = (payload,_id) => {
    const URL = "admin/draw/json/convert_to_xlsx/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "GET",
      headers: {
        Authorization: token || useAuth().token.value,
      },
    //   body: payload,
    });
  };

  // for valyou point
  export const Export = (payload,_id) => {
    const URL = "admin/draw/json/convert_valyou_xlsx/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "GET",
      headers: {
        Authorization: token || useAuth().token.value,
      },
    //   body: payload,
    });
  };

  // Stage move forward
  export const Proceed_Next = (payload,_id) => {
  const URL = "admin/draw/process/moveforward/"+_id;
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};


"{{host}}/"

  // Stage move forward
  export const fetch_ValyouPoint = (payload,_id) => {
    const URL = "admin/draw/fetch/valyou_point/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "POST",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      // body: payload,
    });
  };

  // Stage move forward
  export const Update_Winner = (payload,_id) => {
    const URL = "admin/draw/"+_id;
    return $fetch(URL, {
      baseURL,
      method: "POST",
      headers: {
        Authorization: token || useAuth().token.value,
      },
      body: payload,
    });
  };

export const Publish_UserWinner = (payload,_id) => {
  const URL = "admin/draw/"+_id;
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};