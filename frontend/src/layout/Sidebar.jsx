import { Users, FileText, Home, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { userData } = useContext(AppContext);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:relative z-50 w-64 h-screen md:h-auto flex flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
      <div className="h-14 flex items-center justify-between px-6 border-b border-sidebar-border">
        <span className="text-lg font-bold">LGA Portal</span>
        <button
          className="md:hidden p-1 rounded hover:bg-sidebar-accent"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* STAFF LINKS */}
        {userData?.role === "staff" && (
          <>
            <NavLink to="/staff/dashboard" className={linkClass}>
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink>         

            <NavLink to="/staff/citizens" className={linkClass}>
              <Users className="h-4 w-4" />
              Citizens
            </NavLink>

            {/* <NavLink to="/staff/certificates" className={linkClass}>
              <FileText className="h-4 w-4" />
              Certificates
            </NavLink> */}
          </>
        )}

        {/* CITIZEN LINKS */}
        {userData?.role === "citizen" && (
          <>
            <NavLink to="/citizen/dashboard" className={linkClass}>
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink> 

            {/* <NavLink to="/citizen/certificates" className={linkClass}>
              <FileText className="h-4 w-4" />
              My Certificates
            </NavLink> */}

            <NavLink to="/citizen/profile" className={linkClass}>
              <Users className="h-4 w-4" />
              My Profile
            </NavLink>
          </>
        )}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
