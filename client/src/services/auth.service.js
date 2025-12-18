import apiInstance from "./api.service";

const authService = {
    register: async (userData)=>{
        try {
            const res = await apiInstance.post("/register", userData)
            return res.data
        } catch (error) {
            throw new Error ( error?.response?.data?.message || 'Registration failed' )
        }
    },
    verifyOTP: async (otp)=>{
        try {
            const res = await apiInstance.post("/verify-otp", otp)
            return res.data
        } catch (error) {
            throw new Error ( error?.response?.data?.message || 'OTP verification failed' )
        }
    },
    login: async (credentials)=>{
        try {
            const res = await apiInstance.post("/login", credentials)
            return res.data
        } catch (error) {
            throw new Error ( error?.response?.data?.message || 'Login failed' )
        }
    },
    logout: async ()=>{
        try {
            const res = await apiInstance.post("/logout")
            return res.data    
        } catch (error) {
            throw new Error ( error?.response?.data?.message || 'Logout failed' )
        }

    },
    getCurrentUser: async ()=>{
        try {
            const res = await apiInstance.get("/profile")
            return res.data
        } catch (error) {
            // throw new Error ( error?.response?.data?.message || 'Failed to fetch user profile' )
            return null
        }
    },
    changePassword: async (passwords)=>{
        try {
            const res = await apiInstance.patch("/change-password", passwords)
            return res.data
        } catch (error) {
            throw new Error ( error?.response?.data?.message || 'Failed to cahnge password' )
        }
    },
    updateUser: async (userData)=>{
        try {
            const res = await apiInstance.patch("/update-profile", userData)
            return res.data
        } catch (error) {
            throw new Error ( error?.response?.data?.message || 'Failed to update user' )
        }
    },
    isLoggedIn:  async()=>{
        try {
            const res = await apiInstance.get("/profile")
            return !!res.data
        } catch (error) {
            return false
        }
    },
}

export default authService