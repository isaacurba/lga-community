import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import { toast } from 'sonner';
import axios from "axios"
import { Spinner } from '@/components/ui/spinner';

export const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userData, setUserData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [isAppLoading, setIsAppLoading] = useState(true);
    

    const getUserData = async ()=>{
        try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.get(backendUrl + "/api/staff/data")
        if (data.success) {
            setUserData(data.userData);
        } else {
            setUserData(null);
        }
        } catch (error) {
           setUserData(null);
        }
    }

    const getAuthState = async ()=>{
    try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${backendUrl}/api/staff/auth/is-auth`);
        if (data.success){
            setIsLoggedIn(true)
            await getUserData(); 
        } else {
            setIsLoggedIn(false);
            setUserData(null);
        }
    } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
    } finally {
        setIsAppLoading(false);
    }
    }

    useEffect(()=>{
        getAuthState()
    },[])

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
        isAuthLoading,
        isAppLoading
    };

    if (isAppLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};