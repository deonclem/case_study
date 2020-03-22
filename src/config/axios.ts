import axios from "axios"

let backend = axios.create({
  baseURL: "https://s3-eu-west-1.amazonaws.com/spx-development/contents/",
})

backend.interceptors.response.use(
  response => {
    return response.data
  },

  error => {
    return Promise.reject(error)
  },
)

export default backend
