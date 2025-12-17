import { useState, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {  Mail, Lock, CheckCircle2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner"

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext)

  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [ email, setEmail ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isEmailSent, setIsEmailSent ] = useState(false)
  const [ otp, setOtp ] = useState(0);
  const [ isOtpSubmitted, setIsOtpSubmitted ] = useState(false);
  

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

const onSubmitEmail = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (!email) {
    setIsLoading(false);
    return toast.error("Email is required");
  }

  try {
    axios.defaults.withCredentials = true;

    let response = await axios.post(
      `${backendUrl}/api/staff/auth/send-reset-otp`,
      { email }
    );

    if (!response?.data?.success) {
      response = await axios.post(
        `${backendUrl}/api/citizen/auth/send-reset-otp`,
        { email }
      );
    }

    if (!response?.data?.success) {
      return toast.error("Something went wrong. Please try again later.");
    }
   toast.success(response.data.message);

    setIsEmailSent(true);

  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send email");
  } finally {
    setIsLoading(false);
  }
};

const onSubmitOtp = (e) => {
  e.preventDefault();

  const otpValue = inputRefs.current.map(el => el.value).join("");

  if (otpValue.length !== 6) {
    return toast.error("Enter a valid 6-digit OTP");
  }

  setOtp(otpValue);          
  setIsOtpSubmitted(true);   
};


const onSubmitNewPassword = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (!newPassword) {
    setIsLoading(false);
    return toast.error("Enter new password");
  }

  try {
    let response = await axios.post(
      `${backendUrl}/api/staff/auth/reset-password`,
      { email, otp, newPassword }
    );

    if (!response?.data?.success) {
      response = await axios.post(
        `${backendUrl}/api/citizen/auth/reset-password`,
        { email, otp, newPassword }
      );
    }

    if (!response?.data?.success) {
      return toast.error("Password reset failed");
    }

    toast.success(response.data.message);
    navigate("/login");

  } catch (error) {
    toast.error(error.response?.data?.message || "Password reset failed");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">

        {/* --- Step 1: Enter Email --- */}
        {!isEmailSent && 
          <>
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Enter Email</CardTitle>
              <CardDescription>
                Enter your email and we’ll send you a One-Time Password (OTP).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
               onSubmit={onSubmitEmail}
               className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="staff@lga.gov.ng"
                    className="pl-9 h-11"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                  />
                </div>
                
            {isLoading ? (
            <Button
              disabled
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <Spinner className="mr-2 h-4 w-4" />
              Sending...
            </Button>
            ) : (
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Send Reset Code
            </Button>              
            )}
              </form> 
            </CardContent>
          </>
        }

        {/* --- Step 2: Enter OTP  --- */}
        {!isOtpSubmitted && isEmailSent && 
          <>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Reset Password OTP</CardTitle>
              <CardDescription>
                Enter the OTP sent to your email id
              </CardDescription>
            </CardHeader>
            <CardContent>
          <form
          onSubmit={onSubmitOtp}
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
            ) : (
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Submit
            </Button>              
            )}
          </form>

            </CardContent>
          </>
        }

        {/* --- Step 3: New Password --- */}
        {isOtpSubmitted && isEmailSent &&
          <>
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Enter new password</CardTitle>
              <CardDescription>
                Enter the new password below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                onSubmit={onSubmitNewPassword}
                className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  htmlFor="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                   className="pl-10 h-12 bg-background/50"
                />
                </div>
                {isLoading ? (
                <Button
                  disabled
                  className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  <Spinner className="mr-2 h-4 w-4" />
                  Authenticating...
                </Button>
                ) : (
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  Submit
                </Button>              
                )}
              </form> 
            </CardContent>
          </>
        }  
      </Card>
    </div>
  );
};

export default ResetPassword;
