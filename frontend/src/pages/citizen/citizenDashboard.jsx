import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from '@/components/ui/spinner';
import { LogOut, ShieldAlert, Bell, Users, FileText, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CitizenDashboard = () => {
  const { userData, logout, isAuthLoading } = useContext(AppContext);
   const navigate = useNavigate();


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div>
            <h1 className="text-xl font-semibold">Citizen Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage all operations from here.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              {userData && userData.isAccountVerified !== undefined && !userData.isAccountVerified && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}

            </div>

            <div className="flex items-center gap-2">
              <p className="hidden text-sm text-muted-foreground sm:inline-block">
                Welcome, {userData ? userData.firstName : 'Citizen'}
              </p>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? (
                  <span className="flex items-center justify-center">
                    <Spinner className="mr-2 h-4 w-4" />
                    Logging out...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* --- Verification Banner --- */}

          {userData && userData.isAccountVerified !== undefined && !userData.isAccountVerified && (
            <div className="flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-primary-foreground">
              <ShieldAlert className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-primary">Account Verification Required</p>
                <p className="text-sm text-primary/80">
                  Please verify your account to unlock full platform capabilities.
                </p>
              </div>
              <Button onClick={()=> navigate("/verify-email")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Verify Account
              </Button>
            </div>                                                      
          )}

          {/* --- Main Dashboard Content Goes Here --- */}
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Citizens
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,254</div>
                <p className="text-xs text-muted-foreground">
                  +122 this month
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">+520 this month</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+57</div>
                <p className="text-xs text-muted-foreground">+2 since last hour</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>  
    </div>
  )
}

export default CitizenDashboard;