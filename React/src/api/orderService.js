import axios from "axios"

let baseUrl = "http://localhost:8080/orders/";

export function addOrder(data, u) {
    let x = axios.post(baseUrl, data, {
        headers: {
            authorization: u?.token
        }
    });
    return x;
}

export function sevenDaysMore(u) {
    console.log(u);
    return axios.get(baseUrl + "unshipped", {
        headers: {
            authorization: u?.token
        }
    });
}