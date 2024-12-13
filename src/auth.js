import { toast } from "react-hot-toast";
import { BASE_URL } from "./Utils/Config";
import axios from "axios";

export function getLocal() {
  return localStorage.getItem("authToken");
}

export async function adminLogin(email, password) {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/login/`, {
            email,
            password,
        });

        const data = response.data;

        if (response.status === 200) {
            const adminToken = data.access;  
            localStorage.setItem('adminAuthToken', adminToken); 
            toast.success('Admin Login Success');
            return data;
        } else {
            toast.error('Invalid Admin Credentials');
            return null;
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        toast.error('An error occurred during admin login');
        return null;
    }
}
