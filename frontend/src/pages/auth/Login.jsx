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
import { Mail, Lock, Shield, BookOpen } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Documentation from "@/components/Documentation"; // Import the component

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the Documentation Modal
  const [showDoc, setShowDoc] = useState(false);

  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return toast.error("Email and password are required.");
    }

    axios.defaults.withCredentials = true;

    try {
      let response = null;

      response = await axios
        .post(`${backendUrl}/api/staff/auth/login`, { email, password })

      if (!response || !response.data.success) {
        response = await axios
          .post(`${backendUrl}/api/citizen/auth/login`, { email, password })
      }

      if (!response || !response.data?.success) {
        return toast.error("Invalid credentials.");
      }
      const user = response.data.user.role
      setIsLoggedIn(true);
      setUserData(response.data.user);

      toast.success("Login Successful");

      if (user) {
        navigate(
          user === "staff"
            ? "/staff/dashboard"
            : "/citizen/dashboard"
        );
      } else {
        navigate("/");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-2xl ring-1 ring-primary/20">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-base text-muted-foreground">Enter your credentials to access your portal</CardDescription>
          </div>

          {/* Documentation Button */}
          <div className="flex justify-center">
             <Button 
               variant="outline" 
               size="sm" 
               type="button" 
               className="gap-2 text-xs h-8 rounded-full border-dashed text-muted-foreground hover:text-primary"
               onClick={() => setShowDoc(true)}
             >
               <BookOpen className="w-3 h-3" />
               Read Project Documentation
             </Button>
           </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={onHandleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  htmlFor="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  htmlFor="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                   className="pl-10 h-12 bg-background/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Spinner className="mr-2 h-5 w-5" />
                  Authenticating...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-sm text-center">
              <Link to="/reset-password" className="font-medium text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

          </form>
        </CardContent>
      </Card> 

      {/* Render the Documentation Modal */}
      <Documentation isOpen={showDoc} onClose={() => setShowDoc(false)} />
    </div>
  );
};

export default Login;