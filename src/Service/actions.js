
import axios from "axios";

export const postRequestInit = (data) => {
    return axios({
          url:"https://www.simplesurvey.click/init",
          method: "POST",
          data:data
        })
}

export const postRequest = (data) => {
    return axios({
          url:"https://www.simplesurvey.click",
          method: "POST",
          data:data
        })
}
