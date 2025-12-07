import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import { toast } from 'sonner';
import axios from "axios"

export const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userData, setUserData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const getUserData = async ()=>{
        try {
        const {data} = await axios.get(backendUrl + "/api/staff/data")
        data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred"
        toast.error(errorMessage)
        }
    }

    const logout = async () => {
        setIsAuthLoading(true);
        try {
            await axios.post(backendUrl + "/api/staff/auth/logout");
            setIsLoggedIn(false);
            setUserData(null);
            toast.success("You have been logged out successfully.");
            navigate("/");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsAuthLoading(false);
        }
    };
    
    const value = {
        backendUrl,
        isLoggedIn, 
        setIsLoggedIn,
        userData, 
        setUserData,
        getUserData,
        logout,
        isAuthLoading
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};