import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, ArrowRight, Menu, X, FileText, Home } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/", Icon: Home },
    { label: "Documentation", to: "/documentation", Icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl m-auto flex items-center justify-between px-4 py-4 md:px-8">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-foreground">LGA-Connect</span>
            <span className="text-[11px] text-muted-foreground">Verified local identity system</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center gap-2 text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                  <span>{item.label}</span>
                  <span className={`block h-[2px] w-full translate-y-2 rounded-full transition-all ${
                    active ? "bg-primary/80" : "bg-transparent group-hover:bg-primary/40"
                  }`} />
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              Live services
            </span>
          <Link to="/login">
            <Button variant="outline" className="gap-2">
              Access Portal <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background/95 px-4 pb-4 pt-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <item.Icon className="h-4 w-4 text-primary" />
                  {item.label}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              Live services
            </div>
          <Link to="/login">
            <Button variant="outline" className="w-full gap-2">
              Access Portal <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
