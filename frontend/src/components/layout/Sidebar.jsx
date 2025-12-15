import { Users, FileText, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const Sidebar = () => {
  const { userData } = useContext(AppContext);

  const linkClass =
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-white/10";

  return (
    <aside className="hidden md:flex w-64 flex-col bg-black text-white">
      <div className="h-14 flex items-center px-6 border-b border-white/10">
        <span className="text-lg font-bold">LGA Portal</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/" className={linkClass}>
          <Home className="h-4 w-4" />
          Dashboard
        </NavLink>

        {/* STAFF LINKS */}
        {userData?.role === "staff" && (
          <>
            <NavLink to="/staff/citizens" className={linkClass}>
              <Users className="h-4 w-4" />
              Citizens
            </NavLink>

            <NavLink to="/staff/certificates" className={linkClass}>
              <FileText className="h-4 w-4" />
              Certificates
            </NavLink>
          </>
        )}

        {/* CITIZEN LINKS */}
        {userData?.role === "citizen" && (
          <>
            <NavLink to="/citizen/certificates" className={linkClass}>
              <FileText className="h-4 w-4" />
              My Certificates
            </NavLink>

            <NavLink to="/citizen/profile" className={linkClass}>
              <Users className="h-4 w-4" />
              My Profile
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
