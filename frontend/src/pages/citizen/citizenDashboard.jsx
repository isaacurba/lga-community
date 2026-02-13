import DashboardLayout from "@/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert, User, MapPin, IdCard } from "lucide-react";
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
      <div className="space-y-8">

        {/* ===== Header ===== */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {userData?.firstName || "Citizen"}
          </h1>
          <p className="text-muted-foreground mt-1">
            View your registration details and account status
          </p>
        </div>

        {/* ===== Verification Banner ===== */}
        {userData?.isAccountVerified === false && (
          <div className="flex items-center gap-4 rounded-lg border border-yellow-500/30 bg-yellow-50 p-4">
            <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Account Verification Required</p>
              <p className="text-sm text-muted-foreground">
                Please verify your account to complete your registration.
              </p>
            </div>
            <Button
              onClick={sendVerificationOtp}
              disabled={isVerifying}
              variant="outline"
            >
              {isVerifying ? <Spinner className="h-4 w-4" /> : "Verify Account"}
            </Button>
          </div>
        )}

        {/* ===== Profile Summary ===== */}
        <Card>
          <CardHeader>
            <CardTitle>My Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {userData?.firstName} {userData?.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IdCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">NIN</p>
                <p className="font-medium">{userData?.ninId || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">LGA of Origin</p>
                <p className="font-medium">
                  {userData?.originalLga || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    userData?.isAccountVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {userData?.isAccountVerified ? "Verified" : "Pending Verification"}
                </span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* ===== Action ===== */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => navigate("/citizen/profile")}
          >
            View Full Profile
          </Button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
