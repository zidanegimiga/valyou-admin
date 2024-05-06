// for same api that we use it in deferent places

const token = useAuth().token?.value || useCookie("auth:token").value || "";
const baseURL = useRuntimeConfig().public.baseURL;


export const getImagesURL = (payload) => {
  const URL = "admin/user/upload_file";
  return $fetch(URL, {
    baseURL,
    method: "POST",
    headers: {
      Authorization: token || useAuth().token.value,
    },
    body: payload,
  });
};

// images list
export const EasyGetImagesURL = async (FileUpload_list, toast) => {
  let images_links = []
  const form_data = new FormData()
  
  if (FileUpload_list.length > 0) {
    toast.add({
      severity: "info",
      summary: "Handling Images",
      detail: "Please Wait ...",
      life: 3000,
    })

    for (let prop in FileUpload_list) {
      form_data.append(
        "file",
        FileUpload_list[prop],
        FileUpload_list[prop].name
      )
    }

    let res_images = await getImagesURL(form_data)
    images_links = res_images?.data.map((item) => item?.url)

    return images_links;
  }

  

};