import apiInstance from "./api.service";

const authService = {
    register: async (userData)=>{},
    verifyOTP: async (userData)=>{},
    login: async (credentials)=>{},
    logout: async ()=>{},
    getCurrentUser: async ()=>{},
    changePassword: async (passwords)=>{},
    updateUser: async (userData)=>{},
    isLoggeIn:  ()=>{},
}

export default authService