import axios from "axios";

export default function callAPI(method: any, endpoint: any, dataSend: any, header: any) {
    return axios({
        method: method,
        url: `https://admintlus1.herokuapp.com/api/${endpoint}`,
        data: dataSend,
        headers: { 'Content-Type': 'application/json', 'Authorization': header },
    })
}

