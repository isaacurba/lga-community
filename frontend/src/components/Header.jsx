import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Building2, ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
            Official Government Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Digital Identity Management for <br />
            <span className="text-primary">Local Communities</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A secure, centralized platform for verifying citizen records, managing enrollments, and ensuring transparent local governance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/login">
                <Button size="lg" className="bg-primary text-primary-foreground">
                 Access Staff Dashboard
                </Button>
            </Link>
            
            <Link to="/citizen/login">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Citizen Check-in
                <ArrowRight className="w-4 h-4" />

              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 px-4">
          <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border">
            <div className="p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Citizen Registry</h3>
            <p className="text-muted-foreground text-sm">Secure digital enrollment and record keeping for all local residents.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border">
            <div className="p-3 bg-green-100 rounded-full mb-4 text-green-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Identity Verification</h3>
            <p className="text-muted-foreground text-sm">Real-time NIN verification and status tracking to prevent fraud.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border">
            <div className="p-3 bg-purple-100 rounded-full mb-4 text-purple-600">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Administrative Tools</h3>
            <p className="text-muted-foreground text-sm">Comprehensive dashboard for staff to manage LGA operations efficiently.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>&copy; 2025 LGA-Connect. Secured & Official.</p>
      </footer>
    </div>
  );
};

export default Header;