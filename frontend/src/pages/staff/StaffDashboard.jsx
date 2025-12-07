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

const StaffDashboard = () => {
  const { userData, logout, isAuthLoading } = useContext(AppContext);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <div className="flex items-center gap-2">
              <p className="hidden text-sm text-muted-foreground sm:inline-block">
                Welcome, {userData ? userData.name : 'Staff'}
              </p>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? (
                  <Spinner className="mr-2 h-4 w-4" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                {isAuthLoading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* --- Verification Banner --- */}
          <div className="flex items-center gap-4 rounded-lg border border-yellow-500/50 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-400/50 dark:bg-yellow-950 dark:text-yellow-300">
            <ShieldAlert className="h-6 w-6" />
            <div className="flex-1">
              <p className="font-semibold">Account Verification Required</p>
              <p className="text-sm">
                Please verify your account to get full access to all features.
              </p>
            </div>
            <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
              Verify Account
            </Button>
          </div>

          {/* --- Main Dashboard Content Goes Here --- */}
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">+520 this month</p>
              </CardContent>
            </Card>
            <Card>
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

export default StaffDashboard;