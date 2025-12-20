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

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
        try {
          await apiInstance.post("/users/logout");
        } catch (_) {}
        window.location.href = "/";
        return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
)


export default apiInstance