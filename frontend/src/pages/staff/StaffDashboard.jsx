import DashboardLayout from "@/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  Building,
  ShieldAlert,
  Plus,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useCitizens from "@/hooks/useCitizens";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatCard from "@/components/StatCard";

const StaffDashboard = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { citizens } = useCitizens();
  const [isVerifying, setIsVerifying] = useState(false);

  // ===== Derived Data =====
  const verifiedCitizens = citizens?.filter(c => c.isAccountVerified) || [];
  const pendingCitizens = citizens?.filter(c => !c.isAccountVerified) || [];

  const recentCitizens = [...(citizens || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // ===== Send Verification OTP =====
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

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ================= Header ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {userData?.name || "Staff Member"}.
            </p>
          </div>

          <Button
            onClick={() => navigate("/staff/register-citizen")}
            className="gap-2 bg-black text-white"
          >
            <Plus className="h-4 w-4" />
            Register Citizen
          </Button>
        </div>

        {/* ================= Account Verification ================= */}
        {userData?.isAccountVerified === false && (
          <div className="flex items-center gap-4 rounded-lg border border-yellow-500/30 bg-yellow-50 p-4">
            <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Account Verification Required</p>
              <p className="text-sm text-muted-foreground">
                Verify your account to unlock all staff features.
              </p>
            </div>
            <Button
              onClick={sendVerificationOtp}
              disabled={isVerifying}
              variant="outline"
            >
              {isVerifying ? <Spinner className="h-4 w-4" /> : "Verify Now"}
            </Button>
          </div>
        )}

        {/* ================= Action Required ================= */}
        {pendingCitizens.length > 0 && (
          <Card className="border-yellow-500/40 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-yellow-800">
                <ShieldAlert className="h-4 w-4" />
                Action Required
              </CardTitle>
              <CardDescription>
                Pending citizen verifications
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-yellow-900">
                  {pendingCitizens.length}
                </p>
                <p className="text-sm text-yellow-700">
                  Pending accounts
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/staff/citizens")}
              >
                Review Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ================= Stats ================= */}
        <div className="grid gap-4 md:grid-cols-3">
          
          <StatCard
            title="Citizens Overview"
            value={citizens?.length || 0}
            icon={Users}
            onClick={() => navigate("/staff/citizens")}
            badges={[
              {
                label: `${verifiedCitizens.length} Verified`,
                className: "bg-green-100 text-green-800",
              },
              {
                label: `${pendingCitizens.length} Pending`,
                className: "bg-yellow-100 text-yellow-800",
              },
            ]}
          />

          <StatCard
            title="Certificates Issued"
            value="2,350"
            icon={FileText}
            subtitle="System generated"
          />

          <StatCard
            title="Pending Requests"
            value="12"
            icon={Building}
            subtitle="Requires review"
          />
        </div>

        {/* ================= Recent Activity ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>
              Latest citizens added to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentCitizens.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>NIN</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCitizens.map(citizen => (
                    <TableRow key={citizen._id}>
                      <TableCell className="font-medium">
                        {citizen.firstName} {citizen.lastName}
                      </TableCell>
                      <TableCell>{citizen.ninId}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            citizen.isAccountVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {citizen.isAccountVerified ? "Verified" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-black hover:text-white"
                          onClick={() => navigate("/staff/citizens")}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                No recent registrations found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
