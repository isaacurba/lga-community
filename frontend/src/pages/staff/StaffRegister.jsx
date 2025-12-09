import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  Mail, Lock, Shield, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { AppContext } from "@/context/AppContext";
import axios from "axios"
import { toast } from "sonner";
const StaffRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);

  const onHandleSubmit =async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/staff/auth/register", {name, email, password})
      if(data.success){
        setIsLoggedIn(true);
        await getUserData();
        toast.success("Registration successful")
        navigate("/staff/dashboard")
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
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
            <CardTitle className="text-3xl font-bold tracking-tight">
              Create Staff Account
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Enter your details to get started
            </CardDescription>
          </div>
        </CardHeader>

        {/* Form */}
        <CardContent className="pt-6">
          <form 
          onSubmit={onHandleSubmit}
          className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  id="name"
                  type="name"
                  placeholder="Isaac Urban"
                  className="pl-10 h-12 bg-background/50"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12 bg-background/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-background/50"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} variant="default" className="w-full h-12 text-base font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Spinner className="mr-2 h-5 w-5" />
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>

  )
}

export default StaffRegister