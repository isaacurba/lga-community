import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {  Mail, Lock, ArrowLeft, Shield } from "lucide-react";
import { useState } from "react";
const StaffLogin = () => {
  
  return (
    <div className=" flex items-center justify-center bg-muted/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-8 left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-8 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        
        {/* Header Section */}
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-2xl ring-1 ring-primary/20">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Portal Access
            </CardTitle>
            <CardDescription className="text-base">
              Secure login for LGA officials
            </CardDescription>
          </div>
        </CardHeader>

        {/* Form */}
        <CardContent className="pt-6">
          <form className="space-y-5">

            {/* Login State */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 h-11 bg-background/50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 h-11 bg-background/50"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button variant="default" className="w-full h-11 text-base shadow-sm mt-2 bg-primary text-primary-foreground">
              Sign In to Dashboard
            </Button>

           <div className="text-center text-sm text-muted-foreground mt-4">
            Don't have a staff Account?{" "}
            <Link to="/citizen/login" className="text-primary hover:underline font-medium">
              Register as Staff
            </Link>
          </div>

          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col space-y-4 pt-2 border-t bg-muted/10 pb-6">
          <div className="text-center text-sm text-muted-foreground mt-4">
            Not a staff member?{" "}
            <Link to="/citizen/login" className="text-primary hover:underline font-medium">
              Citizen Login
            </Link>
          </div>

          <Link
            to="/"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffLogin;
