import axios from "axios"

let baseUrl = "http://localhost:8080/categories/";

export const allCategories = (u) => {
    return axios.get(baseUrl, {
        headers: {
            authorization: u?.token
        }
    })
}
