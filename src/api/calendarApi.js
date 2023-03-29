import axios from "axios";
import { getEnvVairables } from "../helpers";

const { VITE_API_URL } = getEnvVairables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// Configurar interceptores => ANTES DE QUE SE HAGA LA SOLICITUD (request)
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default calendarApi;