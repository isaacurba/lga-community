import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, KeyRound, Loader2, CheckCircle2 } from "lucide-react";

const ResetPassword = () => {
  // UI State to switch between views (1: Email, 2: OTP, 3: Success)
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fake handler to show UI transitions
  const handleNextStep = (nextStep) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 1000); // Fake 1 second loading delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        
        {/* --- STEP 1: ENTER EMAIL --- */}
        {step === 1 && (
          <>
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <KeyRound className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                Enter your staff email address and we'll send you a One-Time Password (OTP).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNextStep(2); }}>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="staff@lga.gov.ng"
                      className="pl-9 h-11"
                      required
                    />
                  </div>
                </div>
                <Button className="w-full h-11" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Code"}
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {/* --- STEP 2: ENTER OTP & NEW PASSWORD --- */}
        {step === 2 && (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Secure Your Account</CardTitle>
              <CardDescription>
                Enter the OTP sent to your email and set your new password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNextStep(3); }}>
                
                {/* OTP Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Enter OTP Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="e.g. 123456"
                      className="pl-9 h-11 tracking-widest"
                      required
                    />
                  </div>
                </div>

                {/* New Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9 h-11"
                      required
                    />
                  </div>
                </div>

                <Button className="w-full h-11" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Reset Password"}
                </Button>
                
                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-muted-foreground hover:text-primary underline"
                  >
                    Wrong email? Go back
                  </button>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {/* --- STEP 3: SUCCESS --- */}
        {step === 3 && (
          <>
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold">All Set!</CardTitle>
              <CardDescription>
                Your password has been successfully reset. You can now log in with your new credentials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/staff-login">
                <Button className="w-full h-11 bg-green-600 hover:bg-green-700">
                  Return to Login
                </Button>
              </Link>
            </CardContent>
          </>
        )}

        <CardFooter className="flex justify-center border-t bg-muted/10 py-4">
          <Link 
            to="/login" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </CardFooter>

      </Card>
    </div>
  );
};

export default ResetPassword;