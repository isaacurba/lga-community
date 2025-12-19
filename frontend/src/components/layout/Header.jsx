import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger could go here later */}
        <h1 className="text-lg font-semibold md:text-xl">
          {userData?.role === "staff" ? "Staff Portal" : "Citizen Portal"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-medium">{userData?.name || "User"}</span>
            <span className="text-xs text-muted-foreground capitalize">{userData?.role}</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </header>
  );
};

export default Header;