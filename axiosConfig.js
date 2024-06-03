import axios from "axios";
const passapi =  import.meta.env.VITE_BACKEND_API_PASS

const URL = "https://api-my-production.up.railway.app";
const URL2 = "https://api-photos-my-production.up.railway.app";
const URL3 = "https://api-users-production.up.railway.app";
//const URL2 = "http://localhost:3000/";

export const axiosInstance = axios.create({
    baseURL: URL,
    headers: {'auth': passapi}
})

export const axiosInstance2 = axios.create({
    baseURL: URL2,
    headers: {'auth': passapi}
})

export const axiosInstance3 = axios.create({
    baseURL: URL3,
    headers: {'auth': passapi}
})