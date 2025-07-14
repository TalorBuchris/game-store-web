import axios from "axios"

let baseUrl = "http://localhost:8080/toys/";

export function totalPagesOfActiveToys() {
    return axios.get(baseUrl + `countPagesActive?perpage=6`)
}

export function getAllToys(pageNum) {
    return axios.get(baseUrl + `activeToys?page=${pageNum}&perpage=6`)
}

export function updateDetailToy(toyId, data, u) {
    return axios.put(baseUrl + toyId, data, {
        headers: {
            authorization: u?.token
        }
    })
}

export function ProductDeactivation(toyId, u) {
    return axios.put(baseUrl + "deactivation/" + toyId, null, {
        headers: {
            authorization: u?.token
        }
    })
}

export function addToy(data, u) {
    return axios.post(baseUrl, data, {
        headers: {
            authorization: u?.token
        }
    })
}
