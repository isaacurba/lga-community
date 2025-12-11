import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { toast } from "sonner";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const staff = await axios
        .get(`${backendUrl}/api/staff/data`)
        
      if (staff?.data?.success) {
        setUserData(staff.data.userData);
      }

      const citizen = await axios
        .get(`${backendUrl}/api/citizen/data`)

      if (citizen?.data?.success) {
        setUserData(citizen.data.userData);
        return citizen.data.userData;
      }

      setUserData(null);
      return null;
    } catch {
      setUserData(null);
      return null;
    }
  };


  const getAuthState = async () => {
    try {
      const auth = await axios
        .post(`${backendUrl}/api/auth/is-auth`)
        .catch(() => null);

      if (auth?.data?.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } finally {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const logout = async () => {
    setIsAuthLoading(true);
    try {
      await axios.post(`${backendUrl}/api/auth/logout`); 
      setIsLoggedIn(false);
      setUserData(null);
      toast.success("You have been logged out.");
      navigate("/");
    } catch {
      toast.error("Logout failed.");
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
    isAppLoading,
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
