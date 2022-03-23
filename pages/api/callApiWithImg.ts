import axios from "axios";

export default function callApiWithImg(method: any, url: any, dataSend: any) {
    return axios({
        method: method,
        url: url,
        data: dataSend,
        headers: { 'Content-Type': 'application/json' },
    });
}
