//instance of axios

import axios from "axios"
export const commonAPI = async (httpMethod, url, reqBoady) => {
    let reqConfig = {
        method: httpMethod,
        url: url,
        data: reqBoady,
        Headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios(reqConfig).then((result) => {
        return result;
    }).catch((err) => {
        return err;
    })
}