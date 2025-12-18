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

        console.log("➡️", config.method?.toUpperCase(), config.url);
        console.log("Config", config);
        
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
    const originalRequest = error.config;

    // Network error
    if (!error.response) {
      console.error("❌ Network error");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token API (cookie-based)
        await apiInstance.post("/auth/refresh");

        // Retry original request
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        try {
          await apiInstance.post("/auth/logout");
        } catch (_) {}

        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
)


export default apiInstance