import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { BadgeCheck, User, Mail, IdCard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CitizenProfile = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <Button variant="outline" size="icon" onClick={() => navigate('/citizen/dashboard')}
        className="lg:hidden"    
        >
            <ArrowLeft className="h-4 w-4" />
        </Button>

        {/* ================= Header ================= */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-1">
            View your personal information
          </p>
        </div>

        {/* ================= Profile Overview ================= */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
              {userData?.firstName && userData?.lastName  ? `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}` : "C"}
            </div>
            <div className="flex-1">
              <CardTitle>{userData?.firstName && userData?.lastName ? `${userData.firstName} ${userData.lastName}` : userData?.name || "Citizen"}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                {userData?.isAccountVerified ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <BadgeCheck className="h-4 w-4" /> Verified Account
                  </span>
                ) : (
                  <span className="text-yellow-600">Unverified Account</span>
                )}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        {/* ================= Personal Information ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your details as registered in the LGA system
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{userData?.firstName && userData?.lastName ? `${userData.firstName} ${userData.lastName}` : "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{userData?.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IdCard className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">National ID (NIN)</p>
                <p className="font-medium">{userData?.ninId || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IdCard className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <p
                  className={`font-medium ${
                    userData?.isAccountVerified
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {userData?.isAccountVerified ? "Verified" : "Pending Verification"}
                </p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* ================= Security Info (MVP) ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Account security information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Password and sensitive details are securely managed by the system.
              If you suspect unauthorized access, contact LGA support.
            </p>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default CitizenProfile;
