import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const Header = () => {
  const { userData, logout, isAuthLoading } = useContext(AppContext);

    const getWelcomeName = () => {
    if (!userData) return "User";
    const name = userData.name || userData.firstName;
    return `${userData.role === "staff" ? "Staff" : "Citizen"} ${name}`;
    };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome, {getWelcomeName()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>

        <Button onClick={logout} variant="outline" size="sm">
          {isAuthLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Logging out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
