import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Building, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppContext } from "@/context/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const [isVerifying, setIsVerifying] = useState(false);
  const [citizens, setCitizens] = useState([]);
  const navigate = useNavigate();

  const sendVerificationOtp = async () => {
    setIsVerifying(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/staff/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/staff/verify-email");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setIsVerifying(false);
    }
  };

    useEffect(() => {
      const fetchCitizens = async () => {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/staff/citizens`, 
            { withCredentials: true }
          );
          
          if (data.success) {
            setCitizens(data.citizens);
          } else {
            toast.error(data.message || "Failed to load citizens");
          }
        } catch (error) {
          console.log(error);
          toast.error("Error connecting to server");
        }
      };
  
      fetchCitizens();
    }, [backendUrl]);

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
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate('/staff/citizens')}>
          <CardHeader className="flex justify-between flex-row pb-2">
            <CardTitle className="text-sm">Total Citizens</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citizens.length}</div>
            <p className="text-xs text-muted-foreground">+122 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row pb-2">
            <CardTitle className="text-sm">Certificates Issued</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+520 this month</p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex justify-between flex-row pb-2">
            <CardTitle className="text-sm">Active Staff</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
          </CardContent>
        </Card> */}
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
