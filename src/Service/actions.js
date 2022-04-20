
import axios from "axios";

export const postRequestInit = (data) => {
    return axios({
          url:"http://surveybackend-env-1.eba-uawqt9qi.ap-northeast-1.elasticbeanstalk.com/init",
          method: "POST",
          data:data
        })
}

export const postRequest = (data) => {
    return axios({
          url:"http://surveybackend-env-1.eba-uawqt9qi.ap-northeast-1.elasticbeanstalk.com/",
          method: "POST",
          data:data
        })
}
