import axios from "axios";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
    withCredentials: true
})

apiInstance.interceptors.request.use(
    (config)=>{
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json'
        }        
        return config
    },

    (error)=>{
        return Promise.reject(error)
    }

)

apiInstance.interceptors.response.use(
    (response)=>{
        return response
    },

    async (error) => {

    if (error.response.status === 401) {
        await apiInstance.post("/users/logout");
        window.location.href = "/";
        return Promise.reject(error);
    }

    return Promise.reject(error);
  }
)


export default apiInstance