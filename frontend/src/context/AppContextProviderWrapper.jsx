import { AppContextProvider } from "../context/AppContextProvider.jsx";
import { Outlet } from "react-router-dom";

const AppContextProviderWrapper = () => (
  <AppContextProvider>
    <Outlet />
  </AppContextProvider>
);
export default AppContextProviderWrapper;