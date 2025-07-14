import axios from "axios"

let baseUrl = "http://localhost:8080/users/";

export function updateDetailsUser(data, u) {
    console.log(baseUrl + u.userId)
    return axios.put(baseUrl + u.userId, data, {
        headers: {
            authorization: u?.token
        }
    })
}

export function getUserByPassword(data){
    return axios.post(baseUrl + "login", data)
}

export function addUser(data){
    return axios.post(baseUrl, data)
}


