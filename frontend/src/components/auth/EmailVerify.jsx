import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

const EmailVerify = () => {
  // const [ otp, setOtp ] = useState("");
  
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
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-base">
              Enter the 6-digit code sent to your email address.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Input
                  type="text"
                  onChannge={(e)=>e.target.value}
                  className="text-center text-2xl tracking-[0.5em] font-mono h-14 w-full max-w-[280px] bg-background/50 border-2 focus-visible:ring-offset-0 focus-visible:border-primary"              
                  placeholder="000000"  
                  maxLength={6}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Please check your spam folder if you don't see the email.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Verify Email
            </Button>
          </form>
        </CardContent>

      </Card>
    </div>
  );
};

export default EmailVerify;