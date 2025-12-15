import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

const CitizenDashboard = () => {
  const { userData } = useContext(AppContext);
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <DashboardLayout>

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
