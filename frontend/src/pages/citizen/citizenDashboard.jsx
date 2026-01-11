import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CitizenDashboard = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const sendVerificationOtp = async () => {
    setIsVerifying(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/citizen/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/citizen/verify-email");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <DashboardLayout>
      {userData?.isAccountVerified === false && (
        <div className="mb-6 flex items-center gap-4 rounded-lg border border-black/20 bg-white p-4">
          <ShieldAlert className="h-6 w-6" />
          <div className="flex-1">
            <p className="font-semibold">Account Verification Required</p>
            <p className="text-sm text-muted-foreground">
              Verify your account to unlock full features.
            </p>
          </div>

          <Button onClick={sendVerificationOtp} disabled={isVerifying} className="bg-black">
            {isVerifying ? <Spinner className="h-4 w-4" /> : "Verify Account"}
          </Button>
        </div>
      )}

      <h2 className="mb-4 text-lg font-semibold">Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex justify-between flex-row pb-2">
            <CardTitle className="text-sm">My Certificates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Issued certificates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row pb-2">
            <CardTitle className="text-sm">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Pending requests
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
