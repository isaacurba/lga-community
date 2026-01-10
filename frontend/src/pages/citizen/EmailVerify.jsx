import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import {toast} from "sonner"
import { useNavigate } from "react-router-dom";
import { Spinner } from '@/components/ui/spinner';

const EmailVerify = () => {
  const inputRefs = useRef([]);
  const { backendUrl, isLoggedIn, userData, getUserData, setIsLoggedIn, isAppLoading } = useContext(AppContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e, index)=> {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus()
    }
  }
  const handleKeyDown = (e, index)=>{
    if (e.key === "Backspace" && e.target.value === "" && index > 0 ){
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  }

  const onSubmitHandler = async (e)=> {
    axios.defaults.withCredentials = true;
    setIsLoading(true)
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join("")
      const {data} = await axios.post(`${backendUrl}/api/citizen/auth/verify-account`, {otp})
      if(data.success){
        toast.success(data.message);
        setIsLoggedIn(true);
        await getUserData();
        navigate("/citizen/dashboard")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if (isAppLoading) return;

    if (!isLoggedIn) {
      navigate('/login');
    } else if (userData && userData.isAccountVerified) {
      navigate("/citizen/dashboard");
    }
  }, [isLoggedIn, userData, isAppLoading, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12 relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full ring-1 ring-primary/20">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-base">
              Enter the 6-digit code sent to your email address.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
          onSubmit={onSubmitHandler}
          className="space-y-6">
            <div className="space-y-2 ">
              <div className="flex gap-2 justify-center">
                {Array(6).fill(0).map((_, index) => (
                  <input
                   type="text"
                   maxLength={1}
                   key={index}
                   required
                   ref={e => { if (e) inputRefs.current[index] = e; }}
                   onInput={(e) => handleInput(e, index)}
                   onKeyDown={(e)=> handleKeyDown(e, index)}
                   onPaste={handlePaste}
                   className="w-12 h-12 text-center text-xl rounded-md border border-solid"/>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Please check your spam folder if you don't see the email.
              </p>
            </div>

            {isLoading ? (
            <Button
              disabled
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <Spinner className="mr-2 h-4 w-4" />
              Verifying...
            </Button>
            ):(
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Verify Email
            </Button>
            )}

          </form>
        </CardContent>

      </Card>
    </div>
  );
};

export default EmailVerify;