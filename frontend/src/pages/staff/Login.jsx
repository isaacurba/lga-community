import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  Mail, Lock, Shield } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import {toast} from "sonner"

const StaffLogin = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const { backendUrl, setIsLoggedIn } = useContext(AppContext) 

  const onHandleSubmit = async (e)=>{
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/auth/login", {email, password});
      if(data.success){
        setIsLoggedIn(true);
        toast.success("Login Successfull")
        navigate("/staff/dashboard")
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred"
      toast.error(errorMessage)
    }
  }

  return (
    <div className=" flex items-center justify-center bg-muted/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-8 left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-8 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
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
          <form
          onSubmit={onHandleSubmit} 
          className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 h-11 bg-background/50"
                />
              </div>
            </div>

            <Button  variant="default" className="w-full h-11 text-base shadow-sm mt-2 bg-primary text-primary-foreground">
              Login
            </Button>

            <div className="text-sm ">
              <Link to="/staff-reset-password" className="text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

          </form>
        </CardContent>

      </Card>
    </div>
  );
};

export default StaffLogin;
