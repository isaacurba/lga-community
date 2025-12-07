import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="py-4 px-16 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl m-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">LGA-Connect</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/login">
            <Button variant="outline" className="gap-2">
              Access Portal <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
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
        <div className="md:hidden mt-4 flex flex-col gap-3 pb-4 px-4">
          <Link to="/login">
            <Button variant="outline" className="w-full gap-2">
              Staff Login <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/citizen/login">
            <Button
              variant="default"
              className="w-full bg-primary text-primary-foreground"
            >
              Citizen Portal
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
