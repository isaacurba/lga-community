import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Building2, ArrowRight } from "lucide-react";
import Documentation from "@/components/Documentation"; 

const features = [
  {
    Icon: Users,
    title: "Citizen Registry",
    description: "Secure digital enrollment and record keeping for all local residents.",
    colorClasses: "bg-blue-100 text-blue-600",
  },
  {
    Icon: Shield,
    title: "Identity Verification",
    description: "Real-time NIN verification and status tracking to prevent fraud.",
    colorClasses: "bg-green-100 text-green-600",
  },
  {
    Icon: Building2,
    title: "Administrative Tools",
    description: "Comprehensive dashboard for staff to manage LGA operations efficiently.",
    colorClasses: "bg-purple-100 text-purple-600",
  },
];

const Header = () => {
  const [showDoc, setShowDoc] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">

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

            {/* Documentation Button (Opens Modal) */}
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-8 text-base gap-2"
              onClick={() => setShowDoc(true)}
            >
              View our Docs
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Login Button */}
            <Link to="/login">
                <Button size="lg" className="bg-primary text-primary-foreground h-12 px-8 text-base">
                  Login to your Portal
                </Button>
            </Link>
  
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 px-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border">
              <div className={`p-3 rounded-full mb-4 ${feature.colorClasses}`}>
                <feature.Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>&copy; 2025 LGA-Connect. Secured & Official.</p>
      </footer>

      {/* Render the Documentation Modal */}
      <Documentation isOpen={showDoc} onClose={() => setShowDoc(false)} />
    </div>
  );
};

export default Header;